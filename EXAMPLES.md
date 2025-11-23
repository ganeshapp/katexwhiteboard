# KaTeX Whiteboard Examples

This document provides comprehensive examples of using the KaTeX Whiteboard library.

## Basic Examples

### Simple Equation

```typescript
import { KaTeXHandwriter } from '@katex-whiteboard/handwriter';

const handwriter = new KaTeXHandwriter();
await handwriter.animateOnExcalidraw(excalidrawAPI, 'x + y = z');
```

### Quadratic Equation

```typescript
const equation = 'ax^2 + bx + c = 0';
await handwriter.animateOnExcalidraw(excalidrawAPI, equation);
```

## Intermediate Examples

### Quadratic Formula

```typescript
const formula = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
await handwriter.animateOnExcalidraw(excalidrawAPI, formula);
```

### Pythagorean Theorem

```typescript
const theorem = 'a^2 + b^2 = c^2';
await handwriter.animateOnExcalidraw(excalidrawAPI, theorem);
```

### Euler's Identity

```typescript
const identity = 'e^{i\\pi} + 1 = 0';
await handwriter.animateOnExcalidraw(excalidrawAPI, identity);
```

## Advanced Examples

### Integral with Limits

```typescript
const integral = '\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}';

const handwriter = new KaTeXHandwriter({
  fontSize: 50,
  speed: 250,
  position: { x: 150, y: 150 }
});

await handwriter.animateOnExcalidraw(excalidrawAPI, integral, {
  strokeColor: '#1e40af',
  strokeWidth: 2.5
});
```

### Infinite Series

```typescript
const series = '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}';
await handwriter.animateOnExcalidraw(excalidrawAPI, series);
```

### Complex Fraction

```typescript
const complexFraction = '\\frac{\\frac{a}{b}}{\\frac{c}{d}} = \\frac{ad}{bc}';
await handwriter.animateOnExcalidraw(excalidrawAPI, complexFraction);
```

### Product Notation

```typescript
const product = '\\prod_{i=1}^{n} x_i = x_1 \\cdot x_2 \\cdot ... \\cdot x_n';
await handwriter.animateOnExcalidraw(excalidrawAPI, product);
```

## Configuration Examples

### Slow Writing with High Variation

```typescript
const handwriter = new KaTeXHandwriter({
  fontSize: 60,
  speed: 100,  // Very slow
  variation: 0.8,  // Very shaky
  spacing: 0.15
});

await handwriter.animateOnExcalidraw(
  excalidrawAPI,
  'E = mc^2'
);
```

### Fast Writing with No Variation

```typescript
const handwriter = new KaTeXHandwriter({
  fontSize: 40,
  speed: 800,  // Very fast
  variation: 0,  // Perfect lines
  spacing: 0.05
});

await handwriter.animateOnExcalidraw(
  excalidrawAPI,
  'F = ma'
);
```

### Custom Styling

```typescript
await handwriter.animateOnExcalidraw(
  excalidrawAPI,
  '\\alpha + \\beta = \\gamma',
  {
    strokeColor: '#dc2626',  // Red
    strokeWidth: 3,
    opacity: 90
  }
);
```

## Multiple Equations

### Drawing Multiple Equations

```typescript
const equations = [
  { latex: 'a^2 + b^2 = c^2', x: 100, y: 100 },
  { latex: 'E = mc^2', x: 100, y: 200 },
  { latex: 'F = ma', x: 100, y: 300 }
];

for (const eq of equations) {
  handwriter.updateConfig({
    position: { x: eq.x, y: eq.y }
  });
  
  await handwriter.animateOnExcalidraw(excalidrawAPI, eq.latex);
  
  // Wait a bit between equations
  await new Promise(resolve => setTimeout(resolve, 500));
}
```

## Greek Letters

### Common Greek Letters

```typescript
const greekExamples = [
  '\\alpha + \\beta = \\gamma',
  '\\theta = 2\\pi',
  '\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}',
  '\\sigma^2 = \\frac{1}{n}\\sum(x_i - \\mu)^2'
];

for (const example of greekExamples) {
  await handwriter.animateOnExcalidraw(excalidrawAPI, example);
}
```

## Special Symbols

### Relations and Operators

```typescript
const relations = 'a < b, c > d, e \\leq f, g \\geq h';
await handwriter.animateOnExcalidraw(excalidrawAPI, relations);

const operators = 'a \\pm b, c \\times d, e \\div f';
await handwriter.animateOnExcalidraw(excalidrawAPI, operators);
```

### Infinity and Special Symbols

```typescript
const special = '\\lim_{x \\to \\infty} \\frac{1}{x} = 0';
await handwriter.animateOnExcalidraw(excalidrawAPI, special);
```

## Without Animation

### Static Drawing

```typescript
// Get Excalidraw elements without animation
const elements = handwriter.toExcalidrawElements('x^2 + y^2 = r^2');

// Add all at once
const currentElements = excalidrawAPI.getSceneElements();
excalidrawAPI.updateScene({
  elements: [...currentElements, ...elements]
});
```

## Custom Drawing Plan

