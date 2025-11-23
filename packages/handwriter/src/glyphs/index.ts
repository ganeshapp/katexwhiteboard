/**
 * Handwritten glyph database
 * 
 * Each glyph is defined in a normalized coordinate space (0-1)
 * where (0,0) is top-left and (1,1) is bottom-right
 */

import { Glyph, Stroke, Point } from '../types.js';

/** Helper to create a point */
const p = (x: number, y: number): Point => ({ x, y });

/** Helper to create a stroke */
const s = (...points: Point[]): Stroke => ({ points });

/**
 * Database of all handwritten glyphs
 * Each glyph is carefully designed to look handwritten
 */
export const glyphDatabase: Map<string, Glyph> = new Map();

// Numbers
glyphDatabase.set('0', {
  char: '0',
  strokes: [
    s(
      p(0.7, 0.15), p(0.5, 0.05), p(0.3, 0.15),
      p(0.15, 0.35), p(0.1, 0.5), p(0.15, 0.65),
      p(0.3, 0.85), p(0.5, 0.95), p(0.7, 0.85),
      p(0.85, 0.65), p(0.9, 0.5), p(0.85, 0.35),
      p(0.7, 0.15)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('1', {
  char: '1',
  strokes: [
    s(p(0.3, 0.2), p(0.5, 0.05)),
    s(p(0.5, 0.05), p(0.5, 0.95))
  ],
  baseline: 0.85,
  aspectRatio: 0.5,
  advance: 0.55
});

glyphDatabase.set('2', {
  char: '2',
  strokes: [
    s(
      p(0.2, 0.25), p(0.3, 0.1), p(0.5, 0.05),
      p(0.7, 0.1), p(0.8, 0.25), p(0.75, 0.4),
      p(0.5, 0.6), p(0.2, 0.85)
    ),
    s(p(0.2, 0.95), p(0.8, 0.95))
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('3', {
  char: '3',
  strokes: [
    s(
      p(0.2, 0.15), p(0.4, 0.05), p(0.6, 0.05),
      p(0.75, 0.15), p(0.8, 0.3), p(0.65, 0.45),
      p(0.5, 0.5)
    ),
    s(
      p(0.5, 0.5), p(0.7, 0.55), p(0.85, 0.7),
      p(0.85, 0.85), p(0.7, 0.95), p(0.4, 0.95),
      p(0.2, 0.85)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('4', {
  char: '4',
  strokes: [
    s(p(0.6, 0.05), p(0.15, 0.65), p(0.85, 0.65)),
    s(p(0.6, 0.05), p(0.6, 0.95))
  ],
  baseline: 0.85,
  aspectRatio: 0.75,
  advance: 0.8
});

glyphDatabase.set('5', {
  char: '5',
  strokes: [
    s(p(0.75, 0.05), p(0.25, 0.05), p(0.2, 0.45)),
    s(
      p(0.2, 0.45), p(0.5, 0.4), p(0.75, 0.5),
      p(0.85, 0.7), p(0.8, 0.85), p(0.6, 0.95),
      p(0.3, 0.95), p(0.15, 0.8)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('6', {
  char: '6',
  strokes: [
    s(
      p(0.7, 0.2), p(0.5, 0.05), p(0.3, 0.15),
      p(0.15, 0.35), p(0.1, 0.6), p(0.15, 0.75),
      p(0.3, 0.85), p(0.5, 0.9), p(0.7, 0.85),
      p(0.85, 0.7), p(0.85, 0.55), p(0.7, 0.45),
      p(0.5, 0.4), p(0.3, 0.45), p(0.15, 0.55)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('7', {
  char: '7',
  strokes: [
    s(p(0.15, 0.05), p(0.85, 0.05), p(0.4, 0.95))
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('8', {
  char: '8',
  strokes: [
    s(
      p(0.5, 0.45), p(0.3, 0.35), p(0.25, 0.2),
      p(0.35, 0.08), p(0.5, 0.05), p(0.65, 0.08),
      p(0.75, 0.2), p(0.7, 0.35), p(0.5, 0.45)
    ),
    s(
      p(0.5, 0.45), p(0.2, 0.55), p(0.15, 0.75),
      p(0.25, 0.9), p(0.5, 0.95), p(0.75, 0.9),
      p(0.85, 0.75), p(0.8, 0.55), p(0.5, 0.45)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('9', {
  char: '9',
  strokes: [
    s(
      p(0.85, 0.45), p(0.7, 0.55), p(0.5, 0.6),
      p(0.3, 0.55), p(0.15, 0.4), p(0.15, 0.25),
      p(0.3, 0.15), p(0.5, 0.1), p(0.7, 0.15),
      p(0.85, 0.25), p(0.9, 0.4), p(0.85, 0.65),
      p(0.7, 0.85), p(0.5, 0.95), p(0.3, 0.8)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

// Lowercase letters (most commonly used in math)
glyphDatabase.set('a', {
  char: 'a',
  strokes: [
    s(
      p(0.75, 0.3), p(0.5, 0.2), p(0.3, 0.3),
      p(0.2, 0.45), p(0.25, 0.6), p(0.45, 0.7),
      p(0.65, 0.65), p(0.75, 0.5)
    ),
    s(p(0.75, 0.3), p(0.75, 0.7))
  ],
  baseline: 0.7,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('b', {
  char: 'b',
  strokes: [
    s(p(0.2, 0.05), p(0.2, 0.95)),
    s(
      p(0.2, 0.35), p(0.4, 0.25), p(0.6, 0.25),
      p(0.8, 0.35), p(0.85, 0.55), p(0.8, 0.75),
      p(0.6, 0.85), p(0.4, 0.85), p(0.2, 0.75)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.75,
  advance: 0.8
});

glyphDatabase.set('c', {
  char: 'c',
  strokes: [
    s(
      p(0.85, 0.35), p(0.65, 0.22), p(0.4, 0.2),
      p(0.25, 0.35), p(0.2, 0.55), p(0.25, 0.75),
      p(0.4, 0.9), p(0.65, 0.88), p(0.85, 0.75)
    )
  ],
  baseline: 0.7,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('d', {
  char: 'd',
  strokes: [
    s(
      p(0.8, 0.75), p(0.6, 0.85), p(0.4, 0.85),
      p(0.2, 0.75), p(0.15, 0.55), p(0.2, 0.35),
      p(0.4, 0.25), p(0.6, 0.25), p(0.8, 0.35)
    ),
    s(p(0.8, 0.35), p(0.8, 0.05), p(0.8, 0.95))
  ],
  baseline: 0.85,
  aspectRatio: 0.75,
  advance: 0.8
});

glyphDatabase.set('x', {
  char: 'x',
  strokes: [
    s(p(0.15, 0.25), p(0.75, 0.85)),
    s(p(0.75, 0.25), p(0.15, 0.85))
  ],
  baseline: 0.7,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('y', {
  char: 'y',
  strokes: [
    s(p(0.15, 0.25), p(0.45, 0.65)),
    s(p(0.75, 0.25), p(0.2, 1.1))
  ],
  baseline: 0.7,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('n', {
  char: 'n',
  strokes: [
    s(p(0.2, 0.25), p(0.2, 0.85)),
    s(
      p(0.2, 0.35), p(0.3, 0.25), p(0.5, 0.22),
      p(0.7, 0.3), p(0.75, 0.45)
    ),
    s(p(0.75, 0.45), p(0.75, 0.85))
  ],
  baseline: 0.7,
  aspectRatio: 0.75,
  advance: 0.8
});

// Greek letters (common in math)
glyphDatabase.set('α', {
  char: 'α',
  strokes: [
    s(
      p(0.7, 0.3), p(0.5, 0.2), p(0.3, 0.3),
      p(0.25, 0.5), p(0.35, 0.7), p(0.55, 0.75),
      p(0.7, 0.65)
    ),
    s(p(0.7, 0.3), p(0.7, 0.85), p(0.75, 0.95))
  ],
  baseline: 0.7,
  aspectRatio: 0.75,
  advance: 0.8
});

glyphDatabase.set('β', {
  char: 'β',
  strokes: [
    s(
      p(0.3, 1.0), p(0.25, 0.3), p(0.3, 0.1),
      p(0.45, 0.05), p(0.65, 0.1), p(0.75, 0.25),
      p(0.7, 0.4), p(0.5, 0.5)
    ),
    s(
      p(0.5, 0.5), p(0.7, 0.6), p(0.8, 0.75),
      p(0.75, 0.9), p(0.55, 0.98), p(0.35, 0.95),
      p(0.25, 0.85)
    )
  ],
  baseline: 0.7,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('θ', {
  char: 'θ',
  strokes: [
    s(
      p(0.7, 0.2), p(0.5, 0.05), p(0.3, 0.2),
      p(0.2, 0.4), p(0.2, 0.65), p(0.3, 0.85),
      p(0.5, 1.0), p(0.7, 0.85), p(0.8, 0.65),
      p(0.8, 0.4), p(0.7, 0.2)
    ),
    s(p(0.15, 0.5), p(0.85, 0.5))
  ],
  baseline: 0.85,
  aspectRatio: 0.7,
  advance: 0.75
});

glyphDatabase.set('π', {
  char: 'π',
  strokes: [
    s(p(0.1, 0.25), p(0.9, 0.25)),
    s(p(0.3, 0.25), p(0.3, 0.85)),
    s(p(0.7, 0.25), p(0.7, 0.85))
  ],
  baseline: 0.7,
  aspectRatio: 0.9,
  advance: 0.95
});

// Operators
glyphDatabase.set('+', {
  char: '+',
  strokes: [
    s(p(0.5, 0.15), p(0.5, 0.85)),
    s(p(0.15, 0.5), p(0.85, 0.5))
  ],
  baseline: 0.5,
  aspectRatio: 1.0,
  advance: 1.05
});

glyphDatabase.set('−', {
  char: '−',
  strokes: [
    s(p(0.15, 0.5), p(0.85, 0.5))
  ],
  baseline: 0.5,
  aspectRatio: 1.0,
  advance: 1.05
});

// Regular hyphen-minus (used in some contexts)
glyphDatabase.set('-', {
  char: '-',
  strokes: [
    s(p(0.15, 0.5), p(0.85, 0.5))
  ],
  baseline: 0.5,
  aspectRatio: 1.0,
  advance: 1.05
});

glyphDatabase.set('=', {
  char: '=',
  strokes: [
    s(p(0.15, 0.38), p(0.85, 0.38)),
    s(p(0.15, 0.62), p(0.85, 0.62))
  ],
  baseline: 0.5,
  aspectRatio: 1.0,
  advance: 1.05
});

glyphDatabase.set('×', {
  char: '×',
  strokes: [
    s(p(0.2, 0.2), p(0.8, 0.8)),
    s(p(0.8, 0.2), p(0.2, 0.8))
  ],
  baseline: 0.5,
  aspectRatio: 1.0,
  advance: 1.05
});

glyphDatabase.set('÷', {
  char: '÷',
  strokes: [
    s(p(0.5, 0.15), p(0.5, 0.25)),
    s(p(0.15, 0.5), p(0.85, 0.5)),
    s(p(0.5, 0.75), p(0.5, 0.85))
  ],
  baseline: 0.5,
  aspectRatio: 1.0,
  advance: 1.05
});

glyphDatabase.set('(', {
  char: '(',
  strokes: [
    s(
      p(0.7, 0.05), p(0.4, 0.2), p(0.25, 0.5),
      p(0.4, 0.8), p(0.7, 0.95)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.4,
  advance: 0.45
});

glyphDatabase.set(')', {
  char: ')',
  strokes: [
    s(
      p(0.3, 0.05), p(0.6, 0.2), p(0.75, 0.5),
      p(0.6, 0.8), p(0.3, 0.95)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.4,
  advance: 0.45
});

glyphDatabase.set('[', {
  char: '[',
  strokes: [
    s(
      p(0.7, 0.05), p(0.3, 0.05), p(0.3, 0.95),
      p(0.7, 0.95)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.4,
  advance: 0.45
});

glyphDatabase.set(']', {
  char: ']',
  strokes: [
    s(
      p(0.3, 0.05), p(0.7, 0.05), p(0.7, 0.95),
      p(0.3, 0.95)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.4,
  advance: 0.45
});

// Special symbols
glyphDatabase.set('∫', {
  char: '∫',
  strokes: [
    s(
      p(0.7, 0.0), p(0.6, 0.05), p(0.5, 0.15),
      p(0.45, 0.35), p(0.45, 0.65), p(0.5, 0.85),
      p(0.6, 0.95), p(0.7, 1.0)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.5,
  advance: 0.6
});

glyphDatabase.set('∑', {
  char: '∑',
  strokes: [
    s(
      p(0.85, 0.05), p(0.25, 0.05), p(0.6, 0.5),
      p(0.25, 0.95), p(0.85, 0.95)
    )
  ],
  baseline: 0.85,
  aspectRatio: 0.8,
  advance: 0.9
});

glyphDatabase.set('√', {
  char: '√',
  strokes: [
    s(
      p(0.1, 0.5), p(0.25, 0.65), p(0.35, 0.95),
      p(0.45, 0.15), p(0.95, 0.15)
    )
  ],
  baseline: 0.85,
  aspectRatio: 1.0,
  advance: 1.0
});

/**
 * Get a glyph from the database
 * Returns a default placeholder if glyph not found
 */
export function getGlyph(char: string): Glyph {
  const glyph = glyphDatabase.get(char);
  if (glyph) {
    return glyph;
  }
  
  // Return a placeholder box for unknown characters
  console.warn(`Glyph not found for character: "${char}"`);
  return {
    char,
    strokes: [
      s(
        p(0.1, 0.1), p(0.9, 0.1), p(0.9, 0.9),
        p(0.1, 0.9), p(0.1, 0.1)
      ),
      s(p(0.1, 0.1), p(0.9, 0.9)),
      s(p(0.9, 0.1), p(0.1, 0.9))
    ],
    baseline: 0.85,
    aspectRatio: 0.7,
    advance: 0.75
  };
}

/**
 * Check if a glyph exists in the database
 */
export function hasGlyph(char: string): boolean {
  return glyphDatabase.has(char);
}

