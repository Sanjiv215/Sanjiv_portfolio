"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const bar = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      setScrolled(scrollY > 40);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id === "top" ? null : e.target.id);
      }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const place = () => {
      const el = active ? links.current[active] : null;
      setInd(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    place();
    addEventListener("resize", place);
    return () => removeEventListener("resize", place);
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const btn = menuBtn.current;
    lockScroll(true);
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  const go = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    lockScroll(false);
    setOpen(false);
    scrollToTarget(target);
  };

  return (
    <header className="nav" data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <div className="nav-progress" ref={bar} aria-hidden />

      <div id="site-menu" className="menu" inert={!open}>
        <ol className="wrap">
          {NAV.map((n, i) => (
            <li key={n.id} style={{ "--i": i } as React.CSSProperties}>
              <a href={`#${n.id}`} ref={i === 0 ? firstLink : undefined} onClick={(e) => go(e, `#${n.id}`)}>
                <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap nav-row">
        <a href="#top" className="nav-brand" onClick={(e) => go(e, "#top")} aria-label={`${PROFILE.name} — back to top`}>
          <span className="nav-mark" aria-hidden>{PROFILE.initials}</span>
          <span className="nav-name" aria-hidden>{PROFILE.name}</span>
        </a>

        <nav aria-label="Primary" className="nav-pill">
          <span className="nav-ind" aria-hidden style={{ opacity: ind ? 1 : 0, width: ind?.w ?? 0, transform: `translateX(${ind?.x ?? 0}px)` }} />
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              ref={(el) => { links.current[n.id] = el; }}
              aria-current={active === n.id ? "true" : undefined}
              onClick={(e) => go(e, `#${n.id}`)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button ref={menuBtn} className="nav-menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <style>{`
        .nav { position: fixed; inset: 0 0 auto; z-index: 50; }
        .nav-progress { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--ink); transform: scaleX(0); transform-origin: left; z-index: 2; }
        .nav-row { position: relative; display: flex; align-items: center; justify-content: space-between; height: 76px; }
        .nav-brand { display: flex; align-items: center; gap: 12px; border-radius: 999px; }
        .nav-mark { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; font: 600 13px var(--font-mono);
          box-shadow: inset 0 0 0 1.5px var(--ink); transition: background .5s var(--ease), color .5s var(--ease), transform .9s var(--ease); }
        .nav-brand:hover .nav-mark { transform: rotate(360deg); }
        .nav[data-scrolled] .nav-mark { background: var(--ink); color: var(--paper); }
        .nav-name { font-weight: 600; letter-spacing: -.02em; transition: opacity .5s var(--ease), transform .5s var(--ease); }
        .nav[data-scrolled] .nav-name { opacity: 0; transform: translateX(-8px); }
        .nav-pill { position: relative; display: flex; padding: 5px; border-radius: 999px;
          transition: background .5s var(--ease), box-shadow .5s var(--ease); }
        .nav[data-scrolled] .nav-pill { background: rgba(255,255,255,.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: var(--hair), 0 10px 30px -18px rgba(13,13,13,.3); }
        .nav-pill a { position: relative; z-index: 1; padding: 9px 16px; border-radius: 999px; font-size: 14px; font-weight: 500; color: var(--ink-2); transition: color .4s var(--ease); }
        .nav-pill a:hover { color: var(--ink); }
        .nav-pill a[aria-current] { color: #fff; }
        .nav-ind { position: absolute; top: 5px; bottom: 5px; left: 0; border-radius: 999px; background: var(--ink);
          transition: transform .6s var(--ease), width .6s var(--ease), opacity .3s; }
        .nav-menu-btn { display: none; height: 42px; padding-inline: 20px; border-radius: 999px; font-size: 14px; font-weight: 500;
          background: rgba(255,255,255,.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: var(--hair); }
        .nav[data-open] .nav-menu-btn { background: var(--ink); color: #fff; }
        .menu { position: fixed; inset: 0; background: var(--paper); display: flex; align-items: center;
          clip-path: circle(0% at calc(100% - 56px) 38px); transition: clip-path .9s var(--ease); }
        .nav[data-open] .menu { clip-path: circle(150% at calc(100% - 56px) 38px); }
        .menu ol { list-style: none; margin: 0; }
        .menu li { opacity: 0; transform: translateY(40px); transition: opacity .6s var(--ease), transform .8s var(--ease); }
        .nav[data-open] .menu li { opacity: 1; transform: none; transition-delay: calc(200ms + var(--i) * 70ms); }
        .menu a { display: flex; align-items: baseline; gap: 16px; padding-block: 6px; font-size: clamp(44px, 12vw, 80px); font-weight: 700; letter-spacing: -.045em; line-height: 1.05; }
        .menu-num { font: 400 13px var(--font-mono); color: var(--mute); letter-spacing: 0; }
        @media (max-width: 820px) {
          .nav-pill { display: none; }
          .nav-menu-btn { display: block; }
        }
        @media (min-width: 821px) { .menu { display: none; } }
      `}</style>
    </header>
  );
}
