"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import SectionHead from "../ui/SectionHead";

function BouncyLetter({ char }: { char: string }) {
  const [bounced, setBounced] = useState(false);

  if (char === " ") return <span className="inline-block w-3">&nbsp;</span>;

  return (
    <span
      className={`bouncy-char ${bounced ? "is-bouncing" : ""}`}
      onMouseEnter={() => {
        setBounced(true);
        setTimeout(() => setBounced(false), 600);
      }}
    >
      {char}
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer id="contact" className="section wrap contact-section">
      <SectionHead
        index="05"
        label="Contact"
        title="Get in"
        accent="touch."
        id="contact-heading"
      />

      <div className="contact-hero mt-12">
        <h2 className="contact-huge-heading">
          <div className="char-row">
            {line1.split("").map((c, i) => (
              <BouncyLetter key={i} char={c} />
            ))}
          </div>
          <div className="char-row serif">
            {line2.split("").map((c, i) => (
              <BouncyLetter key={i} char={c} />
            ))}
          </div>
        </h2>

        {/* Circular Spinning Say Hello Badge */}
        <div className="hello-badge-wrap" aria-hidden="true">
          <svg className="hello-badge-svg" viewBox="0 0 160 160">
            <path
              id="helloCircle"
              d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              fill="none"
            />
            <text className="hello-badge-text">
              <textPath href="#helloCircle">
                SAY HELLO · GET IN TOUCH · LET&apos;S CONNECT ·
              </textPath>
            </text>
          </svg>
          <div className="hello-badge-center">
            <span>👋</span>
          </div>
        </div>
      </div>

      <div className="contact-details-grid mt-16">
        {/* Email Block */}
        <div className="card contact-email-card rv" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="font-mono text-xs uppercase text-mute">Primary Contact</span>
          <div className="email-row mt-3">
            <a href={`mailto:${PROFILE.email}`} className="email-link">
              {PROFILE.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="chip copy-chip"
              aria-label="Copy email address"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </div>
        </div>

        {/* Phone & Socials */}
        <div className="card contact-social-card rv" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="font-mono text-xs uppercase text-mute">Direct Lines</span>
          <div className="social-links-list mt-4">
            <a href={PROFILE.phoneHref} className="social-link-item">
              <span className="font-mono text-xs text-mute">Phone</span>
              <span className="font-semibold text-ink">{PROFILE.phone}</span>
            </a>
            {PROFILE.github && (
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="social-link-item">
                <span className="font-mono text-xs text-mute">GitHub</span>
                <span className="font-semibold text-ink">@Sanjiv215 ↗</span>
              </a>
            )}
            {PROFILE.linkedin && (
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="social-link-item">
                <span className="font-mono text-xs text-mute">LinkedIn</span>
                <span className="font-semibold text-ink">/in/prasadsanjiv ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Clean Bottom Footer Bar */}
      <div className="site-bottom-bar mt-24">
        <p className="text-xs text-mute font-mono">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => scrollToTarget("#top")}
          className="text-xs font-mono uppercase text-ink underline hover:text-mute"
        >
          Back to top ↑
        </button>
        <p className="text-xs text-mute font-mono">
          Built with Next.js 15
        </p>
      </div>

      <style>{`
        .contact-hero {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
        }
        .contact-huge-heading {
          font-size: clamp(38px, 6.5vw, 92px);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.02;
        }
        .char-row {
          display: flex;
          flex-wrap: wrap;
        }
        .bouncy-char {
          display: inline-block;
          cursor: default;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .bouncy-char.is-bouncing {
          animation: hop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes hop {
          0% { transform: translateY(0); }
          40% { transform: translateY(-18px) scale(1.1); }
          70% { transform: translateY(4px); }
          100% { transform: translateY(0); }
        }

        /* Spinning Say Hello Badge */
        .hello-badge-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          display: grid;
          place-items: center;
        }
        .hello-badge-svg {
          width: 100%;
          height: 100%;
          animation: rotateBadge 16s linear infinite;
        }
        @keyframes rotateBadge {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hello-badge-text {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          fill: var(--ink);
        }
        .hello-badge-center {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: var(--hair);
          display: grid;
          place-items: center;
          font-size: 20px;
        }

        /* Details */
        .contact-details-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(20px, 3vw, 32px);
        }
        @media (max-width: 800px) {
          .contact-details-grid {
            grid-template-columns: 1fr;
          }
        }
        .contact-email-card, .contact-social-card {
          padding: clamp(24px, 3.5vw, 40px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .email-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .email-link {
          font-size: clamp(20px, 2.4vw, 32px);
          font-weight: 700;
          letter-spacing: -0.03em;
          text-decoration: underline;
          text-underline-offset: 6px;
          text-decoration-thickness: 2px;
          color: var(--ink);
          word-break: break-all;
        }
        .email-link:hover {
          color: var(--mute);
        }

        .social-links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .social-link-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: #faf9f6;
          border-radius: 12px;
          border: 1px solid var(--line);
          transition: background 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .social-link-item:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: var(--lift);
        }

        .site-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid var(--line);
          flex-wrap: wrap;
          gap: 16px;
        }
      `}</style>
    </footer>
  );
}
