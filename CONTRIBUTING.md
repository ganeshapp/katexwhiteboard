# Contributing to KaTeX Whiteboard

Thank you for your interest in contributing to KaTeX Whiteboard! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm
- Git
- A code editor (VS Code recommended)

### Setting Up the Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/katexwhiteboard.git
   cd katexwhiteboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Library**
   ```bash
   npm run lib:build
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

### Development Workflow

For active development with hot reload:

```bash
# Terminal 1: Watch and rebuild library on changes
npm run lib:dev

# Terminal 2: Run the webapp
npm run dev
```

## Project Structure

```
katex-whiteboard/
├── packages/
│   └── handwriter/          # Core library
│       ├── src/
│       │   ├── parser/      # KaTeX parsing
│       │   ├── layout/      # Layout engine
│       │   ├── glyphs/      # Glyph database
│       │   ├── strokes/     # Stroke generation
│       │   ├── animator/    # Animation system
│       │   ├── excalidraw/  # Excalidraw integration
│       │   └── types.ts     # Type definitions
│       └── package.json
└── webapp/                  # React application
    ├── src/
    │   ├── components/      # React components
    │   └── App.tsx         # Main app
    └── package.json
```

## How to Contribute

### Reporting Bugs

Before creating a bug report:
- Check if the issue already exists
- Ensure you're using the latest version
- Test with a minimal reproducible example

When reporting a bug, include:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- KaTeX expression that causes the issue
- Browser/environment information
- Screenshots if applicable

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature has already been requested
- Clearly describe the use case
- Provide examples if possible
- Consider if it fits the project's scope

### Pull Requests

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the coding style (see below)
   - Add/update tests if applicable
   - Update documentation

3. **Test Your Changes**
   ```bash
   # Build the library
   npm run lib:build
   
   # Run the webapp and test manually
   npm run dev
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Coding Guidelines

### TypeScript Style

- Use TypeScript for all new code
- Provide type annotations for function parameters and return types
- Use interfaces for object shapes
- Avoid `any` - use `unknown` if type is truly unknown

```typescript
// Good
function layoutText(node: TextNode, context: LayoutContext): LayoutResult {
  // ...
}

// Avoid
function layoutText(node: any, context: any): any {
  // ...
}
```

### Code Organization

- One component per file
- Group related functionality in directories
- Export from index files for clean imports

```typescript
// Good
import { parseKaTeX, extractText } from './parser';

// Avoid
import { parseKaTeX } from './parser/katex-parser';
import { extractText } from './parser/katex-parser';
```

### Naming Conventions

