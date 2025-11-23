/**
 * Layout Engine - Positions glyphs and creates layout boxes for expression nodes
 */

import {
  ExpressionNode,
  TextNode,
  FractionNode,
  ScriptNode,
  SqrtNode,
  OperatorNode,
  DelimiterNode,
  GroupNode,
  AccentNode,
  LayoutBox,
  PositionedGlyph,
  Point
} from '../types.js';
import { getGlyph } from '../glyphs/index.js';

export interface LayoutContext {
  fontSize: number;
  spacing: number;
  currentX: number;
  currentY: number;
  /** Current baseline Y position */
  baselineY: number;
}

export interface LayoutResult {
  /** All positioned glyphs */
  glyphs: PositionedGlyph[];
  /** Bounding box of the layout */
  box: LayoutBox;
  /** Additional strokes for things like fraction lines, root symbols */
  additionalStrokes: Array<{ points: Point[] }>;
}

/**
 * Layout an expression tree into positioned glyphs
 */
export function layoutExpression(
  node: ExpressionNode,
  context: LayoutContext
): LayoutResult {
  switch (node.type) {
    case 'text':
    case 'symbol':
    case 'operator':
      return layoutText(node as TextNode, context);
    
    case 'fraction':
      return layoutFraction(node as FractionNode, context);
    
    case 'superscript':
    case 'subscript':
      return layoutScript(node as ScriptNode, context);
    
    case 'sqrt':
      return layoutSqrt(node as SqrtNode, context);
    
    case 'integral':
    case 'sum':
    case 'product':
      return layoutOperator(node as OperatorNode, context);
    
    case 'parenthesis':
    case 'bracket':
    case 'brace':
      return layoutDelimiter(node as DelimiterNode, context);
    
    case 'group':
      return layoutGroup(node as GroupNode, context);
    
    case 'accent':
      return layoutAccent(node as AccentNode, context);
    
    default:
      console.warn(`Unknown node type for layout: ${node.type}`);
      return {
        glyphs: [],
        box: { x: context.currentX, y: context.currentY, width: 0, height: 0, baseline: 0 },
        additionalStrokes: []
      };
  }
}

/**
 * Layout a text/symbol node
 */
function layoutText(node: TextNode, context: LayoutContext): LayoutResult {
  const glyphs: PositionedGlyph[] = [];
  let x = context.currentX;
  const fontSize = context.fontSize;
  
  // Handle multi-character text
  const chars = node.value.split('');
  
  for (const char of chars) {
    if (char === ' ') {
      x += fontSize * 0.3;
      continue;
    }
    
    const glyph = getGlyph(char);
    const height = fontSize;
    const width = height * glyph.aspectRatio;
    
    // Position based on baseline
    const y = context.baselineY - (height * glyph.baseline);
    
    glyphs.push({
      glyph,
      position: { x, y },
      height,
      width
    });
    
    x += width * glyph.advance + fontSize * context.spacing;
  }
  
  const totalWidth = x - context.currentX;
  
  return {
    glyphs,
    box: {
      x: context.currentX,
      y: context.baselineY - fontSize,
      width: totalWidth,
      height: fontSize,
      baseline: fontSize * 0.85
    },
    additionalStrokes: []
  };
}

/**
 * Layout a fraction node
 */
