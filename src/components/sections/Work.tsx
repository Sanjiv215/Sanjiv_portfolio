"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import SectionHead from "../ui/SectionHead";

function IllustrativeUI({ id }: { id: string }) {
  switch (id) {
    case "vigilo":
      return (
        <div className="mini-ui-terminal">
          <div className="mini-ui-term-bar">
            <span className="mini-dot" /><span className="mini-dot" /><span className="mini-dot" />
            <span className="mini-title">vigilo-scanner --target ./src</span>
          </div>
          <div className="mini-ui-term-body font-mono text-[11px] leading-relaxed">
            <p className="text-mute">$ vigilo scan --all</p>
            <p className="text-ink font-bold mt-1">[✓] AST Syntax Tree Generated</p>
            <p className="text-ink font-bold">[✓] 14 Security Rules Checked</p>
            <div className="p-2 bg-[#f4f2ee] rounded mt-2 border border-line">
              <span className="text-[10px] font-bold text-ink">RESULTS:</span> 0 Vulnerabilities Found. Code Safety: 100%.
            </div>
          </div>
        </div>
      );
    case "pysentra":
      return (
        <div className="mini-ui-terminal">
          <div className="mini-ui-term-bar">
            <span className="mini-dot" /><span className="mini-dot" /><span className="mini-dot" />
            <span className="mini-title">pysentra-daemon</span>
          </div>
          <div className="mini-ui-term-body font-mono text-[11px] leading-relaxed">
            <p className="text-mute">$ pysentra monitor --realtime</p>
            <p className="text-ink font-bold mt-1">● Monitoring active file system</p>
            <p className="text-ink">[INFO] Continuous static analysis active</p>
            <p className="text-mute">[METRICS] Memory: 42MB | Latency: 4ms</p>
          </div>
        </div>
      );
    case "smartbuy":
      return (
        <div className="mini-ui-browser">
          <div className="mini-browser-bar">
            <span className="mini-browser-url">smartbuy.ai/compare?q=laptop</span>
          </div>
          <div className="mini-table">
            <div className="mini-table-row font-mono text-[10px] text-mute border-b border-line pb-1">
              <span>STORE</span><span>PRICE</span><span>SCORE</span>
            </div>
            <div className="mini-table-row text-xs font-semibold py-1 border-b border-line">
              <span>Amazon</span><span>₹74,999</span><span>9.8/10</span>
            </div>
            <div className="mini-table-row text-xs py-1 text-mute">
              <span>Flipkart</span><span>₹76,499</span><span>9.2/10</span>
            </div>
          </div>
        </div>
      );
    case "erp":
      return (
        <div className="mini-ui-dashboard">
          <div className="mini-dash-head">
            <span className="text-xs font-bold font-mono">ERP METRICS</span>
            <span className="text-[10px] chip py-0 h-5">Live</span>
          </div>
          <div className="mini-dash-grid">
            <div className="mini-stat-card">
              <span className="text-[10px] text-mute font-mono">OPERATIONS</span>
              <span className="text-sm font-bold">99.4%</span>
            </div>
            <div className="mini-stat-card">
              <span className="text-[10px] text-mute font-mono">MODULES</span>
              <span className="text-sm font-bold">12 Active</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="mini-ui-portfolio">
          <div className="mini-pf-card">
            <span className="font-mono text-xs text-mute">VITE + REACT</span>
            <h5 className="font-bold text-sm mt-1">Deployed App</h5>
            <p className="text-[11px] text-mute mt-2">API Integration & Responsive UI</p>
          </div>
        </div>
      );
  }
}

