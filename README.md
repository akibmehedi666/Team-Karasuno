# Echoes Without Words (Team-Karasuno)

> **An abstract, interactive generative art and ambient sound experience exploring human emotional states through Perlin noise flow fields and Tone.js audio synthesis.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![p5.js](https://img.shields.io/badge/p5.js-2.1.2-ED225D?style=for-the-badge&logo=p5.js&logoColor=white)](https://p5js.org/)
[![Tone.js](https://img.shields.io/badge/Tone.js-15.1.22-orange?style=for-the-badge)](https://tonejs.github.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.24.10-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

---

## 📌 Problem It Solves

Modern web interfaces and digital interactions are heavily text-saturated, structured around data dashboards, analytical forms, and explicit linguistic labels. Digital tools rarely offer wordless, contemplative spaces for introspective exploration or creative relaxation.

Furthermore, combining procedural mathematical graphics with dynamic procedural audio in modern single-page applications often encounters severe performance bottlenecks: canvas redraw lag, unoptimized particle loops, and audio context autoplay restrictions in standard browsers.

**Echoes Without Words** solves this by delivering a minimalist, wordless generative art application where emotional states are expressed entirely through computational vector motion, color harmony, and procedural sound synthesis. By implementing a lightweight 500-particle vector flow field using 2D Perlin noise equations paired with dynamic Tone.js synthesizers, the platform runs smoothly at 60 FPS in standard browser windows with synchronized audio-visual feedback.

---

## ✨ Features

- **Perlin Noise Particle Flow Field:** Simulates 500 autonomous particles navigating a two-dimensional Perlin vector field with edge wrapping, continuous velocity dampening, and procedural coordinate updates at 60 FPS.
- **Dynamic Intensity Modulation (0–100 Scale):** Real-time slider controlling visual chaos and kinetic behavior:
  - Particle speed scaling across a range of `2.0` to `24.0`
  - Flow field force magnitude scaling from `0.5` to `4.0`
  - Perlin noise spatial turbulence scaling from `0.05` to `0.40`
  - Time-evolution rate ($z$-offset) accelerating up to 20× at maximum intensity
- **Interactive Cursor Physics:** Real-time mouse and pointer interaction exerting radial repulsion forces on any particle within a 150-pixel radius.
- **Emotion-Mapped Color Palettes:** Distinct color schemes reflecting 4 affective states:
  - 🕊️ **Peace:** Gentle teals and cyans (`#E0F7FA` $\rightarrow$ `#26C6DA`)
  - 🌅 **Hope:** Luminous morning yellows (`#FFFDE7` $\rightarrow$ `#FFEE58`)
  - ⚡ **Fear:** Intense high-contrast crimsons (`#FFEBEE` $\rightarrow$ `#EF5350`)
  - 🔮 **Connection:** Deep ethereal lavenders and purples (`#F3E5F5` $\rightarrow$ `#AB47BC`)
- **Procedural Audio Synthesis Engine (Tone.js):** Harmonic synthesizer featuring custom Synth, Chorus, and Reverb effect chains mapped to musical scales and moods:
  - *Peace:* Sine wave oscillator, gentle 0.8s attack / 2.0s release, C3 root note, Major Pentatonic scale (`[0, 2, 4, 7, 9]`), 60 BPM tempo.
  - *Hope:* Triangle wave oscillator, 0.1s attack / 1.0s release, D3 root note, Lydian mode (`[0, 4, 7, 11, 12, 14]`), 80 BPM tempo.
  - *Fear:* Sawtooth wave oscillator, sharp 0.05s attack / 0.5s release, A2 root note, Locrian/Diminished scale (`[0, 1, 3, 6, 7, 8]`), 100 BPM tempo.
  - *Connection:* FM Synth with harmonic chords and dynamic modulation.
- **Gesture-Activated Web Audio Context:** Dedicated entry gate overlay requiring explicit user gesture to initialize the browser audio context, adhering to modern browser autoplay policies.
- **Slide-Out Control Tray:** Built with Framer Motion and Lucide React icons, offering non-intrusive floating controls to adjust intensity, toggle audio, and switch emotional states.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Library:** React 19.2.3
- **Language:** JavaScript (ES6+ Modules)
- **Styling:** Tailwind CSS v4.1.18
- **Procedural Graphics:** p5.js 2.1.2 (Canvas 2D context)
- **Web Audio Synthesis:** Tone.js 15.1.22 (PolySynth, Reverb, Chorus, Transport loop)
- **UI Animations:** Framer Motion 12.24.10
- **Vector Icons:** Lucide React 0.562.0
- **Typography:** Google Fonts (Montserrat weights 100–600)

---

## 📸 Screenshots

> _Visual walkthrough of the generative particle flow field and ambient emotion controls._

| Particle Flow Field (Peace / Cyan Palette) | Dynamic Control Tray & Emotion Selectors |
| :---: | :---: |
| ![Particle Field Placeholder](docs/screenshots/flow_field_placeholder.png)<br>_Placeholder: 500-particle Perlin noise flow field canvas_ | ![Control Tray Placeholder](docs/screenshots/control_tray_placeholder.png)<br>_Placeholder: Floating intensity slider and emotion state pills_ |

---

## 🚀 How to Run

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- npm, yarn, or pnpm

### 2. Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/akibmehedi666/Team-Karasuno.git
cd Team-Karasuno

# Install required dependencies
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to: **`http://localhost:3000`**

- Click **ENTER** on the landing screen to initialize the Tone.js audio engine.
- Hover or move your cursor across the canvas to interact with particle repulsion.
- Click the floating settings icon in the bottom corner to adjust the **Intensity** slider or switch between **Peace**, **Hope**, **Fear**, and **Connection**.

### 4. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

```
Team-Karasuno/
├── app/
│   ├── layout.js                  # Root layout with Montserrat typography
│   ├── page.js                    # Main generative experience entrypoint
│   ├── login/                     # Login page
│   └── globals.css                # Global Tailwind CSS v4 styling rules
├── components/
│   ├── Experience.js              # Experience coordinator, audio bootstrapper, and URL state
│   ├── Canvas.js                  # React-to-p5.js lifecycle wrapper and resize listener
│   └── ControlTray.js             # Framer Motion animated drawer with intensity and presets
├── lib/
│   ├── sketch.js                  # Particle class, Perlin flow field physics, and color palettes
│   └── audio.js                   # Tone.js synthesizer, FX chain, presets, and loop scheduler
├── public/                        # Static icons and graphic assets
├── DEVELOPER_HANDOFF.md           # Architecture specifications and technical handoff doc
├── package.json                   # Dependencies and npm scripts
└── README.md                      # Documentation
```
