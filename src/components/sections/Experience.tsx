"use client";
import { useRef, useState } from "react";
import { TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useScrollProgress(sectionRef, (p) => {
    setProgress(p);
  }, 0.7);

  return (
    <section id="experience" ref={sectionRef} className="section wrap">
      <SectionHead
        index="04"
        label="Experience & Education"
        title="Chronological"
        accent="journey."
        id="exp-heading"
      />

      <div className="timeline-container mt-14">
        {/* Animated Spine */}
        <div className="timeline-track" aria-hidden="true">
          <div
            className="timeline-spine"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>

        <div className="timeline-stops">
          {TIMELINE.map((item, index) => {
            const threshold = (index + 0.3) / (TIMELINE.length + 1);
            const isLit = progress >= threshold;

            return (
              <div
                key={index}
                className={`timeline-stop ${isLit ? "is-lit" : ""}`}
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className="stop-marker" aria-hidden="true">
                  <div className="marker-dot" />
                </div>

                <div className="card stop-card">
                  <div className="stop-header">
                    <span className="stop-year font-mono text-xs">{item.year}</span>
                    <span className="stop-place font-semibold text-sm text-ink-2">{item.place}</span>
                  </div>
                  <h3 className="stop-title">{item.title}</h3>
                  <p className="stop-detail text-sm text-mute leading-relaxed">{item.detail}</p>
                </div>
              </div>
            );
          })}

          {/* Final Dashed Card */}
          <div
            className={`timeline-stop is-next ${progress >= 0.85 ? "is-lit" : ""}`}
          >
            <div className="stop-marker" aria-hidden="true">
              <div className="marker-dot dashed-dot" />
            </div>

            <div className="card stop-card dashed-card">
              <span className="font-mono text-xs text-mute uppercase">Next Milestone</span>
              <h3 className="text-xl font-bold mt-1 text-ink">Next — Your team?</h3>
              <p className="text-sm text-mute mt-2">
                Available for full-time full-stack engineering roles and high-impact software projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .timeline-container {
          position: relative;
          padding-left: 36px;
        }
        @media (min-width: 768px) {
          .timeline-container {
            padding-left: 56px;
          }
        }

        .timeline-track {
          position: absolute;
          top: 10px;
          bottom: 20px;
          left: 12px;
          width: 2px;
          background: rgba(13, 13, 13, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .timeline-track {
            left: 20px;
          }
        }
        .timeline-spine {
          width: 100%;
          height: 100%;
          background: var(--ink);
          transform-origin: top;
          will-change: transform;
          transition: transform 0.1s linear;
        }

        .timeline-stops {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 4vw, 40px);
        }
        .timeline-stop {
          position: relative;
        }

        .stop-marker {
          position: absolute;
          top: 26px;
          left: -36px;
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          transform: translateX(-50%);
        }
        @media (min-width: 768px) {
          .stop-marker {
            left: -56px;
            width: 42px;
            height: 42px;
          }
        }
        .marker-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: inset 0 0 0 2px rgba(13, 13, 13, 0.2);
          transition: background 0.4s var(--ease), box-shadow 0.4s var(--ease), transform 0.4s var(--ease);
        }
        .timeline-stop.is-lit .marker-dot {
          background: var(--ink);
          box-shadow: 0 0 0 4px rgba(13, 13, 13, 0.15);
          transform: scale(1.2);
        }
        .dashed-dot {
          background: #ffffff;
          border: 2px dashed var(--mute);
          box-shadow: none;
        }
        .timeline-stop.is-lit .dashed-dot {
          border-color: var(--ink);
          background: #ffffff;
        }

        .stop-card {
          padding: clamp(20px, 3vw, 32px);
          transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease), border-color 0.4s var(--ease);
        }
        .timeline-stop.is-lit .stop-card {
          box-shadow: var(--lift);
          border-color: rgba(13, 13, 13, 0.2);
        }
        .stop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .stop-year {
          color: var(--mute);
          font-weight: 600;
        }
        .stop-title {
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 10px;
        }

        .dashed-card {
          background: #faf9f6;
          border: 2px dashed rgba(13, 13, 13, 0.2);
          box-shadow: none;
        }
      `}</style>
    </section>
  );
}