export default function Work() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  return (
    <section id="work" className="section wrap">
      <SectionHead
        index="03"
        label="Selected work"
        title="Things I've"
        accent="built."
        id="work-heading"
      />

      <div className="work-accordion rv" style={{ "--i": 1 } as React.CSSProperties}>
        {PROJECTS.map((proj) => {
          const isOpen = activeId === proj.id;

          return (
            <div
              key={proj.id}
              className={`work-panel ${isOpen ? "is-open" : "is-closed"}`}
              onClick={() => setActiveId(proj.id)}
              onFocus={() => setActiveId(proj.id)}
              tabIndex={0}
              role="region"
              aria-label={`Project: ${proj.title}`}
            >
              {/* Collapsed Spine View */}
              <div className="panel-spine" aria-hidden={isOpen}>
                <span className="spine-num">{proj.index}</span>
                <span className="spine-title">{proj.title}</span>
                <div className="spine-btn">
                  <span className="plus-icon">+</span>
                </div>
              </div>

              {/* Expanded Full View */}
              <div className="panel-content" aria-hidden={!isOpen}>
                <div className="panel-left">
                  <div className="panel-meta">
                    <span className="tag font-mono text-xs">{proj.index} — {proj.kicker}</span>
                  </div>
                  <h3 className="panel-heading">{proj.title}</h3>
                  <p className="panel-desc lede">{proj.description}</p>

                  <div className="panel-actions mt-6">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {proj.linkLabel} ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="panel-right">
                  <div className="panel-ui-card">
                    <IllustrativeUI id={proj.id} />
                    <span className="ui-badge">Illustrative UI</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .work-accordion {
          display: flex;
          height: min(78svh, 600px);
          gap: 14px;
          margin-top: clamp(32px, 5vw, 64px);
        }
        @media (max-width: 900px) {
          .work-accordion {
            flex-direction: column;
            height: auto;
          }
        }

        .work-panel {
          position: relative;
          border-radius: 26px;
          background: var(--card);
          box-shadow: var(--hair);
          overflow: hidden;
          cursor: pointer;
          transition: flex 0.7s var(--ease), box-shadow 0.4s var(--ease), height 0.6s var(--ease);
          outline: none;
        }
        .work-panel:focus-visible {
          box-shadow: inset 0 0 0 2px var(--ink), var(--lift);
        }
        .work-panel.is-open {
          flex: 8;
          box-shadow: var(--lift);
          cursor: default;
        }
        .work-panel.is-closed {
          flex: 1.2;
          background: #faf9f6;
        }
        .work-panel.is-closed:hover {
          background: #ffffff;
          box-shadow: var(--lift);
        }

        @media (max-width: 900px) {
          .work-panel.is-closed {
            height: 72px;
          }
          .work-panel.is-open {
            height: auto;
          }
        }

        /* Spine */
        .panel-spine {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px 12px;
          opacity: 1;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .work-panel.is-open .panel-spine {
          opacity: 0;
        }
        .spine-num {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--mute);
          font-weight: 600;
        }
        .spine-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -0.02em;
          white-space: nowrap;
          color: var(--ink);
        }
        .spine-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--line);
          display: grid;
          place-items: center;
          font-size: 18px;
          color: var(--ink);
          transition: transform 0.4s var(--ease), background 0.3s;
        }
        .work-panel.is-closed:hover .spine-btn {
          transform: rotate(90deg);
          background: var(--ink);
          color: #fff;
        }

        @media (max-width: 900px) {
          .panel-spine {
            flex-direction: row;
            padding: 18px 24px;
          }
          .spine-title {
            writing-mode: horizontal-tb;
            transform: none;
          }
        }

        /* Expanded Content */
        .panel-content {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 32px;
          padding: clamp(28px, 4vw, 48px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s var(--ease) 0.2s;
        }
        .work-panel.is-open .panel-content {
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 900px) {
          .panel-content {
            grid-template-columns: 1fr;
          }
        }

        .panel-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .panel-heading {
          font-size: clamp(28px, 3.2vw, 46px);
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-top: 10px;
          margin-bottom: 14px;
          line-height: 1.08;
        }
        .panel-desc {
          font-size: 15px;
          line-height: 1.6;
        }

        .panel-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .panel-ui-card {
          position: relative;
          width: 100%;
          max-width: 360px;
          aspect-ratio: 4 / 3;
          background: #faf9f6;
          border-radius: 18px;
          border: 1px solid var(--line);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          clip-path: inset(0 0 0 0 round 18px);
          animation: uiClipReveal 0.6s var(--ease) both;
        }
        @keyframes uiClipReveal {
          from {
            clip-path: inset(100% 0 0 0 round 18px);
          }
          to {
            clip-path: inset(0 0 0 0 round 18px);
          }
        }
        .ui-badge {
          position: absolute;
          bottom: 10px;
          right: 12px;
          font-family: var(--font-mono);
          font-size: 9px;
          text-transform: uppercase;
          color: var(--faint);
          letter-spacing: 0.05em;
        }

        /* Mini UI Themes */
        .mini-ui-terminal {
          background: #111111;
          color: #eeeeee;
          border-radius: 10px;
          padding: 12px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .mini-ui-term-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 8px;
          border-bottom: 1px solid #333;
          margin-bottom: 8px;
        }
        .mini-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #555;
        }
        .mini-title {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #888;
          margin-left: 4px;
        }
        .mini-ui-browser {
          background: #ffffff;
          border-radius: 10px;
          padding: 12px;
          box-shadow: var(--hair);
          width: 100%;
          height: 100%;
        }
        .mini-browser-bar {
          background: #f4f2ee;
          padding: 4px 10px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--mute);
          margin-bottom: 12px;
        }
        .mini-table {
          display: flex;
          flex-direction: column;
        }
        .mini-table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        .mini-ui-dashboard {
          background: #ffffff;
          border-radius: 10px;
          padding: 14px;
          box-shadow: var(--hair);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mini-dash-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mini-dash-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .mini-stat-card {
          background: #f4f2ee;
          padding: 10px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
        }
        .mini-ui-portfolio {
          background: #ffffff;
          border-radius: 10px;
          padding: 16px;
          box-shadow: var(--hair);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mini-pf-card {
          text-align: center;
        }
      `}</style>
    </section>
  );
}
