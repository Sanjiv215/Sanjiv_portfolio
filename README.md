# Sanjiv Prasad — Portfolio Website

A clean, quiet, and fast portfolio website built for **Sanjiv Prasad** (Full-Stack Developer / Fullstack Developer Intern).

Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, and Lenis smooth scrolling.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📑 Portfolio Sections

All data is strictly derived from [`public/resume.pdf`](public/resume.pdf) and configured in [`src/lib/data.ts`](src/lib/data.ts).

| Section | Description | Key Features |
|---|---|---|
| **00 — Hero** | Role introduction | Multiply-blended seamless video loop, ghost uppercase backdrop typography, unlockable continuous voice intro, audio control toggle with ping indicator. |
| **01 — About** | Biography & developer ID | 3-column overview, interactive hanging ID badge with physical damped pendulum swing and 3D flip card, quick facts. |
| **02 — Skills** | "Periodic table of my stack" | 8-column elemental grid with atomic numbers and 2-letter symbols, family filters, diagonal wave entrance, sticky 150px logo pop inspector. |
| **03 — Work** | Selected projects | Expanding side-by-side accordion gallery (Vigilo, PySentra, SmartBuy-AI, ERP Portal, Portfolio) with illustrative grayscale mini-UIs. |
| **04 — Experience** | Chronological journey | Single vertical timeline merging IIT Patna & Code Alpha internships with SVYASA University & GS Vidya Mandir education, driven by scroll progress. |
| **05 — Contact** | Get in touch & footer | Interactive bouncing typography, spinning "Say Hello" badge, one-click copyable email, direct links, and copyright footer. |

*Note: In compliance with the non-negotiable rule (never fabricate), sections without résumé records (Certifications, external coding ranking Achievements) have been omitted.*

---

## 🎬 Rebuilding Hero Assets

The hero video is generated from `assets/intro.mp4` using Python, ffmpeg, and numpy:
1. Auto-detects the person's bounding box and crops head-to-toe (`800x1000` scaled to `768x960`).
2. Whitens the backdrop levels so it seamlessly blends into the `--paper` background via `mix-blend-mode: multiply`.
3. Creates a sample-accurate 0.5s audio & video cross-fade loop.
4. Exports `public/hero/hero.webm` (VP9/Opus) and `public/hero/hero.mp4` (H.264/AAC), plus `public/portrait-bust.webp` and `public/og.jpg`.

To rebuild the video assets:
```bash
npm run hero
# or directly:
.venv/bin/python scripts/build-hero-assets.py
```

---

## ⚖️ Logo Credits & Licences

Brand SVGs stored in `public/logos/`:
- **Devicon**: Python, NumPy, Pandas, HTML5, CSS3, JavaScript, jQuery, TypeScript, React, Vite, FastAPI, Express, Node.js, MySQL, MongoDB.
  - License: MIT License (see [`public/logos/LICENSE-devicon.txt`](public/logos/LICENSE-devicon.txt)).
- Concept icons (AI Tools, Deployment, Collaboration, Leadership, Learning) are custom lightweight SVGs.
