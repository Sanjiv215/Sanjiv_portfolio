"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import SectionHead from "../ui/SectionHead";

export default function About() {
  const [flipped, setFlipped] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);

  // Physics for damped pendulum swing
  useEffect(() => {
    let angle = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = performance.now();
    let animId = 0;

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(16, now - lastTime) / 1000;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      lastTime = now;

      // Add impulse based on horizontal mouse movement speed
      const force = Math.max(-15, Math.min(15, (dx / dt) * 0.015));
      velocity += force;
    };

    const loop = (time: number) => {
      // Natural idle sway
      const idleSway = Math.sin(time * 0.0018) * 1.5;

      // Spring & damping
      const spring = -angle * 4.5;
      const damping = -velocity * 2.8;
      const acceleration = spring + damping;

      velocity += acceleration * 0.016;
      angle += velocity * 0.016;

      const currentAngle = angle + (Math.abs(velocity) < 0.2 ? idleSway : 0);

      if (lanyardRef.current) {
        lanyardRef.current.style.transform = `rotate(${currentAngle.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  return (
    <section id="about" className="section wrap">
      <SectionHead
        index="01"
        label="About"
        title="Background &"
        accent="identity."
        id="about-heading"
      />

      <div className="about-grid">
        {/* Left Column: Summary & Bio */}
        <div className="about-col rv" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="card about-bio-card">
            <h3 className="about-greeting">
              Hi, I&apos;m {PROFILE.name}.
            </h3>
            <div className="about-summary-text">
              {PROFILE.resumeSummary.map((p, i) => (
                <p key={i} className="lede mb-3">
                  {p}
                </p>
              ))}
              <p className="about-extra font-mono text-xs text-mute mt-4">
                {PROFILE.extraLine}
              </p>
            </div>

            <div className="about-links mt-8">
              <a href={PROFILE.resume} download="Sanjiv_Prasad_Resume.pdf" className="btn btn-primary text-sm">
                Résumé ↓
              </a>
              {PROFILE.github && (
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn text-sm">
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn text-sm">
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Centre Column: Hanging Lanyard ID Badge */}
        <div className="about-col about-centre-col rv" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="lanyard-rig" ref={cardContainerRef}>
            <div className="lanyard-anchor" />
            <div className="lanyard-assembly" ref={lanyardRef}>
              {/* Lanyard Strap with scrolling text */}
              <div className="lanyard-strap" aria-hidden="true">
                <div className="strap-text-track">
                  <span>{PROFILE.name.toUpperCase()} · {PROFILE.title.toUpperCase()} · </span>
                  <span>{PROFILE.name.toUpperCase()} · {PROFILE.title.toUpperCase()} · </span>
                </div>
              </div>
              {/* Metallic Clip & Ring */}
              <div className="lanyard-clip" aria-hidden="true">
                <div className="clip-metal" />
                <div className="clip-ring" />
              </div>

              {/* Interactive ID Card with 3D Flip */}
              <div
                className={`id-card-wrapper ${flipped ? "is-flipped" : ""}`}
                tabIndex={0}
                role="button"
                aria-label="Interactive Developer ID Card. Press Space or Enter to flip."
                onKeyDown={handleKeyDown}
                onClick={() => setFlipped((f) => !f)}
              >
                <div className="id-card-inner">
                  {/* Front of Card */}
                  <div className="id-card-face id-card-front">
                    <div className="id-top-band">
                      <span>DEVELOPER ID</span>
                      <span className="id-badge-code">DEV-2026</span>
                    </div>

                    <div className="id-photo-frame">
                      <div className="id-photo-halo" />
                      <div className="id-photo-ring">
                        <Image
                          src="/portrait-bust.webp"
                          alt={PROFILE.name}
                          width={128}
                          height={156}
                          className="id-photo-img"
                          priority
                        />
                      </div>
                    </div>

                    <div className="id-info-block">
                      <h4 className="id-name">{PROFILE.name}</h4>
                      <p className="id-role">{PROFILE.title}</p>

                      <div className="id-rows">
                        <div className="id-row">
                          <span className="id-lbl">DEPT</span>
                          <span className="id-val">{PROFILE.dept}</span>
                        </div>
                        <div className="id-row">
                          <span className="id-lbl">ORG</span>
                          <span className="id-val">{PROFILE.university}</span>
                        </div>
                        <div className="id-row">
                          <span className="id-lbl">STATUS</span>
                          <span className="id-val">Active / 2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="id-card-footer">
                      <div className="id-barcode" aria-hidden="true">
                        <div className="barcode-lines" />
                      </div>
                      <div className="id-holo" aria-hidden="true">
                        <span>SP-AUTH</span>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="id-card-face id-card-back">
                    <div className="id-back-header">
                      <span className="text-xs font-mono font-bold tracking-wider">IDENTITY VERIFICATION</span>
                    </div>

                    <div className="id-back-content">
                      <h5 className="font-mono text-xs uppercase text-mute mb-2 font-semibold">Profile Summary</h5>
                      <ul className="id-back-list">
                        <li><strong>Role:</strong> {PROFILE.title}</li>
                        <li><strong>Education:</strong> {PROFILE.degree}</li>
                        <li><strong>Focus:</strong> {PROFILE.interests}</li>
                        <li><strong>Projects:</strong> Vigilo, PySentra, SmartBuy-AI</li>
                        <li><strong>Experience:</strong> IIT Patna, Code Alpha</li>
                      </ul>

                      <div className="id-signature-area mt-4">
                        <div className="id-sig-line font-serif italic text-base">{PROFILE.name}</div>
                        <span className="text-[10px] font-mono text-mute uppercase">Authorized Signature</span>
                      </div>
                    </div>

                    <div className="id-back-footer">
                      <p className="text-[11px] font-mono text-mute">
                        If found, say hello · <span className="text-ink font-semibold">{PROFILE.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Facts & Core Quote */}
        <div className="about-col rv" style={{ "--i": 3 } as React.CSSProperties}>
          <div className="card about-facts-card">
            <h4 className="tag font-mono text-xs uppercase text-mute mb-6">
              <b>Quick facts</b> — At a glance
            </h4>

            <div className="facts-list">
              <div className="fact-item">
                <span className="fact-label">Education</span>
                <span className="fact-value">{PROFILE.degree}</span>
                <span className="fact-sub">{PROFILE.university}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Recent Internship</span>
                <span className="fact-value">Fullstack Developer Intern</span>
                <span className="fact-sub">IIT Patna (2026)</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Prior Internship</span>
                <span className="fact-value">Frontend Developer Intern</span>
                <span className="fact-sub">Code Alpha (2025)</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Direct Contact</span>
                <a href={`mailto:${PROFILE.email}`} className="fact-value underline hover:text-ink">
                  {PROFILE.email}
                </a>
                <a href={PROFILE.phoneHref} className="fact-sub hover:text-ink">
                  {PROFILE.phone}
                </a>
              </div>
            </div>

            <div className="about-quote-box mt-8">
              <p className="serif text-xl leading-snug text-ink-2">
                &ldquo;{PROFILE.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) 320px minmax(0, 1.1fr);
          gap: clamp(20px, 3vw, 40px);
          margin-top: clamp(32px, 5vw, 64px);
          align-items: stretch;
        }
        @media (max-width: 1040px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
        .about-col {
          display: flex;
          flex-direction: column;
        }
        .about-bio-card, .about-facts-card {
          padding: clamp(24px, 3.5vw, 40px);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .about-greeting {
          font-size: clamp(26px, 2.5vw, 36px);
          font-weight: 700;
          letter-spacing: -0.035em;
          margin-bottom: 20px;
        }
        .about-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .facts-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .fact-item {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid var(--line);
          padding-bottom: 12px;
        }
        .fact-label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          color: var(--mute);
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .fact-value {
          font-weight: 600;
          font-size: 15px;
          color: var(--ink);
        }
        .fact-sub {
          font-size: 13px;
          color: var(--mute);
          margin-top: 2px;
        }
        .about-quote-box {
          border-left: 2px solid var(--ink);
          padding-left: 18px;
          margin-top: 24px;
        }

        /* Lanyard & ID Card Rig */
        .about-centre-col {
          align-items: center;
          justify-content: flex-start;
          perspective: 1200px;
        }
        .lanyard-rig {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
          margin-top: -10px;
        }
        .lanyard-anchor {
          width: 40px;
          height: 8px;
          background: var(--ink);
          border-radius: 4px 4px 0 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .lanyard-assembly {
          transform-origin: top center;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform;
        }
        .lanyard-strap {
          width: 30px;
          height: 60px;
          background: #1e1e1e;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        }
        .strap-text-track {
          display: flex;
          flex-direction: column;
          writing-mode: vertical-rl;
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 700;
          color: #999;
          letter-spacing: 0.15em;
          white-space: nowrap;
          animation: strapScroll 12s linear infinite;
        }
        @keyframes strapScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .lanyard-clip {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -2px;
        }
        .clip-metal {
          width: 22px;
          height: 14px;
          background: linear-gradient(180deg, #d8d8d8 0%, #8c8c8c 50%, #e8e8e8 100%);
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.25);
        }
        .clip-ring {
          width: 14px;
          height: 14px;
          border: 2px solid #aaa;
          border-radius: 50%;
          margin-top: -4px;
        }

        /* 3D ID Card */
        .id-card-wrapper {
          width: 300px;
          height: 404px;
          perspective: 1200px;
          cursor: pointer;
          outline: none;
          margin-top: -4px;
        }
        .id-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s var(--ease);
          transform-style: preserve-3d;
        }
        .id-card-wrapper:hover .id-card-inner,
        .id-card-wrapper.is-flipped .id-card-inner {
          transform: rotateY(180deg);
        }
        .id-card-wrapper:focus-visible {
          box-shadow: 0 0 0 3px var(--ink);
          border-radius: 24px;
        }
        .id-card-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: var(--hair), var(--lift);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .id-card-back {
          transform: rotateY(180deg);
          padding: 24px;
          justify-content: space-between;
          background: #faf9f6;
        }

        /* Front details */
        .id-top-band {
          background: #0d0d0d;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 18px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .id-badge-code {
          color: #a9a6a0;
          font-weight: 400;
        }
        .id-photo-frame {
          display: flex;
          justify-content: center;
          margin-top: 18px;
          position: relative;
        }
        .id-photo-halo {
          position: absolute;
          inset: -6px;
          border-radius: 18px;
          background: radial-gradient(circle, rgba(13,13,13,0.06) 0%, transparent 70%);
        }
        .id-photo-ring {
          position: relative;
          width: 128px;
          height: 156px;
          border-radius: 14px;
          overflow: hidden;
          background: linear-gradient(135deg, #eee 0%, #ddd 100%);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .id-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s var(--ease);
        }
        .id-card-wrapper:hover .id-photo-img {
          transform: scale(1.05);
        }
        .id-info-block {
          padding-inline: 20px;
          margin-top: 14px;
          text-align: center;
        }
        .id-name {
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        .id-role {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--mute);
          text-transform: uppercase;
          margin-top: 2px;
        }
        .id-rows {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
          background: #f7f6f3;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .id-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
        }
        .id-lbl {
          font-family: var(--font-mono);
          color: var(--mute);
          font-weight: 600;
        }
        .id-val {
          font-weight: 600;
          color: var(--ink);
        }
        .id-card-footer {
          margin-top: auto;
          padding: 10px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f4f2ee;
          border-top: 1px solid var(--line);
        }
        .id-barcode {
          width: 100px;
          height: 22px;
        }
        .barcode-lines {
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(90deg, #0d0d0d 0px, #0d0d0d 2px, transparent 2px, transparent 4px, #0d0d0d 4px, #0d0d0d 7px, transparent 7px, transparent 9px);
        }
        .id-holo {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 4px;
          background: linear-gradient(135deg, #e0e0e0, #ffffff, #c8c8c8);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          color: #555;
        }

        /* Back details */
        .id-back-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          line-height: 1.4;
          color: var(--ink-2);
        }
        .id-back-list strong {
          color: var(--ink);
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
        }
        .id-sig-line {
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          margin-bottom: 4px;
          color: var(--ink);
        }
      `}</style>
    </section>
  );
}
