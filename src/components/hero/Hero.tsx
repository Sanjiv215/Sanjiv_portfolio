"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [needsUnlock, setNeedsUnlock] = useState(true);

  const enableAudio = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;
    video
      .play()
      .then(() => {
        setIsMuted(false);
        setNeedsUnlock(false);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1.0;

    // Start video playback immediately (muted to guarantee autoplay starts on mobile)
    video.muted = true;
    video.play().catch(() => {});

    // Try unmuting immediately in case autoplay with audio is allowed by browser
    video.muted = false;
    video
      .play()
      .then(() => {
        setIsMuted(false);
        setNeedsUnlock(false);
      })
      .catch(() => {
        // Autoplay with sound blocked -> fallback to muted until user interaction
        video.muted = true;
        video.play().catch(() => {});
        setIsMuted(true);
        setNeedsUnlock(true);
      });

    // Handle user interaction to unlock audio reliably
    const handleInteraction = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      v.volume = 1.0;
      v.play()
        .then(() => {
          setIsMuted(false);
          setNeedsUnlock(false);
          removeListeners();
        })
        .catch(() => {});
    };

    const events = ["click", "touchstart", "touchend", "pointerdown", "pointerup", "keydown"];
    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleInteraction);
        document.removeEventListener(evt, handleInteraction);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { passive: true });
      document.addEventListener(evt, handleInteraction, { passive: true });
    });

    return () => {
      removeListeners();
    };
  }, []);

  // IntersectionObserver: pause video when < 35% visible
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.35, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      video
        .play()
        .then(() => {
          setIsMuted(false);
          setNeedsUnlock(false);
        })
        .catch(() => {});
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="hero-section"
      onClick={() => {
        if (isMuted) enableAudio();
      }}
    >
      <div className="hero-ghost" aria-hidden="true">
        {PROFILE.firstName.toUpperCase()}
      </div>

      <div className="hero-video-wrapper">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          playsInline
          loop
          muted
          preload="auto"
        >
          <source src="/hero/hero.mp4" type="video/mp4" />
          <source src="/hero/hero.webm" type="video/webm" />
        </video>

        <button
          onClick={toggleSound}
          className={`sound-btn ${needsUnlock && isMuted ? "has-ping" : ""}`}
          aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
          type="button"
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>
      </div>

      <div className="wrap hero-content">
        <div className="hero-info">
          <p className="tag rv" style={{ "--i": 1 } as React.CSSProperties}>
            <b>{PROFILE.name}</b> — Portfolio
          </p>
          <h1 className="hero-title rv-mask" style={{ "--i": 2 } as React.CSSProperties}>
            <span>
              Full Stack <em>Developer.</em>
            </span>
          </h1>
          <p className="hero-summary lede rv" style={{ "--i": 3 } as React.CSSProperties}>
            {PROFILE.resumeSummary[0]}
          </p>

          <div className="hero-actions rv" style={{ "--i": 4 } as React.CSSProperties}>
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#work");
              }}
              className="btn btn-primary"
            >
              Explore work
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#contact");
              }}
              className="btn"
            >
              Let&apos;s talk
            </button>
            <a
              href={PROFILE.resume}
              download="Sanjiv_Prasad_Resume.pdf"
              className="btn"
              aria-label="Download Résumé PDF"
            >
              Résumé ↓
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
          padding-bottom: 40px;
        }
        .hero-ghost {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(90px, 20vw, 340px);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(13, 13, 13, 0.07);
          user-select: none;
          pointer-events: none;
          z-index: 1;
        }
        .hero-video-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: min(96svh, 1040px);
          aspect-ratio: 768 / 960;
          z-index: 2;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .hero-video-wrapper {
            height: 62svh;
            top: 42%;
          }
        }
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
        }
        .sound-btn {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: var(--ink);
          color: #ffffff;
          display: grid;
          place-items: center;
          pointer-events: auto;
          z-index: 10;
          box-shadow: 0 4px 14px rgba(13, 13, 13, 0.2);
          transition: transform 0.3s var(--ease), background 0.3s var(--ease);
        }
        .sound-btn:hover {
          transform: scale(1.08);
          background: #2a2a2a;
        }
        .sound-btn.has-ping::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid var(--ink);
          opacity: 0.7;
          animation: soundPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes soundPing {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          70%, 100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        .hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: calc(100svh - 120px);
          pointer-events: none;
        }
        .hero-info {
          max-width: 620px;
          margin-bottom: 24px;
        }
        .hero-info * {
          pointer-events: auto;
        }
        .hero-title {
          font-size: clamp(44px, 7vw, 100px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -0.045em;
          margin-top: 14px;
          margin-bottom: 18px;
        }
        .hero-title em {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          color: var(--mute);
        }
        .hero-summary {
          max-width: 520px;
          margin-bottom: 28px;
          font-size: clamp(15px, 1.2vw, 17px);
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
      `}</style>
    </section>
  );
}
