# Quick Start Guide

Get up and running with KaTeX Whiteboard in minutes!

## 🚀 For End Users (Running the Webapp)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Build the Library

```bash
npm run lib:build
```

### Step 3: Start the Webapp

```bash
npm run dev
```

### Step 4: Open Your Browser

Navigate to `http://localhost:3000`

### Step 5: Try It Out!

1. Type a KaTeX expression in the text box (e.g., `x^2 + y^2 = r^2`)
2. Adjust the writing speed slider
3. Click "Draw Equation"
4. Watch the magic happen! ✨

## 📚 For Developers (Using the Library)

### Installation

```bash
npm install @katex-whiteboard/handwriter katex
```

### Basic Usage

```typescript
import { KaTeXHandwriter } from '@katex-whiteboard/handwriter';

// Create instance
const handwriter = new KaTeXHandwriter({
  fontSize: 40,
  speed: 300,
  position: { x: 100, y: 100 }
});

// Draw on Excalidraw
await handwriter.animateOnExcalidraw(
  excalidrawAPI,
  'E = mc^2'
);
```

### Common Equations to Try

```typescript
// Quadratic formula
'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'

// Euler's identity
'e^{i\\pi} + 1 = 0'

// Integral
'\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}'

// Sum
'\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}'

// Greek letters
'\\alpha + \\beta = \\gamma'
```

## 🎨 Customization Quick Reference

### Font Size

```typescript
handwriter.updateConfig({ fontSize: 60 }); // Larger
handwriter.updateConfig({ fontSize: 20 }); // Smaller
```

### Writing Speed

```typescript
handwriter.updateConfig({ speed: 100 });  // Slow
handwriter.updateConfig({ speed: 500 });  // Fast
```

### Handwriting Variation

```typescript
handwriter.updateConfig({ variation: 0 });    // Perfect
handwriter.updateConfig({ variation: 0.5 });  // Natural
handwriter.updateConfig({ variation: 1 });    // Very shaky
```

### Position

```typescript
handwriter.updateConfig({
  position: { x: 200, y: 150 }
});
```

### Styling (Excalidraw)

```typescript
await handwriter.animateOnExcalidraw(
  excalidrawAPI,
  equation,
  {
    strokeColor: '#dc2626',  // Red
    strokeWidth: 3,          // Thicker
    opacity: 90              // Slightly transparent
  }
);
```

## 🔧 Troubleshooting

### "Module not found" Error

Make sure you've built the library:
```bash
npm run lib:build
```

### KaTeX Syntax Error

Check your LaTeX syntax. Common issues:
- Use `\\frac{a}{b}` not `\frac{a}{b}` (double backslash in strings)
- Use `{}` for groups: `x^{2}` not just `x^2` (though both work)
- Use `\\` for special symbols: `\\alpha`, `\\beta`, etc.

### Animation Not Starting

Make sure you have a valid Excalidraw API reference:
```typescript
<Excalidraw
  excalidrawAPI={(api) => setExcalidrawAPI(api)}
/>
```

### Glyphs Appearing as Boxes

The character might not be in the glyph database yet. Check the console for warnings about missing glyphs.

## 📖 Next Steps

- Read the [full README](README.md) for more details
- Check out [EXAMPLES.md](EXAMPLES.md) for comprehensive examples
- Learn about the [architecture](ARCHITECTURE.md)
- See [CONTRIBUTING.md](CONTRIBUTING.md) to add features

## 💡 Tips

1. **Start Simple**: Test with simple equations first (`a + b = c`)
2. **Adjust Speed**: Use slower speeds (100-200) for demos, faster (400-600) for production
3. **Use Examples**: The webapp has built-in examples - use them as templates
4. **Check Console**: Open browser console to see any errors or warnings
5. **Experiment**: Try different variations and speeds to find what looks best

## 🎯 Common Use Cases

### Educational Videos
```typescript
handwriter.updateConfig({
  fontSize: 50,
  speed: 200,
  variation: 0.4
});
```

### Quick Diagrams
```typescript
handwriter.updateConfig({
  fontSize: 40,
  speed: 600,
  variation: 0.2
});
```

### Beautiful Presentations
```typescript
handwriter.updateConfig({
  fontSize: 60,
  speed: 250,
  variation: 0.3
});
```

## 🌟 Pro Tips

1. **Chain Equations**: Draw multiple equations by updating position between calls
2. **Create Lessons**: Use pauses and different speeds to create step-by-step lessons
3. **Style Variations**: Use different colors for different parts (title vs content)
4. **Save Templates**: Create presets for common configurations

## ❓ Questions?

- Check the [README](README.md)
- Look at [examples](EXAMPLES.md)
- Open an issue on GitHub
- Read the [architecture docs](ARCHITECTURE.md)

Happy handwriting! 🎉

