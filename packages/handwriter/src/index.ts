/**
 * KaTeX Handwriter - Main Library Entry Point
 * 
 * A comprehensive library for converting KaTeX mathematical expressions
 * into handwritten-style drawings on Excalidraw or other canvas systems.
 */

// Initialize glyph database (must be before any parsing)
import './glyphs/additional-glyphs.js';

import { parseKaTeX } from './parser/katex-parser.js';
import { layoutExpression, LayoutContext } from './layout/layout-engine.js';
import { generateStrokes, smoothStroke, resampleStroke } from './strokes/stroke-generator.js';
import { createDrawingPlan, AnimationConfig } from './animator/animator.js';
import {
  convertToExcalidrawElements,
  animateOnExcalidraw,
  ExcalidrawConfig
} from './excalidraw/excalidraw-adapter.js';
import {
  HandwriterConfig,
  DrawingPlan,
  Point,
  ExpressionNode,
  LayoutBox,
  Stroke
} from './types.js';

export * from './types.js';
export { ExcalidrawConfig } from './excalidraw/excalidraw-adapter.js';

/**
 * Main class for converting KaTeX to handwritten drawings
 */
export class KaTeXHandwriter {
  private config: Required<HandwriterConfig>;
  
  constructor(config: Partial<HandwriterConfig> = {}) {
    this.config = {
      fontSize: config.fontSize ?? 40,
      speed: config.speed ?? 300,
      position: config.position ?? { x: 100, y: 100 },
      spacing: config.spacing ?? 0.1,
      variation: config.variation ?? 0.3
    };
  }
  
  /**
   * Parse a KaTeX expression and create a drawing plan
   */
  public createDrawingPlan(latex: string): DrawingPlan {
    // Parse KaTeX
    const expressionTree = parseKaTeX(latex);
    
    // Layout the expression
    const layoutContext: LayoutContext = {
      fontSize: this.config.fontSize,
      spacing: this.config.spacing,
      currentX: this.config.position.x,
      currentY: this.config.position.y,
      baselineY: this.config.position.y + this.config.fontSize * 0.7
    };
    
    const layoutResult = layoutExpression(expressionTree, layoutContext);
    
    // Generate strokes
    let strokes = generateStrokes(
      layoutResult.glyphs,
      layoutResult.additionalStrokes,
      this.config.variation
    );
    
    // Smooth and resample strokes for natural appearance
    // Use larger spacing to prevent filled appearance in Excalidraw
    strokes = strokes.map(stroke => {
      const smoothed = smoothStroke(stroke, 0.5);
      return resampleStroke(smoothed, 5); // Increased from 2 to 5 for better spacing
    });
    
    // Create animation plan
    const animationConfig: AnimationConfig = {
      speed: this.config.speed,
      pauseBetweenStrokes: 30
    };
    
    const plan = createDrawingPlan(strokes, layoutResult.box, animationConfig);
    
    return plan;
  }
  
  /**
   * Convert a KaTeX expression to Excalidraw elements
   */
  public toExcalidrawElements(
    latex: string,
    excalidrawConfig?: ExcalidrawConfig
  ) {
    const plan = this.createDrawingPlan(latex);
    return convertToExcalidrawElements(plan, excalidrawConfig);
  }
  
  /**
   * Animate a KaTeX expression on Excalidraw
   */
  public async animateOnExcalidraw(
    excalidrawAPI: any,
    latex: string,
    excalidrawConfig?: ExcalidrawConfig
  ): Promise<void> {
    const plan = this.createDrawingPlan(latex);
    return animateOnExcalidraw(excalidrawAPI, plan, excalidrawConfig);
  }
  
  /**
   * Update configuration
   */
  public updateConfig(config: Partial<HandwriterConfig>): void {
    this.config = {
      ...this.config,
      ...config
    };
  }
  
  /**
   * Get current configuration
   */
  public getConfig(): Required<HandwriterConfig> {
    return { ...this.config };
  }
}

/**
 * Convenience function to create a drawing plan
 */
export function createHandwrittenEquation(
  latex: string,
  config?: Partial<HandwriterConfig>
): DrawingPlan {
  const handwriter = new KaTeXHandwriter(config);
  return handwriter.createDrawingPlan(latex);
}

/**
 * Convenience function to convert to Excalidraw elements
 */
export function katexToExcalidraw(
  latex: string,
  config?: Partial<HandwriterConfig>,
  excalidrawConfig?: ExcalidrawConfig
) {
  const handwriter = new KaTeXHandwriter(config);
  return handwriter.toExcalidrawElements(latex, excalidrawConfig);
}

/**
 * Export core functions for advanced usage
 */
export {
  parseKaTeX,
  layoutExpression,
  generateStrokes,
  smoothStroke,
  resampleStroke,
  createDrawingPlan,
  convertToExcalidrawElements,
  animateOnExcalidraw
};

