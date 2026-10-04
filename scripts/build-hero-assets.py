#!/usr/bin/env python3
"""Turn the raw intro video into a seamless looping hero clip + stills.

Usage: python scripts/build-hero-assets.py [assets/intro.mp4] [--x N --y N --level 0.9]
Needs ffmpeg/ffprobe on PATH and numpy.
"""
import argparse, json, subprocess, tempfile, wave
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
CROP_W, CROP_H = 800, 1000
OUT_W, OUT_H = 768, 960
CLIP, FADE, SR = 10.0, 0.5, 48000


def run(*cmd, **kw):
    return subprocess.run(cmd, check=True, **kw)


def probe(src):
    out = run("ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
              "stream=width,height:format=duration", "-of", "json", src, capture_output=True).stdout
    d = json.loads(out)
    return d["streams"][0]["width"], d["streams"][0]["height"], float(d["format"]["duration"])


def gray_frames(src, w, h, fps=1, scale=4):
    sw, sh = w // scale, h // scale
    raw = run("ffmpeg", "-v", "error", "-i", src, "-vf", f"fps={fps},scale={sw}:{sh},format=gray",
              "-f", "rawvideo", "-", capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, sh, sw), scale


def detect_crop(src, w, h):
    """Bounding box of pixels clearly darker than the light backdrop, across sampled frames,
    plus the backdrop level (darkest edge of the crop) so whitening maps it to pure white."""
    frames, s = gray_frames(src, w, h)
    mask = (frames < 170).any(axis=0)
    cols = np.where(mask.sum(axis=0) > 3)[0]
    rows = np.where(mask.sum(axis=1) > 3)[0]
    cx = (cols[0] + cols[-1]) / 2 * s
    x = int(np.clip(cx - CROP_W / 2, 0, w - CROP_W))
    y = int(np.clip(rows[0] * s - 40, 0, h - CROP_H))
    x0, x1, y0, y1 = x // s, (x + CROP_W) // s, y // s, (y + CROP_H) // s
    edges = np.concatenate([frames[:, y0:y1, x0:x0 + 10].ravel(), frames[:, y0:y1, x1 - 10:x1].ravel()])
    level = min(0.98, np.percentile(edges, 1) / 255 - 0.01)
    return x, y, round(float(level), 3)


def sharpest_time(src, w, h, length):
    frames, _ = gray_frames(src, w, h, fps=4, scale=2)
    f = frames.astype(np.float32)
    lap = np.abs(f[:, 1:-1, 2:] + f[:, 1:-1, :-2] + f[:, 2:, 1:-1] + f[:, :-2, 1:-1] - 4 * f[:, 1:-1, 1:-1])
    scores = lap.reshape(len(f), -1).var(axis=1)
    return min(int(scores.argmax()) / 4, length - 0.1)


def looped_audio(src, length, out_wav):
    """Sample-accurate equal-power cross-fade of the last FADE s into the first FADE s."""
    raw = run("ffmpeg", "-v", "error", "-t", str(length), "-i", src, "-vn", "-ac", "2", "-ar", str(SR),
              "-f", "f32le", "-", capture_output=True).stdout
    a = np.frombuffer(raw, np.float32).reshape(-1, 2)
    total, n = int(round(length * SR)), int(round(FADE * SR))
    a = np.pad(a, ((0, max(0, total - len(a))), (0, 0)))[:total]
    t = (np.arange(n) / n)[:, None]
    head = a[:n] * np.sin(t * np.pi / 2) + a[total - n:] * np.cos(t * np.pi / 2)
    out = np.concatenate([head, a[n:total - n]])
    pcm = (np.clip(out, -1, 1) * 32767).astype("<i2")
    with wave.open(str(out_wav), "wb") as wf:
        wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src", nargs="?", default=str(ROOT / "assets" / "intro.mp4"))
    ap.add_argument("--x", type=int); ap.add_argument("--y", type=int); ap.add_argument("--level", type=float)
    args = ap.parse_args()

    w, h, dur = probe(args.src)
    length = min(CLIP, dur)
    x, y, level = detect_crop(args.src, w, h)
    x = args.x if args.x is not None else x
    y = args.y if args.y is not None else y
    level = args.level or level
    whiten = f"colorlevels=rimax={level}:gimax={level}:bimax={level}"
    print(f"source {w}x{h} {dur:.2f}s -> crop={CROP_W}:{CROP_H}:{x}:{y}, {whiten}, loop {length - FADE:.2f}s")

    (PUBLIC / "hero").mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "audio.wav"
        looped_audio(args.src, length, wav)
        graph = (
            f"[0:v]crop={CROP_W}:{CROP_H}:{x}:{y},scale={OUT_W}:{OUT_H},{whiten},format=yuv420p,split[a][b];"
            f"[a]trim=start={length - FADE}:end={length},setpts=PTS-STARTPTS[tail];"
            f"[b]trim=start=0:end={length - FADE},setpts=PTS-STARTPTS[body];"
            f"[tail][body]xfade=transition=fade:duration={FADE}:offset=0,format=yuv420p[v]"
        )
        base = ["ffmpeg", "-v", "error", "-y", "-t", str(length), "-i", args.src, "-i", str(wav),
                "-filter_complex", graph, "-map", "[v]", "-map", "1:a", "-shortest"]
        run(*base, "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(PUBLIC / "hero" / "hero.mp4"))
        run(*base, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1",
            "-c:a", "libopus", "-b:a", "80k", str(PUBLIC / "hero" / "hero.webm"))

    # Head-to-shirt bust (4:5) from the sharpest frame, and a 1200x630 OG image.
    t = sharpest_time(args.src, w, h, length)
    cx = x + CROP_W // 2
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / "bust.png"
        run("ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", args.src, "-frames:v", "1", "-vf",
            f"crop=400:500:{cx - 200}:{max(0, y + 10)},scale=480:600,{whiten}", str(png))
        run("cwebp", "-quiet", "-q", "85", str(png), "-o", str(PUBLIC / "portrait-bust.webp"))
    run("ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", args.src, "-frames:v", "1", "-vf",
        f"crop={w}:{round(w * 630 / 1200)}:0:{max(0, (h - round(w * 630 / 1200)) // 2)},scale=1200:630,{whiten}",
        "-q:v", "3", str(PUBLIC / "og.jpg"))
    print(f"done (stills from t={t:.2f}s)")


if __name__ == "__main__":
    main()