function layoutFraction(node: FractionNode, context: LayoutContext): LayoutResult {
  const fontSize = context.fontSize;
  const smallerFontSize = fontSize * 0.65; // Slightly smaller for better spacing
  
  // Layout numerator (centered above fraction line with more space)
  const numeratorContext: LayoutContext = {
    ...context,
    fontSize: smallerFontSize,
    currentX: context.currentX,
    baselineY: context.baselineY - fontSize * 0.7 // More space above line
  };
  const numeratorResult = layoutExpression(node.numerator, numeratorContext);
  
  // Layout denominator (centered below fraction line with more space)
  const denominatorContext: LayoutContext = {
    ...context,
    fontSize: smallerFontSize,
    currentX: context.currentX,
    baselineY: context.baselineY + fontSize * 0.5 // More space below line
  };
  const denominatorResult = layoutExpression(node.denominator, denominatorContext);
  
  // Calculate total width (max of numerator and denominator)
  const maxWidth = Math.max(numeratorResult.box.width, denominatorResult.box.width);
  
  // Center numerator and denominator
  const numeratorOffset = (maxWidth - numeratorResult.box.width) / 2;
  const denominatorOffset = (maxWidth - denominatorResult.box.width) / 2;
  
  const glyphs: PositionedGlyph[] = [
    ...numeratorResult.glyphs.map(g => ({
      ...g,
      position: { x: g.position.x + numeratorOffset, y: g.position.y }
    })),
    ...denominatorResult.glyphs.map(g => ({
      ...g,
      position: { x: g.position.x + denominatorOffset, y: g.position.y }
    }))
  ];
  
  // Add fraction line with proper padding
  const lineY = context.baselineY - fontSize * 0.05;
  const padding = fontSize * 0.15; // Increased padding
  const additionalStrokes = [
    ...numeratorResult.additionalStrokes,
    ...denominatorResult.additionalStrokes,
    {
      points: [
        { x: context.currentX - padding, y: lineY },
        { x: context.currentX + maxWidth + padding, y: lineY }
      ]
    }
  ];
  
  const totalHeight = fontSize * 1.4; // Taller to accommodate spacing
  
  return {
    glyphs,
    box: {
      x: context.currentX,
      y: context.baselineY - fontSize * 0.8,
      width: maxWidth + padding * 2,
      height: totalHeight,
      baseline: totalHeight * 0.55
    },
    additionalStrokes
  };
}

/**
 * Layout superscript or subscript
 */
function layoutScript(node: ScriptNode, context: LayoutContext): LayoutResult {
  const fontSize = context.fontSize;
  
  // Layout base
  const baseResult = layoutExpression(node.base, context);
  
  // Layout script (smaller size)
  const scriptFontSize = fontSize * 0.6;
  const scriptX = context.currentX + baseResult.box.width;
  const scriptY = node.type === 'superscript'
    ? context.baselineY - fontSize * 0.6
    : context.baselineY + fontSize * 0.2;
  
  const scriptContext: LayoutContext = {
    ...context,
    fontSize: scriptFontSize,
    currentX: scriptX,
    baselineY: scriptY
  };
  const scriptResult = layoutExpression(node.script, scriptContext);
  
  const glyphs = [...baseResult.glyphs, ...scriptResult.glyphs];
  
  const totalWidth = scriptX + scriptResult.box.width - context.currentX;
  const minY = Math.min(baseResult.box.y, scriptResult.box.y);
  const maxY = Math.max(
    baseResult.box.y + baseResult.box.height,
    scriptResult.box.y + scriptResult.box.height
  );
  
  return {
    glyphs,
    box: {
      x: context.currentX,
      y: minY,
      width: totalWidth,
      height: maxY - minY,
      baseline: context.baselineY - minY
    },
    additionalStrokes: [...baseResult.additionalStrokes, ...scriptResult.additionalStrokes]
  };
}

/**
 * Layout square root
 */
function layoutSqrt(node: SqrtNode, context: LayoutContext): LayoutResult {
  const fontSize = context.fontSize;
  
  // Leave space for the radical symbol
  const radicalWidth = fontSize * 0.5;
  
  // Layout content
  const contentContext: LayoutContext = {
    ...context,
    currentX: context.currentX + radicalWidth,
    fontSize: fontSize * 0.9
  };
  const contentResult = layoutExpression(node.content, contentContext);
  
  // Draw radical symbol
  const padding = fontSize * 0.15;
  const contentHeight = contentResult.box.height + padding * 2;
  const y1 = context.baselineY - fontSize * 0.85;
  const y2 = y1 + contentHeight;
  
  const radicalStrokes = [
    {
      points: [
        { x: context.currentX, y: y1 + contentHeight * 0.5 },
        { x: context.currentX + radicalWidth * 0.3, y: y1 + contentHeight * 0.7 },
        { x: context.currentX + radicalWidth * 0.5, y: y2 },
        { x: context.currentX + radicalWidth * 0.7, y: y1 },
        { x: context.currentX + radicalWidth + contentResult.box.width + padding, y: y1 }
      ]
    }
  ];
  
  return {
    glyphs: contentResult.glyphs,
    box: {
      x: context.currentX,
      y: y1,
      width: radicalWidth + contentResult.box.width + padding,
      height: contentHeight,
      baseline: context.baselineY - y1
    },
    additionalStrokes: [...contentResult.additionalStrokes, ...radicalStrokes]
  };
}