- **Files**: kebab-case (e.g., `katex-parser.ts`, `layout-engine.ts`)
- **Classes**: PascalCase (e.g., `KaTeXHandwriter`)
- **Functions**: camelCase (e.g., `parseKaTeX`, `layoutExpression`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_FONT_SIZE`)
- **Interfaces/Types**: PascalCase (e.g., `ExpressionNode`, `LayoutBox`)

### Comments

- Use JSDoc comments for public APIs
- Add inline comments for complex logic
- Explain "why", not "what"

```typescript
/**
 * Parse a KaTeX string into our expression tree
 * 
 * @param latex - The KaTeX LaTeX string
 * @returns An expression tree node
 * @throws Error if the KaTeX syntax is invalid
 */
export function parseKaTeX(latex: string): ExpressionNode {
  // Use KaTeX's internal parser for accurate AST
  const parsed = katex.__parse(latex);
  return convertKaTeXNode(parsed);
}
```

## Adding New Features

### Adding a New Glyph

1. **Design the Glyph**
   - Use normalized coordinates (0-1)
   - Follow natural writing order
   - Keep strokes smooth and minimal

2. **Add to Database**
   ```typescript
   // In src/glyphs/additional-glyphs.ts
   const myGlyph: Glyph = {
     char: '∇',
     strokes: [
       {
         points: [
           { x: 0.5, y: 0.1 },
           { x: 0.1, y: 0.9 },
           { x: 0.9, y: 0.9 },
           { x: 0.5, y: 0.1 }
         ]
       }
     ],
     baseline: 0.85,
     aspectRatio: 0.8,
     advance: 0.85
   };
   
   glyphDatabase.set('∇', myGlyph);
   ```

3. **Test**
   - Test at different font sizes
   - Test in equations
   - Verify appearance

### Adding a New Layout Type

1. **Define Node Type**
   ```typescript
   // In types.ts
   export interface MyNewNode extends ExpressionNode {
     type: 'mynew';
     content: ExpressionNode;
     // other properties
   }
   ```

2. **Update Parser**
   ```typescript
   // In parser/katex-parser.ts
   case 'mynew':
     return {
       type: 'mynew',
       content: convertKaTeXNode(node.body)
     } as MyNewNode;
   ```

3. **Implement Layout**
   ```typescript
   // In layout/layout-engine.ts
   case 'mynew':
     return layoutMyNew(node as MyNewNode, context);
   
   function layoutMyNew(node: MyNewNode, context: LayoutContext): LayoutResult {
     // Layout logic here
   }
   ```

4. **Test with Examples**
   - Create test equations
   - Verify positioning
   - Check edge cases

### Adding a New Backend Adapter

1. **Create Adapter File**
   ```typescript
   // In src/adapters/my-backend-adapter.ts
   export function convertToMyBackend(plan: DrawingPlan): MyBackendElement[] {
     // Conversion logic
   }
   ```

2. **Export from Main**
   ```typescript
   // In src/index.ts
   export { convertToMyBackend } from './adapters/my-backend-adapter.js';
   ```

3. **Document Usage**
   - Add examples to EXAMPLES.md
   - Update README

## Testing

### Manual Testing

1. **Test in Webapp**
   - Try the equation in the webapp
   - Verify appearance and animation
   - Test at different speeds and sizes

2. **Test Edge Cases**
   - Very long equations
   - Deeply nested structures
   - Special characters
   - Invalid input

3. **Browser Testing**
   - Test in Chrome, Firefox, Safari
   - Test on mobile if applicable

### Test Checklist for New Features

- [ ] Feature works with simple equations
- [ ] Feature works with complex equations
- [ ] No TypeScript errors
- [ ] Documentation updated
- [ ] Examples added
- [ ] Works at different font sizes
- [ ] Works at different speeds
- [ ] Animation is smooth

## Documentation

### Updating Documentation

When adding features, update:

1. **README.md** - If it's a major feature
2. **packages/handwriter/README.md** - API changes
3. **EXAMPLES.md** - Add usage examples
4. **ARCHITECTURE.md** - If architecture changes
5. **Code Comments** - JSDoc for public APIs

### Writing Good Documentation

- Be clear and concise
- Provide code examples
- Explain both what and why
- Include edge cases and gotchas

## Common Tasks

### Adding More Lowercase Letters

```typescript
// In src/glyphs/additional-glyphs.ts
const additionalLowercase: Record<string, Glyph> = {
  'q': {
    char: 'q',
    strokes: [/* ... */],
    baseline: 0.7,
    aspectRatio: 0.75,
    advance: 0.8
  }
};
```

### Adjusting Layout Rules

```typescript
// In src/layout/layout-engine.ts
function layoutFraction(node: FractionNode, context: LayoutContext): LayoutResult {
  // Adjust font size ratio
  const smallerFontSize = fontSize * 0.7; // Change this
  
  // Adjust vertical spacing
  numeratorContext.baselineY = context.baselineY - fontSize * 0.6; // Change this
}
```

### Changing Animation Timing

```typescript
// In src/animator/animator.ts
export function createDrawingPlan(strokes: Stroke[], ...): DrawingPlan {
  const pauseBetweenStrokes = config.pauseBetweenStrokes ?? 50; // Change default
}
```

## Performance Guidelines

- Minimize re-renders in React components
- Use memoization for expensive calculations
- Batch Excalidraw updates when possible
- Keep glyph database lookups efficient (Map-based)

## Questions?

If you have questions:
- Check existing issues and discussions
- Read the ARCHITECTURE.md for design details
- Open a discussion for general questions
- Open an issue for specific problems

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to KaTeX Whiteboard! 🎉