### Creating and Inspecting a Drawing Plan

```typescript
import { createHandwrittenEquation } from '@katex-whiteboard/handwriter';

const plan = createHandwrittenEquation('\\frac{a}{b}', {
  fontSize: 40,
  speed: 300,
  position: { x: 100, y: 100 }
});

console.log('Total duration:', plan.totalDuration, 'ms');
console.log('Number of strokes:', plan.instructions.filter(i => i.type === 'stroke').length);
console.log('Bounding box:', plan.bounds);

// Use the plan however you want
// You can render it frame by frame, export to SVG, etc.
```

## Advanced: Custom Canvas Integration

### Drawing on HTML Canvas

```typescript
import { createHandwrittenEquation } from '@katex-whiteboard/handwriter';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const plan = createHandwrittenEquation('x^2 + y^2 = r^2');

// Draw all strokes at once
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

for (const instruction of plan.instructions) {
  if (instruction.type === 'stroke' && instruction.points) {
    ctx.beginPath();
    instruction.points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
  }
}
```

### Animated Canvas Drawing

```typescript
import { getDrawingStateAtTime } from '@katex-whiteboard/handwriter';

const plan = createHandwrittenEquation('E = mc^2');

let startTime: number | null = null;

function animate(timestamp: number) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Get current state
  const strokes = getDrawingStateAtTime(plan, elapsed);
  
  // Draw all strokes up to this point
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  
  for (const stroke of strokes) {
    ctx.beginPath();
    stroke.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }
  
  // Continue animation
  if (elapsed < plan.totalDuration) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

## Error Handling

### Handling Invalid KaTeX

```typescript
try {
  await handwriter.animateOnExcalidraw(excalidrawAPI, '\\invalid{command}');
} catch (error) {
  console.error('Invalid KaTeX:', error.message);
  // Show error to user
}
```

### Checking Before Drawing

```typescript
import { parseKaTeX } from '@katex-whiteboard/handwriter';

function validateKaTeX(latex: string): boolean {
  try {
    parseKaTeX(latex);
    return true;
  } catch {
    return false;
  }
}

if (validateKaTeX(userInput)) {
  await handwriter.animateOnExcalidraw(excalidrawAPI, userInput);
} else {
  alert('Invalid KaTeX expression');
}
```

## Performance Tips

### Optimizing for Long Equations

```typescript
// For very long equations, use faster speed
const longEquation = '\\sum_{n=1}^{100} \\frac{1}{n^2} + \\int_0^{10} x^2 dx + ...';

handwriter.updateConfig({
  speed: 600,  // Faster
  variation: 0.1  // Less variation = simpler strokes
});

await handwriter.animateOnExcalidraw(excalidrawAPI, longEquation);
```

### Batch Drawing Without Animation

```typescript
// For drawing many equations quickly
const equations = ['a=b', 'c=d', 'e=f', /* ... many more ... */];

const allElements = equations.flatMap((eq, i) => {
  handwriter.updateConfig({
    position: { x: 100, y: 100 + i * 80 }
  });
  return handwriter.toExcalidrawElements(eq);
});

// Add all at once (much faster than animating each)
excalidrawAPI.updateScene({
  elements: [...excalidrawAPI.getSceneElements(), ...allElements]
});
```

## Tips and Tricks

### Perfect Alignment

```typescript
// Calculate exact position based on previous equations
let currentY = 100;

for (const equation of equations) {
  const plan = createHandwrittenEquation(equation, {
    position: { x: 100, y: currentY }
  });
  
  await handwriter.animateOnExcalidraw(excalidrawAPI, equation);
  
  // Move to next line with proper spacing
  currentY += plan.bounds.height + 40;
}
```

### Different Styles for Different Parts

```typescript
// Title in large, slow writing
handwriter.updateConfig({ fontSize: 60, speed: 200 });
await handwriter.animateOnExcalidraw(excalidrawAPI, '\\text{Theorem}');

// Content in normal size, faster
handwriter.updateConfig({ fontSize: 40, speed: 400 });
await handwriter.animateOnExcalidraw(excalidrawAPI, 'a^2 + b^2 = c^2');
```

### Creating a Math Lesson

```typescript
const lesson = [
  { title: 'Pythagorean Theorem', eq: 'a^2 + b^2 = c^2' },
  { title: 'Example', eq: '3^2 + 4^2 = 5^2' },
  { title: 'Proof', eq: '9 + 16 = 25' }
];

let y = 100;

for (const step of lesson) {
  // Title
  handwriter.updateConfig({
    fontSize: 30,
    position: { x: 100, y }
  });
  await handwriter.animateOnExcalidraw(excalidrawAPI, step.title);
  y += 50;
  
  // Equation
  handwriter.updateConfig({
    fontSize: 40,
    position: { x: 120, y }
  });
  await handwriter.animateOnExcalidraw(excalidrawAPI, step.eq);
  y += 80;
  
  // Pause between steps
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

## Conclusion

These examples demonstrate the flexibility and power of the KaTeX Whiteboard library. Experiment with different configurations, equations, and use cases to create the perfect handwritten math experience for your application!

