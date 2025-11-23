# Architecture Overview

This document provides a detailed explanation of the KaTeX Whiteboard architecture.

## System Overview

The KaTeX Whiteboard system consists of two main parts:

1. **Core Library** (`@katex-whiteboard/handwriter`): A TypeScript library that converts KaTeX expressions to handwritten strokes
2. **Web Application**: A React-based UI that provides an interactive interface for the library

## Core Library Architecture

### High-Level Flow

```
KaTeX String → Parser → Expression Tree → Layout Engine → Positioned Glyphs → 
Stroke Generator → Drawing Strokes → Animator → Drawing Plan → Excalidraw Adapter
```

### Detailed Components

#### 1. Parser (`src/parser/katex-parser.ts`)

**Responsibility**: Convert KaTeX LaTeX strings into our internal expression tree representation.

**How it works**:
- Uses KaTeX's internal `__parse` function to get the AST
- Converts KaTeX's AST nodes into our simplified expression tree
- Handles various node types: text, operators, fractions, scripts, roots, etc.

**Key Functions**:
- `parseKaTeX(latex: string): ExpressionNode` - Main entry point
- `convertKaTeXNode(node: any): ExpressionNode` - Recursive converter

**Example**:
```typescript
Input: "x^2 + y^2 = z^2"
Output: GroupNode {
  children: [
    ScriptNode { base: TextNode("x"), script: TextNode("2") },
    TextNode("+"),
    ScriptNode { base: TextNode("y"), script: TextNode("2") },
    TextNode("="),
    ScriptNode { base: TextNode("z"), script: TextNode("2") }
  ]
}
```

#### 2. Glyph Database (`src/glyphs/`)

**Responsibility**: Store handwritten representations of all mathematical symbols.

**Structure**:
Each glyph is defined in normalized coordinates (0-1) and includes:
- `strokes`: Array of stroke paths
- `baseline`: Vertical alignment (0-1)
- `aspectRatio`: Width/height ratio
- `advance`: How much to move horizontally after this glyph

**Glyph Design Philosophy**:
- All glyphs are hand-crafted to look naturally handwritten
- Strokes follow natural writing order (e.g., "8" is two circles)
- Points are carefully placed for smooth curves
- Normalized coordinates allow easy scaling

**Example Glyph**:
```typescript
{
  char: '2',
  strokes: [
    // Top curve
    { points: [
      { x: 0.2, y: 0.25 }, { x: 0.5, y: 0.05 }, { x: 0.8, y: 0.25 }, ...
    ]},
    // Bottom line
    { points: [{ x: 0.2, y: 0.95 }, { x: 0.8, y: 0.95 }]}
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
}
```

#### 3. Layout Engine (`src/layout/layout-engine.ts`)

**Responsibility**: Position glyphs in 2D space with correct mathematical layout.

**How it works**:
- Recursively traverses the expression tree
- Calculates position and size for each element
- Handles complex layouts (fractions, super/subscripts, roots)
- Returns positioned glyphs + additional strokes (lines, symbols)

**Key Concepts**:
- **LayoutContext**: Carries state through the tree (position, font size, baseline)
- **LayoutBox**: Describes bounding box and baseline of each element
- **PositionedGlyph**: Glyph with absolute position and size

**Layout Rules**:

1. **Fractions**: 
   - Numerator centered above line
   - Denominator centered below line
   - Smaller font size (0.7x)
   - Line extends slightly beyond content

2. **Superscripts/Subscripts**:
   - Smaller font (0.6x)
   - Superscript raised (0.6x font size)
   - Subscript lowered (0.2x font size)

3. **Square Roots**:
   - Content slightly smaller (0.9x)
   - Radical symbol drawn separately
   - Horizontal line over content

4. **Large Operators** (∫, ∑, ∏):
   - Larger size (1.5x)
   - Limits positioned above/below (for display mode)

#### 4. Stroke Generator (`src/strokes/stroke-generator.ts`)

**Responsibility**: Convert positioned glyphs to actual drawing strokes in absolute coordinates.

**Process**:
1. Transform each glyph's strokes from normalized (0-1) to absolute coordinates
2. Apply rotation if needed
3. Add natural variation (handwriting shakiness)
4. Optionally smooth and resample strokes

**Key Features**:
- **Variation**: Adds random noise for natural handwriting feel
- **Smoothing**: Catmull-Rom spline interpolation for smooth curves
- **Resampling**: Ensures even point spacing for consistent drawing speed

**Example Transformation**:
```typescript
// Normalized glyph stroke
points: [{ x: 0, y: 0 }, { x: 1, y: 1 }]

// After positioning (position: {x: 100, y: 200}, width: 50, height: 50)
points: [{ x: 100, y: 200 }, { x: 150, y: 250 }]

// After variation (variation: 0.3)
points: [{ x: 100.2, y: 199.8 }, { x: 150.1, y: 250.3 }]
```

#### 5. Animator (`src/animator/animator.ts`)

**Responsibility**: Create timing information for natural stroke-by-stroke animation.

**How it works**:
1. Calculate duration for each stroke based on length and speed
2. Add pauses between strokes
3. Create timeline of drawing instructions
4. Provide interpolation for partial stroke rendering

**Drawing Plan**:
```typescript
{
  instructions: [
    { type: 'stroke', points: [...], startTime: 0, endTime: 100 },
    { type: 'pause', duration: 50, startTime: 100, endTime: 150 },
    { type: 'stroke', points: [...], startTime: 150, endTime: 300 },
    ...
  ],
  totalDuration: 5000,
  bounds: { x: 100, y: 100, width: 500, height: 100 }
}
```