/**
 * Layout large operator (integral, sum, product)
 */
function layoutOperator(node: OperatorNode, context: LayoutContext): LayoutResult {
  const fontSize = context.fontSize;
  // Make integral larger than sum/product for better visibility
  const operatorSize = node.type === 'integral' ? fontSize * 2.8 : fontSize * 2.0;
  
  // Get operator glyph
  const opChar = node.type === 'integral' ? '∫' : node.type === 'sum' ? '∑' : '∏';
  console.log(`Layout operator: type="${node.type}", symbol="${opChar}"`);
  const glyph = getGlyph(opChar);
  
  const height = operatorSize;
  const width = height * glyph.aspectRatio;
  const y = context.baselineY - height * 0.6;
  
  const glyphs: PositionedGlyph[] = [{
    glyph,
    position: { x: context.currentX, y },
    height,
    width
  }];
  
  const additionalStrokes: Array<{ points: Point[] }> = [];
  
  let totalWidth = width * glyph.advance;
  let minY = y;
  let maxY = y + height;
  
  // Handle limits (subscript = lower, superscript = upper)
  if (node.lower || node.upper) {
    const limitFontSize = fontSize * 0.45;
    // Position limits closer to the integral, at the bottom-left for lower and top-right for upper
    
    if (node.lower) {
      // Lower limit (subscript) - position at bottom-left of integral
      const lowerContext: LayoutContext = {
        ...context,
        fontSize: limitFontSize,
        currentX: context.currentX - fontSize * 0.1, // Slightly to the left
        baselineY: context.baselineY + fontSize * 1.1 // Lower position
      };
      const lowerResult = layoutExpression(node.lower, lowerContext);
      glyphs.push(...lowerResult.glyphs);
      additionalStrokes.push(...lowerResult.additionalStrokes);
      maxY = Math.max(maxY, lowerResult.box.y + lowerResult.box.height);
      totalWidth = Math.max(totalWidth, lowerResult.box.x + lowerResult.box.width - context.currentX);
    }
    
    if (node.upper) {
      // Upper limit (superscript) - position at top-right of integral
      const upperContext: LayoutContext = {
        ...context,
        fontSize: limitFontSize,
        currentX: context.currentX + width * 0.6, // To the right
        baselineY: context.baselineY - fontSize * 1.8 // Higher position
      };
      const upperResult = layoutExpression(node.upper, upperContext);
      glyphs.push(...upperResult.glyphs);
      additionalStrokes.push(...upperResult.additionalStrokes);
      minY = Math.min(minY, upperResult.box.y);
      totalWidth = Math.max(totalWidth, upperResult.box.x + upperResult.box.width - context.currentX);
    }
  }
  
  return {
    glyphs,
    box: {
      x: context.currentX,
      y: minY,
      width: totalWidth,
      height: maxY - minY,
      baseline: context.baselineY - minY
    },
    additionalStrokes
  };
}

/**
 * Layout delimiter (parenthesis, bracket, brace)
 */
