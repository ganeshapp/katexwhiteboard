/**
 * Core type definitions for the KaTeX Handwriter library
 */

/** A 2D point in the coordinate system */
export interface Point {
  x: number;
  y: number;
}

/** Represents a single continuous stroke (pen down -> draw -> pen up) */
export interface Stroke {
  points: Point[];
  /** Optional delay before this stroke starts (in ms) */
  delay?: number;
}

/** A glyph is a collection of strokes that form a character or symbol */
export interface Glyph {
  /** The character or symbol this glyph represents */
  char: string;
  /** The strokes that make up this glyph, in normalized coordinates (0-1) */
  strokes: Stroke[];
  /** Baseline offset (normalized, where 0 is top, 1 is bottom of glyph box) */
  baseline: number;
  /** Aspect ratio (width/height) of the glyph */
  aspectRatio: number;
  /** Advance width ratio (how much to advance after this glyph) */
  advance: number;
}

/** Positioned glyph with actual coordinates and size */
export interface PositionedGlyph {
  glyph: Glyph;
  /** Position of the top-left corner */
  position: Point;
  /** Height of the glyph in absolute units */
  height: number;
  /** Computed width based on height and aspect ratio */
  width: number;
  /** Rotation angle in radians (for symbols that need rotation) */
  rotation?: number;
}

/** Layout box for positioning elements */
export interface LayoutBox {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Baseline position relative to y */
  baseline: number;
}

/** Node types in the KaTeX expression tree */
export type NodeType =
  | 'text'
  | 'symbol'
  | 'operator'
  | 'fraction'
  | 'superscript'
  | 'subscript'
  | 'sqrt'
  | 'integral'
  | 'sum'
  | 'product'
  | 'limit'
  | 'matrix'
  | 'parenthesis'
  | 'bracket'
  | 'brace'
  | 'accent'
  | 'group';

/** Abstract node in the expression tree */
export interface ExpressionNode {
  type: NodeType;
  children?: ExpressionNode[];
}

/** Text/symbol node */
export interface TextNode extends ExpressionNode {
  type: 'text' | 'symbol' | 'operator';
  value: string;
  /** Font style (e.g., 'normal', 'italic', 'bold') */
  style?: string;
}

/** Fraction node */
export interface FractionNode extends ExpressionNode {
  type: 'fraction';
  numerator: ExpressionNode;
  denominator: ExpressionNode;
}

/** Superscript/Subscript node */
export interface ScriptNode extends ExpressionNode {
  type: 'superscript' | 'subscript';
  base: ExpressionNode;
  script: ExpressionNode;
}

/** Square root node */
export interface SqrtNode extends ExpressionNode {
  type: 'sqrt';
  content: ExpressionNode;
  /** Optional index for nth roots */
  index?: ExpressionNode;
}

/** Large operator node (integral, sum, product, etc.) */
export interface OperatorNode extends ExpressionNode {
  type: 'integral' | 'sum' | 'product';
  /** Optional lower limit */
  lower?: ExpressionNode;
  /** Optional upper limit */
  upper?: ExpressionNode;
}

/** Parenthesis, bracket, or brace */
export interface DelimiterNode extends ExpressionNode {
  type: 'parenthesis' | 'bracket' | 'brace';
  content: ExpressionNode;
  /** Left delimiter character */
  left: string;
  /** Right delimiter character */
  right: string;
  /** Whether delimiters should stretch to content height */
  stretchy: boolean;
}

/** Matrix node */
export interface MatrixNode extends ExpressionNode {
  type: 'matrix';
  rows: ExpressionNode[][];
}

/** Group node (generic container) */
export interface GroupNode extends ExpressionNode {
  type: 'group';
  children: ExpressionNode[];
}

/** Accent node (hat, bar, etc.) */
export interface AccentNode extends ExpressionNode {
  type: 'accent';
  base: ExpressionNode;
  accent: string;
}

/** Configuration for the handwriting engine */
export interface HandwriterConfig {
  /** Base font size in pixels */
  fontSize: number;
  /** Speed of writing (pixels per second) */
  speed: number;
  /** Starting position on the canvas */
  position: Point;
  /** Spacing between elements as a factor of font size */
  spacing: number;
  /** Handwriting style variation (0 = perfect, 1 = very shaky) */
  variation: number;
}

/** Drawing instruction for Excalidraw or other canvas */
export interface DrawingInstruction {
  /** Type of instruction */
  type: 'stroke' | 'pause';
  /** For stroke: the points to draw */
  points?: Point[];
  /** For pause: duration in ms */
  duration?: number;
  /** Timestamp when this instruction should start (relative to animation start) */
  startTime: number;
  /** Duration of this instruction in ms */
  endTime: number;
}

/** Complete drawing plan for an equation */
export interface DrawingPlan {
  instructions: DrawingInstruction[];
  /** Total duration of the animation in ms */
  totalDuration: number;
  /** Bounding box of the entire equation */
  bounds: LayoutBox;
}