**Animation Features**:
- Variable speed based on stroke complexity
- Natural pauses between strokes
- Smooth interpolation for partial rendering
- Frame generation for any FPS

#### 6. Excalidraw Adapter (`src/excalidraw/excalidraw-adapter.ts`)

**Responsibility**: Convert our drawing instructions to Excalidraw elements.

**Two Modes**:

1. **Static Conversion**: Creates all elements at once
   ```typescript
   convertToExcalidrawElements(plan) → ExcalidrawElement[]
   ```

2. **Animated Drawing**: Progressive rendering with requestAnimationFrame
   ```typescript
   animateOnExcalidraw(api, plan) → Promise<void>
   ```

**Excalidraw Element Format**:
- Type: `'freedraw'`
- Points: Relative coordinates from (x, y)
- Styling: stroke color, width, roughness, opacity

## Web Application Architecture

### Component Structure

```
App
├── Sidebar
│   ├── KaTeX Input Textarea
│   ├── Speed Slider
│   ├── Position Inputs
│   ├── Submit Button
│   └── Example Equations
└── Excalidraw Container
    └── Excalidraw Component
```

### State Management

**App State**:
- `excalidrawAPI`: Reference to Excalidraw API
- `isAnimating`: Whether animation is in progress
- `handwriterRef`: Reference to KaTeXHandwriter instance

**Sidebar State**:
- `latex`: Current KaTeX expression
- `speed`: Writing speed (50-1000 px/s)
- `posX`, `posY`: Position on canvas
- `showExamples`: Whether examples are expanded

### Event Flow

```
User enters equation → Submit button clicked → App.handleSubmit → 
Create/update KaTeXHandwriter → handwriter.animateOnExcalidraw → 
Animation plays on Excalidraw → Animation complete → UI re-enabled
```

## Design Decisions

### Why Normalized Glyph Coordinates?

Using 0-1 normalized coordinates for glyphs makes them:
- Scale-independent (work at any font size)
- Easy to transform (just multiply by dimensions)
- Consistent (same mental model for all glyphs)

### Why Separate Layout and Stroke Generation?

Separating these concerns allows:
- Testing layout logic without rendering
- Using different rendering backends
- Easier debugging (inspect layout separately)
- Better performance (layout once, render multiple times)

### Why Custom Expression Tree Instead of Using KaTeX AST Directly?

Our simplified tree:
- Only includes what we need for layout
- Has consistent structure across KaTeX versions
- Is easier to traverse and reason about
- Isolates us from KaTeX internal changes

### Why Monorepo Structure?

- Library and webapp share TypeScript configs
- Easy to test library changes in webapp
- Single command to build everything
- Enforces clean separation between library and app

## Performance Considerations

### Optimizations

1. **Glyph Caching**: Glyphs are stored in a Map for O(1) lookup
2. **Stroke Resampling**: Ensures consistent point density for smooth animation
3. **RAF-based Animation**: Uses requestAnimationFrame for 60fps rendering
4. **Incremental Rendering**: Only renders changed strokes in Excalidraw

### Scalability

The system can handle:
- Equations with 100+ glyphs
- Complex nested structures (fractions in fractions)
- Real-time animation at 60fps
- Multiple equations on the same canvas

## Future Enhancements

Possible improvements:

1. **More Glyphs**: Add complete alphabet, more Greek letters, special symbols
2. **Matrix Support**: Full matrix/array layout
3. **Text Mode**: Handle text mixed with math
4. **Custom Styles**: Different handwriting styles (cursive, print, etc.)
5. **Physics-based Animation**: More natural acceleration/deceleration
6. **Multi-line Equations**: Automatic line breaking for long equations
7. **Undo/Redo**: Support for undoing drawn equations
8. **Export**: Export to SVG, PNG, or other formats

## Testing Strategy

Recommended testing approach:

1. **Unit Tests**: Test each module independently
   - Parser: Test KaTeX → Expression tree conversion
   - Layout: Test positioning logic
   - Stroke Generator: Test coordinate transformations
   - Animator: Test timing calculations

2. **Integration Tests**: Test complete flow
   - Simple equation → Complete drawing plan
   - Complex equation → Correct layout
   - Animation → Correct timing

3. **Visual Tests**: Manual verification
   - Render equations and verify appearance
   - Test animation smoothness
   - Verify positioning accuracy

## Extending the System

### Adding a New Glyph

1. Design the glyph in normalized coordinates
2. Add to `glyphDatabase` in `src/glyphs/additional-glyphs.ts`
3. Test with various font sizes

### Adding a New Layout Type

1. Add node type to `types.ts`
2. Implement parser conversion in `katex-parser.ts`
3. Implement layout logic in `layout-engine.ts`
4. Test with example equations

### Adding a New Rendering Backend

1. Create adapter in `src/adapters/`
2. Convert `DrawingPlan` to backend-specific format
3. Implement animation if supported
4. Export from main `index.ts`

## Conclusion

The KaTeX Whiteboard system is designed to be:
- **Modular**: Each component has clear responsibilities
- **Extensible**: Easy to add new glyphs, operators, or backends
- **Type-Safe**: Full TypeScript with comprehensive types
- **Performant**: Optimized for smooth real-time animation
- **Well-Documented**: Clear code with extensive comments

This architecture supports the goal of creating a professional, polished library for handwriting mathematical equations.