function layoutDelimiter(node: DelimiterNode, context: LayoutContext): LayoutResult {
  const fontSize = context.fontSize;
  
  // Layout content first to know the height
  const contentContext: LayoutContext = {
    ...context,
    currentX: context.currentX + fontSize * 0.3
  };
  const contentResult = layoutExpression(node.content, contentContext);
  
  // Get delimiter glyphs
  const leftGlyph = getGlyph(node.left === '\\{' || node.left === '\\}' ? '{' : node.left);
  const rightGlyph = getGlyph(node.right === '\\{' || node.right === '\\}' ? '}' : node.right);
  
  // Scale delimiters to content height if stretchy
  const delimHeight = node.stretchy
    ? Math.max(contentResult.box.height, fontSize)
    : fontSize;
  
  const leftWidth = delimHeight * leftGlyph.aspectRatio;
  const rightWidth = delimHeight * rightGlyph.aspectRatio;
  
  const leftY = contentResult.box.y;
  const rightX = context.currentX + fontSize * 0.3 + contentResult.box.width;
  
  const glyphs: PositionedGlyph[] = [
    {
      glyph: leftGlyph,
      position: { x: context.currentX, y: leftY },
      height: delimHeight,
      width: leftWidth
    },
    ...contentResult.glyphs,
    {
      glyph: rightGlyph,
      position: { x: rightX, y: leftY },
      height: delimHeight,
      width: rightWidth
    }
  ];
  
  const totalWidth = rightX + rightWidth - context.currentX;
  
  return {
    glyphs,
    box: {
      x: context.currentX,
      y: contentResult.box.y,
      width: totalWidth,
      height: contentResult.box.height,
      baseline: contentResult.box.baseline
    },
    additionalStrokes: contentResult.additionalStrokes
  };
}

/**
 * Layout a group of nodes sequentially
 */
function layoutGroup(node: GroupNode, context: LayoutContext): LayoutResult {
  const glyphs: PositionedGlyph[] = [];
  const additionalStrokes: Array<{ points: Point[] }> = [];
  
  let currentX = context.currentX;
  let minY = context.baselineY;
  let maxY = context.baselineY;
  
  for (const child of node.children || []) {
    const childContext: LayoutContext = {
      ...context,
      currentX
    };
    const childResult = layoutExpression(child, childContext);
    
    glyphs.push(...childResult.glyphs);
    additionalStrokes.push(...childResult.additionalStrokes);
    
    currentX += childResult.box.width;
    minY = Math.min(minY, childResult.box.y);
    maxY = Math.max(maxY, childResult.box.y + childResult.box.height);
  }
  
  return {
    glyphs,
    box: {
      x: context.currentX,
      y: minY,
      width: currentX - context.currentX,
      height: maxY - minY,
      baseline: context.baselineY - minY
    },
    additionalStrokes
  };
}

/**
 * Layout accent (hat, bar, etc.)
 */
function layoutAccent(node: AccentNode, context: LayoutContext): LayoutResult {
  const fontSize = context.fontSize;
  
  // Layout base
  const baseResult = layoutExpression(node.base, context);
  
  // Draw accent above
  const accentY = baseResult.box.y - fontSize * 0.2;
  const accentCenterX = context.currentX + baseResult.box.width / 2;
  
  const accentStrokes: Array<{ points: Point[] }> = [];
  
  // Simple accent rendering
  if (node.accent === '\\hat' || node.accent === 'ˆ') {
    accentStrokes.push({
      points: [
        { x: accentCenterX - fontSize * 0.15, y: accentY + fontSize * 0.1 },
        { x: accentCenterX, y: accentY },
        { x: accentCenterX + fontSize * 0.15, y: accentY + fontSize * 0.1 }
      ]
    });
  } else if (node.accent === '\\bar' || node.accent === '¯') {
    accentStrokes.push({
      points: [
        { x: accentCenterX - fontSize * 0.2, y: accentY },
        { x: accentCenterX + fontSize * 0.2, y: accentY }
      ]
    });
  }
  
  return {
    glyphs: baseResult.glyphs,
    box: {
      x: baseResult.box.x,
      y: accentY,
      width: baseResult.box.width,
      height: baseResult.box.y + baseResult.box.height - accentY,
      baseline: baseResult.box.baseline + (baseResult.box.y - accentY)
    },
    additionalStrokes: [...baseResult.additionalStrokes, ...accentStrokes]
  };
}

