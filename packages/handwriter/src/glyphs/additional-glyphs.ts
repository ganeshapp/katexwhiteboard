/**
 * Additional handwritten glyphs - Extended character set
 */

import { Glyph, Stroke, Point } from '../types.js';
import { glyphDatabase } from './index.js';

const p = (x: number, y: number): Point => ({ x, y });
const s = (...points: Point[]): Stroke => ({ points });

// More lowercase letters
const additionalLowercase: Record<string, Glyph> = {
  'e': {
    char: 'e',
    strokes: [
      s(
        p(0.75, 0.5), p(0.5, 0.2), p(0.25, 0.35),
        p(0.2, 0.55), p(0.3, 0.75), p(0.5, 0.85),
        p(0.7, 0.8), p(0.8, 0.6)
      ),
      s(p(0.2, 0.5), p(0.7, 0.5))
    ],
    baseline: 0.7,
    aspectRatio: 0.7,
    advance: 0.75
  },
  
  'f': {
    char: 'f',
    strokes: [
      s(
        p(0.7, 0.1), p(0.55, 0.05), p(0.45, 0.15),
        p(0.45, 0.95)
      ),
      s(p(0.2, 0.35), p(0.7, 0.35))
    ],
    baseline: 0.85,
    aspectRatio: 0.6,
    advance: 0.65
  },
  
  'g': {
    char: 'g',
    strokes: [
      s(
        p(0.8, 0.35), p(0.6, 0.25), p(0.4, 0.25),
        p(0.2, 0.35), p(0.15, 0.55), p(0.2, 0.75),
        p(0.4, 0.85), p(0.6, 0.85), p(0.8, 0.75)
      ),
      s(
        p(0.8, 0.35), p(0.8, 0.95), p(0.7, 1.05),
        p(0.5, 1.1), p(0.3, 1.05)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'h': {
    char: 'h',
    strokes: [
      s(p(0.2, 0.05), p(0.2, 0.95)),
      s(
        p(0.2, 0.35), p(0.3, 0.25), p(0.5, 0.22),
        p(0.7, 0.3), p(0.75, 0.45)
      ),
      s(p(0.75, 0.45), p(0.75, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'i': {
    char: 'i',
    strokes: [
      s(p(0.4, 0.05), p(0.4, 0.15)),
      s(p(0.4, 0.3), p(0.4, 0.85))
    ],
    baseline: 0.7,
    aspectRatio: 0.4,
    advance: 0.45
  },
  
  'j': {
    char: 'j',
    strokes: [
      s(p(0.5, 0.05), p(0.5, 0.15)),
      s(
        p(0.5, 0.3), p(0.5, 0.95), p(0.4, 1.05),
        p(0.25, 1.05), p(0.15, 0.95)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.5,
    advance: 0.55
  },
  
  'k': {
    char: 'k',
    strokes: [
      s(p(0.2, 0.05), p(0.2, 0.95)),
      s(p(0.75, 0.25), p(0.2, 0.55)),
      s(p(0.35, 0.45), p(0.75, 0.85))
    ],
    baseline: 0.85,
    aspectRatio: 0.7,
    advance: 0.75
  },
  
  'l': {
    char: 'l',
    strokes: [
      s(p(0.4, 0.05), p(0.4, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.4,
    advance: 0.45
  },
  
  'm': {
    char: 'm',
    strokes: [
      s(p(0.15, 0.25), p(0.15, 0.85)),
      s(
        p(0.15, 0.35), p(0.25, 0.25), p(0.35, 0.22),
        p(0.45, 0.3), p(0.48, 0.4)
      ),
      s(p(0.48, 0.4), p(0.48, 0.85)),
      s(
        p(0.48, 0.35), p(0.58, 0.25), p(0.68, 0.22),
        p(0.78, 0.3), p(0.82, 0.4)
      ),
      s(p(0.82, 0.4), p(0.82, 0.85))
    ],
    baseline: 0.7,
    aspectRatio: 1.1,
    advance: 1.15
  },
  
  'o': {
    char: 'o',
    strokes: [
      s(
        p(0.7, 0.3), p(0.5, 0.2), p(0.3, 0.3),
        p(0.2, 0.5), p(0.3, 0.7), p(0.5, 0.8),
        p(0.7, 0.7), p(0.8, 0.5), p(0.7, 0.3)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'p': {
    char: 'p',
    strokes: [
      s(p(0.2, 0.25), p(0.2, 1.1)),
      s(
        p(0.2, 0.35), p(0.4, 0.25), p(0.6, 0.25),
        p(0.8, 0.35), p(0.85, 0.55), p(0.8, 0.75),
        p(0.6, 0.85), p(0.4, 0.85), p(0.2, 0.75)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'q': {
    char: 'q',
    strokes: [
      s(
        p(0.8, 0.75), p(0.6, 0.85), p(0.4, 0.85),
        p(0.2, 0.75), p(0.15, 0.55), p(0.2, 0.35),
        p(0.4, 0.25), p(0.6, 0.25), p(0.8, 0.35)
      ),
      s(p(0.8, 0.35), p(0.8, 1.1))
    ],
    baseline: 0.7,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'r': {
    char: 'r',
    strokes: [
      s(p(0.2, 0.25), p(0.2, 0.85)),
      s(p(0.2, 0.35), p(0.35, 0.25), p(0.55, 0.22), p(0.7, 0.3))
    ],
    baseline: 0.7,
    aspectRatio: 0.6,
    advance: 0.65
  },
  
  's': {
    char: 's',
    strokes: [
      s(
        p(0.75, 0.3), p(0.55, 0.2), p(0.35, 0.25),
        p(0.25, 0.35), p(0.35, 0.48), p(0.55, 0.52),
        p(0.7, 0.58), p(0.75, 0.68), p(0.65, 0.8),
        p(0.45, 0.85), p(0.25, 0.75)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.65,
    advance: 0.7
  },
  
  't': {
    char: 't',
    strokes: [
      s(p(0.4, 0.1), p(0.4, 0.85), p(0.5, 0.95), p(0.65, 0.95)),
      s(p(0.2, 0.3), p(0.65, 0.3))
    ],
    baseline: 0.85,
    aspectRatio: 0.6,
    advance: 0.65
  },
  
  'u': {
    char: 'u',
    strokes: [
      s(p(0.2, 0.25), p(0.2, 0.65), p(0.25, 0.78), p(0.4, 0.85)),
      s(
        p(0.4, 0.85), p(0.6, 0.8), p(0.75, 0.65),
        p(0.75, 0.25)
      ),
      s(p(0.75, 0.55), p(0.75, 0.95))
    ],
    baseline: 0.7,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'v': {
    char: 'v',
    strokes: [
      s(p(0.15, 0.25), p(0.45, 0.85)),
      s(p(0.85, 0.25), p(0.45, 0.85))
    ],
    baseline: 0.7,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'w': {
    char: 'w',
    strokes: [
      s(p(0.1, 0.25), p(0.25, 0.85)),
      s(p(0.5, 0.25), p(0.25, 0.85)),
      s(p(0.5, 0.25), p(0.75, 0.85)),
      s(p(0.9, 0.25), p(0.75, 0.85))
    ],
    baseline: 0.7,
    aspectRatio: 1.1,
    advance: 1.15
  },
  
  'z': {
    char: 'z',
    strokes: [
      s(
        p(0.2, 0.25), p(0.75, 0.25), p(0.2, 0.85),
        p(0.75, 0.85)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.7,
    advance: 0.75
  }
};

// Uppercase letters
const uppercaseLetters: Record<string, Glyph> = {
  'A': {
    char: 'A',
    strokes: [
      s(p(0.15, 0.95), p(0.5, 0.05)),
      s(p(0.5, 0.05), p(0.85, 0.95)),
      s(p(0.3, 0.6), p(0.7, 0.6))
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'X': {
    char: 'X',
    strokes: [
      s(p(0.15, 0.05), p(0.85, 0.95)),
      s(p(0.85, 0.05), p(0.15, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'Y': {
    char: 'Y',
    strokes: [
      s(p(0.15, 0.05), p(0.5, 0.45)),
      s(p(0.85, 0.05), p(0.5, 0.45)),
      s(p(0.5, 0.45), p(0.5, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  // More uppercase needed for common usage
  'B': {
    char: 'B',
    strokes: [
      s(p(0.2, 0.05), p(0.2, 0.95)),
      s(
        p(0.2, 0.05), p(0.6, 0.05), p(0.75, 0.15),
        p(0.75, 0.35), p(0.6, 0.48), p(0.3, 0.5)
      ),
      s(
        p(0.3, 0.5), p(0.65, 0.52), p(0.8, 0.65),
        p(0.8, 0.85), p(0.65, 0.95), p(0.2, 0.95)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'C': {
    char: 'C',
    strokes: [
      s(
        p(0.85, 0.2), p(0.65, 0.05), p(0.4, 0.05),
        p(0.2, 0.2), p(0.15, 0.5), p(0.2, 0.8),
        p(0.4, 0.95), p(0.65, 0.95), p(0.85, 0.8)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'D': {
    char: 'D',
    strokes: [
      s(p(0.2, 0.05), p(0.2, 0.95)),
      s(
        p(0.2, 0.05), p(0.5, 0.05), p(0.7, 0.15),
        p(0.8, 0.35), p(0.8, 0.65), p(0.7, 0.85),
        p(0.5, 0.95), p(0.2, 0.95)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'E': {
    char: 'E',
    strokes: [
      s(p(0.2, 0.05), p(0.2, 0.95)),
      s(p(0.2, 0.05), p(0.75, 0.05)),
      s(p(0.2, 0.5), p(0.65, 0.5)),
      s(p(0.2, 0.95), p(0.75, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.75,
    advance: 0.8
  }
};

// More Greek letters
const greekLetters: Record<string, Glyph> = {
  'γ': {
    char: 'γ',
    strokes: [
      s(
        p(0.2, 0.25), p(0.4, 0.45), p(0.5, 0.7),
        p(0.4, 0.95), p(0.3, 1.05)
      ),
      s(p(0.8, 0.25), p(0.4, 0.45))
    ],
    baseline: 0.7,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'δ': {
    char: 'δ',
    strokes: [
      s(
        p(0.25, 0.15), p(0.6, 0.05), p(0.75, 0.15),
        p(0.7, 0.3), p(0.5, 0.25), p(0.3, 0.35),
        p(0.2, 0.55), p(0.25, 0.75), p(0.45, 0.88),
        p(0.65, 0.85), p(0.8, 0.65), p(0.75, 0.4),
        p(0.6, 0.25)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.75,
    advance: 0.8
  },
  
  'λ': {
    char: 'λ',
    strokes: [
      s(p(0.3, 0.05), p(0.5, 0.95)),
      s(p(0.8, 0.05), p(0.15, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'μ': {
    char: 'μ',
    strokes: [
      s(p(0.2, 0.25), p(0.2, 1.0)),
      s(
        p(0.2, 0.65), p(0.25, 0.78), p(0.4, 0.85),
        p(0.6, 0.8), p(0.75, 0.65), p(0.75, 0.25)
      ),
      s(p(0.75, 0.55), p(0.75, 0.95))
    ],
    baseline: 0.7,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'σ': {
    char: 'σ',
    strokes: [
      s(
        p(0.15, 0.25), p(0.5, 0.2), p(0.75, 0.25)
      ),
      s(
        p(0.75, 0.25), p(0.85, 0.35), p(0.85, 0.55),
        p(0.75, 0.75), p(0.5, 0.85), p(0.3, 0.8),
        p(0.2, 0.6)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.85,
    advance: 0.9
  },
  
  'ω': {
    char: 'ω',
    strokes: [
      s(
        p(0.15, 0.3), p(0.2, 0.55), p(0.3, 0.75),
        p(0.4, 0.8), p(0.5, 0.7), p(0.6, 0.8),
        p(0.7, 0.75), p(0.8, 0.55), p(0.85, 0.3)
      )
    ],
    baseline: 0.7,
    aspectRatio: 0.95,
    advance: 1.0
  },
  
  'Δ': {
    char: 'Δ',
    strokes: [
      s(p(0.15, 0.95), p(0.5, 0.05)),
      s(p(0.5, 0.05), p(0.85, 0.95)),
      s(p(0.85, 0.95), p(0.15, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  },
  
  'Σ': {
    char: 'Σ',
    strokes: [
      s(
        p(0.85, 0.05), p(0.25, 0.05), p(0.6, 0.5),
        p(0.25, 0.95), p(0.85, 0.95)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.9
  },
  
  'Π': {
    char: 'Π',
    strokes: [
      s(p(0.2, 0.05), p(0.8, 0.05)),
      s(p(0.2, 0.05), p(0.2, 0.95)),
      s(p(0.8, 0.05), p(0.8, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.8,
    advance: 0.85
  }
};

// More operators and symbols
const additionalSymbols: Record<string, Glyph> = {
  '<': {
    char: '<',
    strokes: [
      s(p(0.75, 0.2), p(0.25, 0.5), p(0.75, 0.8))
    ],
    baseline: 0.5,
    aspectRatio: 0.7,
    advance: 0.75
  },
  
  '>': {
    char: '>',
    strokes: [
      s(p(0.25, 0.2), p(0.75, 0.5), p(0.25, 0.8))
    ],
    baseline: 0.5,
    aspectRatio: 0.7,
    advance: 0.75
  },
  
  '≤': {
    char: '≤',
    strokes: [
      s(p(0.75, 0.15), p(0.25, 0.45), p(0.75, 0.7)),
      s(p(0.25, 0.9), p(0.75, 0.9))
    ],
    baseline: 0.5,
    aspectRatio: 0.7,
    advance: 0.75
  },
  
  '≥': {
    char: '≥',
    strokes: [
      s(p(0.25, 0.15), p(0.75, 0.45), p(0.25, 0.7)),
      s(p(0.25, 0.9), p(0.75, 0.9))
    ],
    baseline: 0.5,
    aspectRatio: 0.7,
    advance: 0.75
  },
  
  '±': {
    char: '±',
    strokes: [
      s(p(0.5, 0.15), p(0.5, 0.55)),
      s(p(0.15, 0.35), p(0.85, 0.35)),
      s(p(0.15, 0.75), p(0.85, 0.75))
    ],
    baseline: 0.5,
    aspectRatio: 1.0,
    advance: 1.05
  },
  
  '·': {
    char: '·',
    strokes: [
      s(p(0.45, 0.45), p(0.55, 0.45), p(0.55, 0.55), p(0.45, 0.55), p(0.45, 0.45))
    ],
    baseline: 0.5,
    aspectRatio: 0.5,
    advance: 0.55
  },
  
  '/': {
    char: '/',
    strokes: [
      s(p(0.2, 0.95), p(0.8, 0.05))
    ],
    baseline: 0.85,
    aspectRatio: 0.5,
    advance: 0.55
  },
  
  '\\': {
    char: '\\',
    strokes: [
      s(p(0.2, 0.05), p(0.8, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.5,
    advance: 0.55
  },
  
  '!': {
    char: '!',
    strokes: [
      s(p(0.5, 0.05), p(0.5, 0.6)),
      s(p(0.5, 0.75), p(0.5, 0.85))
    ],
    baseline: 0.85,
    aspectRatio: 0.4,
    advance: 0.45
  },
  
  '?': {
    char: '?',
    strokes: [
      s(
        p(0.25, 0.2), p(0.4, 0.08), p(0.6, 0.08),
        p(0.75, 0.2), p(0.75, 0.35), p(0.6, 0.5),
        p(0.5, 0.6)
      ),
      s(p(0.5, 0.75), p(0.5, 0.85))
    ],
    baseline: 0.85,
    aspectRatio: 0.7,
    advance: 0.75
  },
  
  '.': {
    char: '.',
    strokes: [
      s(p(0.45, 0.8), p(0.55, 0.8), p(0.55, 0.9), p(0.45, 0.9), p(0.45, 0.8))
    ],
    baseline: 0.85,
    aspectRatio: 0.4,
    advance: 0.45
  },
  
  ',': {
    char: ',',
    strokes: [
      s(p(0.5, 0.8), p(0.45, 0.9), p(0.35, 0.95))
    ],
    baseline: 0.85,
    aspectRatio: 0.4,
    advance: 0.45
  },
  
  '{': {
    char: '{',
    strokes: [
      s(
        p(0.8, 0.05), p(0.5, 0.1), p(0.4, 0.2),
        p(0.4, 0.4), p(0.3, 0.5), p(0.4, 0.6),
        p(0.4, 0.8), p(0.5, 0.9), p(0.8, 0.95)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.5,
    advance: 0.55
  },
  
  '}': {
    char: '}',
    strokes: [
      s(
        p(0.2, 0.05), p(0.5, 0.1), p(0.6, 0.2),
        p(0.6, 0.4), p(0.7, 0.5), p(0.6, 0.6),
        p(0.6, 0.8), p(0.5, 0.9), p(0.2, 0.95)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.5,
    advance: 0.55
  },
  
  '∞': {
    char: '∞',
    strokes: [
      s(
        p(0.3, 0.5), p(0.15, 0.35), p(0.15, 0.65),
        p(0.3, 0.5), p(0.5, 0.3), p(0.7, 0.5),
        p(0.85, 0.35), p(0.85, 0.65), p(0.7, 0.5),
        p(0.5, 0.7), p(0.3, 0.5)
      )
    ],
    baseline: 0.5,
    aspectRatio: 1.4,
    advance: 1.45
  },
  
  '∂': {
    char: '∂',
    strokes: [
      s(
        p(0.25, 0.15), p(0.6, 0.05), p(0.75, 0.2),
        p(0.75, 0.35), p(0.6, 0.25), p(0.3, 0.35),
        p(0.2, 0.55), p(0.25, 0.75), p(0.45, 0.88),
        p(0.65, 0.85), p(0.8, 0.65), p(0.75, 0.4)
      )
    ],
    baseline: 0.85,
    aspectRatio: 0.75,
    advance: 0.8
  }
};

// Register all additional glyphs
Object.entries(additionalLowercase).forEach(([char, glyph]) => {
  glyphDatabase.set(char, glyph);
});

Object.entries(uppercaseLetters).forEach(([char, glyph]) => {
  glyphDatabase.set(char, glyph);
});

Object.entries(greekLetters).forEach(([char, glyph]) => {
  glyphDatabase.set(char, glyph);
});

Object.entries(additionalSymbols).forEach(([char, glyph]) => {
  glyphDatabase.set(char, glyph);
});

export { additionalLowercase, uppercaseLetters, greekLetters, additionalSymbols };

