# @katex-whiteboard/handwriter

A comprehensive TypeScript library for converting KaTeX mathematical expressions into handwritten-style drawings. This library provides a complete solution for rendering mathematical equations as if they were hand-drawn by a teacher on a whiteboard.

## Features

- **Complete KaTeX Support**: Handles fractions, superscripts, subscripts, square roots, integrals, sums, and more
- **Handwritten Glyph Database**: Extensive collection of handwritten-style glyphs for numbers, letters, Greek symbols, and mathematical operators
- **Advanced Layout Engine**: Properly positions all mathematical elements with correct spacing and alignment
- **Natural Animation**: Smooth stroke-by-stroke animation that mimics human writing
- **Excalidraw Integration**: Built-in adapter for seamless integration with Excalidraw
- **Highly Configurable**: Control font size, writing speed, position, spacing, and variation
- **TypeScript First**: Full type safety with comprehensive type definitions

## Installation

```bash
npm install @katex-whiteboard/handwriter katex
```

## Quick Start

```typescript
import { KaTeXHandwriter } from '@katex-whiteboard/handwriter';

// Create a handwriter instance
const handwriter = new KaTeXHandwriter({
  fontSize: 40,
  speed: 300,
  position: { x: 100, y: 100 },
  spacing: 0.1,
  variation: 0.3
});

// Create a drawing plan for an equation
const plan = handwriter.createDrawingPlan('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');

// Animate on Excalidraw
await handwriter.animateOnExcalidraw(excalidrawAPI, 'E = mc^2');
```

## API Reference

### KaTeXHandwriter Class

#### Constructor

```typescript
new KaTeXHandwriter(config?: Partial<HandwriterConfig>)
```

**Config Options:**
- `fontSize` (number): Base font size in pixels (default: 40)
- `speed` (number): Writing speed in pixels per second (default: 300)
- `position` (Point): Starting position {x, y} (default: {x: 100, y: 100})
- `spacing` (number): Spacing between elements as factor of font size (default: 0.1)
- `variation` (number): Handwriting shakiness, 0-1 (default: 0.3)

#### Methods

##### `createDrawingPlan(latex: string): DrawingPlan`

Parses a KaTeX expression and creates a complete drawing plan with timing information.

```typescript
const plan = handwriter.createDrawingPlan('\\int_0^\\infty e^{-x^2} dx');
```

##### `toExcalidrawElements(latex: string, config?: ExcalidrawConfig)`

Converts a KaTeX expression to Excalidraw elements (without animation).

```typescript
const elements = handwriter.toExcalidrawElements('a^2 + b^2 = c^2', {
  strokeColor: '#000000',
  strokeWidth: 2,
  roughness: 0
});
```

##### `animateOnExcalidraw(excalidrawAPI: any, latex: string, config?: ExcalidrawConfig): Promise<void>`

Animates the equation being drawn on Excalidraw.

```typescript
await handwriter.animateOnExcalidraw(
  excalidrawAPI,
  '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
  {
    strokeColor: '#1e1e1e',
    strokeWidth: 2
  }
);
```

##### `updateConfig(config: Partial<HandwriterConfig>): void`

Updates the configuration.

```typescript
handwriter.updateConfig({
  speed: 500,
  variation: 0.5
});
```

### Convenience Functions

#### `createHandwrittenEquation(latex: string, config?: Partial<HandwriterConfig>): DrawingPlan`

Quick function to create a drawing plan without instantiating a class.

```typescript
import { createHandwrittenEquation } from '@katex-whiteboard/handwriter';

const plan = createHandwrittenEquation('x^2 + y^2 = r^2', {
  fontSize: 50,
  speed: 400
});
```

#### `katexToExcalidraw(latex: string, config?, excalidrawConfig?)`

Quick function to convert to Excalidraw elements.

```typescript
import { katexToExcalidraw } from '@katex-whiteboard/handwriter';

const elements = katexToExcalidraw('E = mc^2');
```

## Supported KaTeX Features

### Basic Elements
- Numbers: `0-9`
- Latin letters: `a-z`, `A-Z`
- Greek letters: `\alpha`, `\beta`, `\gamma`, `\delta`, `\theta`, `\pi`, `\sigma`, `\omega`, `\Delta`, `\Sigma`, `\Pi`

### Operators
- Basic: `+`, `-`, `=`, `\times`, `\div`
- Relations: `<`, `>`, `\leq`, `\geq`
- Special: `\pm`, `\cdot`

### Fractions
```latex
\frac{numerator}{denominator}
```

### Superscripts and Subscripts
```latex
x^2, x_i, x_i^2
```

### Roots
```latex
\sqrt{x}, \sqrt[n]{x}
```

### Large Operators
```latex
\int, \sum, \prod
```

### Delimiters
```latex
(x), [x], \{x\}
```

### Accents
```latex
\hat{x}, \bar{x}
```

## Advanced Usage

### Custom Drawing Loop

```typescript
import { parseKaTeX, layoutExpression, generateStrokes, createDrawingPlan } from '@katex-whiteboard/handwriter';

// Parse KaTeX
const tree = parseKaTeX('x^2 + y^2 = z^2');

// Layout
const layout = layoutExpression(tree, {
  fontSize: 40,
  spacing: 0.1,
  currentX: 100,
  currentY: 100,
  baselineY: 128
});

// Generate strokes
const strokes = generateStrokes(
  layout.glyphs,
  layout.additionalStrokes,
  0.3 // variation
);

// Create animation plan
const plan = createDrawingPlan(strokes, layout.box, {
  speed: 300
});
```

### Custom Canvas Integration

The library generates generic stroke data that can be used with any canvas system:

```typescript
const plan = handwriter.createDrawingPlan('a + b = c');

// Draw on HTML canvas
const ctx = canvas.getContext('2d');
for (const instruction of plan.instructions) {
  if (instruction.type === 'stroke') {
    ctx.beginPath();
    instruction.points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }
}
```

## Architecture

The library is organized into several modules:

1. **Parser** (`src/parser/`): Converts KaTeX strings to expression trees
2. **Layout Engine** (`src/layout/`): Positions glyphs and creates layout boxes
3. **Glyphs** (`src/glyphs/`): Handwritten glyph database
4. **Stroke Generator** (`src/strokes/`): Converts positioned glyphs to drawing strokes
5. **Animator** (`src/animator/`): Creates timing information for animations
6. **Excalidraw Adapter** (`src/excalidraw/`): Integration layer for Excalidraw

## Type Definitions

All types are exported from the main module:

```typescript
import type {
  HandwriterConfig,
  DrawingPlan,
  Point,
  Stroke,
  Glyph,
  ExpressionNode,
  LayoutBox,
  ExcalidrawConfig
} from '@katex-whiteboard/handwriter';
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

