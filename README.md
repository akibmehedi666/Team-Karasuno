# Echoes Without Words

An abstract, interactive generative art experience that explores emotion through visuals and sound—without words.

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)

---

## 🎨 About

**Echoes Without Words** is a minimalist, emotion-driven web application that invites users to explore their feelings through abstract visuals and ambient sound. The experience is wordless, relying entirely on color, motion, and audio to create an immersive journey.

### Key Features

- 🌊 **Particle Flow Field System** - 500 particles moving through Perlin noise-based flow fields
- 🎵 **Generative Audio** - Dynamic soundscapes powered by Tone.js
- 🎭 **Emotional Palettes** - Four core emotional states (Peace, Hope, Fear, Connection)
- ⚡ **Intensity Control** - Real-time adjustment of visual chaos and audio complexity
- 🎨 **Premium Design** - High-end aesthetic with elegant animations

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Echoes Without Words"

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── globals.css        # Global styles
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── Canvas.js          # p5.js canvas wrapper
│   ├── ControlTray.js     # UI controls
│   └── Experience.js      # Main experience
├── lib/                   # Core logic
│   ├── sketch.js          # p5.js particle system
│   └── audio.js           # Tone.js audio engine
└── public/                # Static assets
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Generative Art**: [p5.js](https://p5js.org/)
- **Audio**: [Tone.js](https://tonejs.github.io/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🎮 Usage

1. **Login Page** - Enter your credentials (currently visual only, no backend)
2. **Entry Screen** - Click "ENTER" to begin the experience
3. **Exploration** - Interact with the visual field:
   - Move your mouse to repel particles
   - Adjust the **Intensity** slider (0-100)
   - Select a **Core Value** (Peace, Hope, Fear, Connection)
4. **Immersion** - Let the visuals and audio guide your emotional journey

---

## 🎨 Design Philosophy

### Visual Language
- **Minimalism**: No words, labels, or instructions
- **Abstraction**: Shapes, colors, and motion convey emotion
- **Fluidity**: Organic, continuous movement
- **Responsiveness**: User interaction shapes the experience

### Color Palettes
- **Peace**: Teals & Cyans (#E0F7FA - #26C6DA)
- **Hope**: Warm Yellows (#FFFDE7 - #FFEE58)
- **Fear**: Reds (#FFEBEE - #EF5350)
- **Connection**: Purples (#F3E5F5 - #AB47BC)

---

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for future authentication:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=
# NEXT_PUBLIC_FIREBASE_API_KEY=
```

### Tailwind Configuration
Customize in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Add custom theme extensions
    },
  },
}
```

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🐛 Known Issues

- Login page is visual only (no authentication backend)
- Audio requires user interaction to start (browser security)
- Hydration warnings suppressed for animation components

---

## 🚧 Roadmap

- [ ] Implement authentication system
- [ ] Add user profiles and preferences
- [ ] Mobile optimization
- [ ] Accessibility improvements
- [ ] Export/screenshot functionality
- [ ] Enhanced audio synthesis
- [ ] Stillness detection & reflection phase

See `DEVELOPER_HANDOFF.md` for detailed implementation tasks.

---

## 📄 License

[Add your license here]

---

## 🙏 Acknowledgments

- Inspired by abstract expressionism and generative art
- Built with love for emotional exploration through technology

---

## 📧 Contact

For questions or collaboration:
- [Add contact information]

---

**Status**: Ready for authentication implementation  
**Last Updated**: January 8, 2026
