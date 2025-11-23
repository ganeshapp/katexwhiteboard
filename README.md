# KaTeX Whiteboard

A complete system for rendering mathematical equations in handwritten style on an Excalidraw whiteboard. This project consists of a comprehensive library (`@katex-whiteboard/handwriter`) and a beautiful web application that demonstrates its capabilities.

## 🎯 Features

- **Handwritten Math Equations**: Convert any KaTeX expression into handwritten-style drawings
- **Natural Animation**: Watch equations being drawn stroke-by-stroke, just like a teacher writing on a blackboard
- **Excalidraw Integration**: Seamless integration with Excalidraw's powerful whiteboard
- **Complete KaTeX Support**: Handles fractions, roots, integrals, sums, Greek letters, and more
- **Highly Configurable**: Adjust writing speed, position, font size, and handwriting variation
- **Beautiful UI**: Modern, polished interface with example equations and real-time controls

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Build the library
npm run lib:build

# Start the webapp
npm run dev
```

The webapp will open at `http://localhost:3000`.

## 📦 Project Structure

```
katex-whiteboard/
├── packages/
│   └── handwriter/          # Core library
│       ├── src/
│       │   ├── parser/      # KaTeX parser
│       │   ├── layout/      # Layout engine
│       │   ├── glyphs/      # Handwritten glyph database
│       │   ├── strokes/     # Stroke generator
│       │   ├── animator/    # Animation system
│       │   ├── excalidraw/  # Excalidraw adapter
│       │   └── index.ts     # Main entry point
│       └── package.json
└── webapp/                  # React web application
    ├── src/
    │   ├── components/      # React components
    │   ├── App.tsx         # Main app
    │   └── main.tsx        # Entry point
    └── package.json
```

## 🎨 Using the Webapp

1. **Enter a KaTeX Expression**: Type any LaTeX math notation in the text box
2. **Adjust Settings**: 
   - Set writing speed (50-1000 px/s)
   - Choose X/Y position on canvas
3. **Click "Draw Equation"**: Watch as the equation is handwritten on the whiteboard
4. **Try Examples**: Click any example equation to see it in action

### Example Equations

- Quadratic Formula: `x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`
- Euler's Identity: `e^{i\pi} + 1 = 0`
- Integral: `\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}`
- Sum: `\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}`

## 📚 Using the Library

### Installation

```bash
npm install @katex-whiteboard/handwriter katex
```

### Basic Usage

```typescript
import { KaTeXHandwriter } from '@katex-whiteboard/handwriter';

// Create handwriter instance
const handwriter = new KaTeXHandwriter({
  fontSize: 40,
  speed: 300,
  position: { x: 100, y: 100 }
});

// Animate on Excalidraw
await handwriter.animateOnExcalidraw(
  excalidrawAPI,
  'x^2 + y^2 = r^2'
);
```

See [packages/handwriter/README.md](packages/handwriter/README.md) for complete API documentation.

## 🏗️ Architecture

### Core Library

The `@katex-whiteboard/handwriter` library is designed with a clean, modular architecture:

1. **Parser**: Converts KaTeX LaTeX strings into an expression tree
2. **Layout Engine**: Positions glyphs correctly (fractions, superscripts, etc.)
3. **Glyph Database**: Extensive collection of handwritten mathematical symbols
4. **Stroke Generator**: Converts positioned glyphs into drawing strokes
5. **Animator**: Creates timing information for natural animation
6. **Excalidraw Adapter**: Integration layer for Excalidraw API

### Design Principles

- **Type-Safe**: Full TypeScript with comprehensive type definitions
- **Modular**: Each component has a single, well-defined responsibility
- **Extensible**: Easy to add new glyphs, operators, or integrations
- **Performance**: Optimized for smooth animations even with complex equations

## 🎯 Supported Mathematical Notation

- **Basic**: Numbers, letters, operators (+, -, ×, ÷, =)
- **Greek**: α, β, γ, δ, θ, π, σ, ω, Δ, Σ, Π
- **Fractions**: `\frac{a}{b}`
- **Exponents/Subscripts**: `x^2`, `x_i`
- **Roots**: `\sqrt{x}`, `\sqrt[n]{x}`
- **Integrals**: `\int`, `\int_a^b`
- **Sums/Products**: `\sum`, `\prod`
- **Delimiters**: `()`, `[]`, `\{\}`
- **Accents**: `\hat{x}`, `\bar{x}`
- **Relations**: `<`, `>`, `\leq`, `\geq`
- **Special**: `\pm`, `\cdot`, `\infty`, `\partial`

## 🛠️ Development

### Building the Library

```bash
npm run lib:build
```

### Running in Development Mode

```bash
# Terminal 1: Watch library changes
npm run lib:dev

# Terminal 2: Run webapp
npm run dev
```

### Building Everything

```bash
npm run build
```

## 🚀 Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages.

**Setup:**
1. Go to your repository **Settings** → **Pages**
2. Set Source to **GitHub Actions**
3. Push to `main` branch

**Your site will be live at:**
`https://[your-username].github.io/katexwhiteboard/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Manual Build for Production

```bash
npm run build:gh-pages
```

The output will be in `webapp/dist/`

## 🎨 Customization

### Adding Custom Glyphs

Add glyphs to `packages/handwriter/src/glyphs/additional-glyphs.ts`:

```typescript
const myGlyph: Glyph = {
  char: '@',
  strokes: [
    {
      points: [
        { x: 0.5, y: 0.2 },
        { x: 0.8, y: 0.5 },
        // ... more points
      ]
    }
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
};

glyphDatabase.set('@', myGlyph);
```

## 📝 License

MIT

## 🙏 Acknowledgments

- **KaTeX**: For the excellent LaTeX math rendering library
- **Excalidraw**: For the beautiful whiteboard component

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.
