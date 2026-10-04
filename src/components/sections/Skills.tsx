"use client";
import { useState } from "react";
import { SKILL_GROUPS, type Skill } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import TechLogo, { isBrand } from "../ui/TechLogo";

type FlatSkill = Skill & {
  atomicNumber: number;
  family: string;
  row: number;
  col: number;
};

// Flatten skills with atomic numbers and grid positions
const ALL_SKILLS: FlatSkill[] = [];
let atomic = 1;

SKILL_GROUPS.forEach((group) => {
  group.skills.forEach((s) => {
    const idx = atomic - 1;
    const col = idx % 8;
    const row = Math.floor(idx / 8);
    ALL_SKILLS.push({
      ...s,
      atomicNumber: atomic,
      family: group.family,
      row,
      col,
    });
    atomic++;
  });
});

const FAMILIES = ["All", ...SKILL_GROUPS.map((g) => g.family)];

export default function Skills() {
  const [activeFamily, setActiveFamily] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<FlatSkill>(ALL_SKILLS[0]);

  return (
    <section id="skills" className="section wrap">
      <SectionHead
        index="02"
        label="Skills"
        title="Periodic table of my"
        accent="stack."
        id="skills-heading"
      />

      {/* Filter Chips */}
      <div className="skills-filters rv" style={{ "--i": 1 } as React.CSSProperties}>
        {FAMILIES.map((fam) => (
          <button
            key={fam}
            type="button"
            className="chip"
            aria-pressed={activeFamily === fam}
            onClick={() => setActiveFamily(fam)}
          >
            {fam}
          </button>
        ))}
      </div>

      <div className="skills-layout mt-10">
        {/* Periodic Grid */}
        <div className="skills-grid-container rv" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="periodic-grid" role="grid" aria-label="Skills periodic table">
            {ALL_SKILLS.map((skill) => {
              const isMatch = activeFamily === "All" || skill.family === activeFamily;
              const isCurrent = selectedSkill.name === skill.name;
              const delay = (skill.row + skill.col) * 40;

              return (
                <button
                  key={skill.name}
                  type="button"
                  className={`element-tile ${!isMatch ? "is-dimmed" : ""} ${isCurrent ? "is-active" : ""}`}
                  style={{ "--wave-delay": `${delay}ms` } as React.CSSProperties}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  onClick={() => setSelectedSkill(skill)}
                  aria-label={`${skill.name} (${skill.symbol}), ${skill.family}`}
                >
                  <span className="element-num">{String(skill.atomicNumber).padStart(2, "0")}</span>
                  <span className="element-sym">{skill.symbol}</span>
                  <span className="element-name">{skill.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Inspector Panel */}
        <aside className="skills-inspector rv" style={{ "--i": 3 } as React.CSSProperties} aria-live="polite">
          <div className="card inspector-card">
            <div className="inspector-top">
              <span className="tag font-mono text-xs">
                Element #{String(selectedSkill.atomicNumber).padStart(2, "0")}
              </span>
              <span className="chip text-[11px] py-0 h-6">
                {selectedSkill.family}
              </span>
            </div>

            <div className="inspector-logo-box">
              <div key={selectedSkill.name} className="inspector-logo-pop">
                <TechLogo logo={selectedSkill.logo} size={110} withGlow={isBrand(selectedSkill.logo)} />
              </div>
            </div>

            <div className="inspector-details">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-2xl font-bold tracking-tight">{selectedSkill.name}</h3>
                <span className="font-mono text-lg font-semibold text-mute">{selectedSkill.symbol}</span>
              </div>
              <p className="font-mono text-xs text-mute uppercase tracking-wider mb-6">
                Family: {selectedSkill.family}
              </p>

              <div className="inspector-usage">
                <h4 className="text-xs font-mono uppercase text-mute font-semibold mb-2">
                  Applied in Experience & Projects:
                </h4>
                {selectedSkill.usedIn && selectedSkill.usedIn.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.usedIn.map((item) => (
                      <span key={item} className="chip bg-[#f4f2ee] text-xs font-medium border-0">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-mute italic">
                    Core technical skill listed in curriculum & active development.
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .skills-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: clamp(24px, 4vw, 40px);
        }
        .skills-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
        }
        @media (max-width: 980px) {
          .skills-layout {
            grid-template-columns: 1fr;
          }
        }
        .periodic-grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 10px;
        }
        @media (max-width: 680px) {
          .periodic-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 400px) {
          .periodic-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .element-tile {
          position: relative;
          aspect-ratio: 1 / 1.08;
          background: var(--card);
          border-radius: 14px;
          box-shadow: var(--hair);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), opacity 0.4s var(--ease), background 0.3s var(--ease);
          animation: waveIn 0.8s var(--ease) both;
          animation-delay: var(--wave-delay);
          cursor: pointer;
        }
        @keyframes waveIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .element-tile:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--lift);
          background: #ffffff;
          z-index: 5;
        }
        .element-tile.is-active {
          box-shadow: inset 0 0 0 2px var(--ink), var(--lift);
          background: #ffffff;
          z-index: 6;
        }
        .element-tile.is-dimmed {
          opacity: 0.22;
        }

        .element-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--mute);
          font-weight: 500;
        }
        .element-sym {
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--ink);
          margin-top: auto;
          margin-bottom: 2px;
        }
        .element-name {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-2);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Inspector Panel */
        .skills-inspector {
          position: sticky;
          top: 100px;
        }
        .inspector-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }
        .inspector-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .inspector-logo-box {
          display: grid;
          place-items: center;
          height: 150px;
          background: #faf9f6;
          border-radius: 18px;
          margin-bottom: 24px;
        }
        .inspector-logo-pop {
          animation: logoPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes logoPop {
          from {
            transform: scale(0.65);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .inspector-details {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
}
