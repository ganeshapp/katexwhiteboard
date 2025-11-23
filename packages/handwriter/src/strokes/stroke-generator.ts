/**
 * Stroke Generator - Converts positioned glyphs into actual drawing strokes
 */

import { PositionedGlyph, Point, Stroke } from '../types.js';

/**
 * Generate drawing strokes from positioned glyphs
 */
export function generateStrokes(
  glyphs: PositionedGlyph[],
  additionalStrokes: Array<{ points: Point[] }>,
  variation: number = 0
): Stroke[] {
  const allStrokes: Stroke[] = [];
  
  // Process each glyph
  for (const posGlyph of glyphs) {
    const glyphStrokes = transformGlyphStrokes(posGlyph, variation);
    allStrokes.push(...glyphStrokes);
  }
  
  // Add additional strokes (fraction lines, root symbols, etc.)
  for (const additionalStroke of additionalStrokes) {
    allStrokes.push({
      points: additionalStroke.points.map(p => addVariation(p, variation))
    });
  }
  
  return allStrokes;
}

/**
 * Transform glyph strokes from normalized coordinates to absolute coordinates
 */
function transformGlyphStrokes(
  posGlyph: PositionedGlyph,
  variation: number
): Stroke[] {
  const { glyph, position, width, height, rotation } = posGlyph;
  
  return glyph.strokes.map(stroke => {
    const transformedPoints = stroke.points.map(point => {
      // Scale from normalized (0-1) to actual size
      let x = position.x + point.x * width;
      let y = position.y + point.y * height;
      
      // Apply rotation if needed
      if (rotation) {
        const centerX = position.x + width / 2;
        const centerY = position.y + height / 2;
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const dx = x - centerX;
        const dy = y - centerY;
        x = centerX + dx * cos - dy * sin;
        y = centerY + dx * sin + dy * cos;
      }
      
      // Add handwriting variation
      return addVariation({ x, y }, variation);
    });
    
    return {
      points: transformedPoints,
      delay: stroke.delay
    };
  });
}

/**
 * Add natural handwriting variation to a point
 */
function addVariation(point: Point, variation: number): Point {
  if (variation === 0) {
    return point;
  }
  
  // Use Perlin-like noise for natural variation
  const amplitude = variation * 2; // Max variation in pixels
  const dx = (Math.random() - 0.5) * amplitude;
  const dy = (Math.random() - 0.5) * amplitude;
  
  return {
    x: point.x + dx,
    y: point.y + dy
  };
}

/**
 * Smooth a stroke using Catmull-Rom spline interpolation
 */
export function smoothStroke(stroke: Stroke, smoothness: number = 0.5): Stroke {
  if (stroke.points.length < 3) {
    return stroke;
  }
  
  const smoothedPoints: Point[] = [];
  const points = stroke.points;
  
  // Add first point
  smoothedPoints.push(points[0]);
  
  // Interpolate between points
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    
    // Number of interpolation steps based on distance
    const distance = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    const steps = Math.max(2, Math.floor(distance / 5));
    
    for (let t = 0; t <= 1; t += 1 / steps) {
      if (i === points.length - 2 && t === 1) continue; // Skip last point (added separately)
      
      const point = catmullRomInterpolate(p0, p1, p2, p3, t, smoothness);
      smoothedPoints.push(point);
    }
  }
  
  // Add last point
  smoothedPoints.push(points[points.length - 1]);
  
  return {
    points: smoothedPoints,
    delay: stroke.delay
  };
}

/**
 * Catmull-Rom spline interpolation
 */
function catmullRomInterpolate(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number,
  tension: number = 0.5
): Point {
  const t2 = t * t;
  const t3 = t2 * t;
  
  const v0x = (p2.x - p0.x) * tension;
  const v0y = (p2.y - p0.y) * tension;
  const v1x = (p3.x - p1.x) * tension;
  const v1y = (p3.y - p1.y) * tension;
  
  const x = (2 * p1.x - 2 * p2.x + v0x + v1x) * t3 +
            (-3 * p1.x + 3 * p2.x - 2 * v0x - v1x) * t2 +
            v0x * t +
            p1.x;
  
  const y = (2 * p1.y - 2 * p2.y + v0y + v1y) * t3 +
            (-3 * p1.y + 3 * p2.y - 2 * v0y - v1y) * t2 +
            v0y * t +
            p1.y;
  
  return { x, y };
}

/**
 * Calculate the total length of a stroke
 */
export function calculateStrokeLength(stroke: Stroke): number {
  let length = 0;
  for (let i = 1; i < stroke.points.length; i++) {
    const p1 = stroke.points[i - 1];
    const p2 = stroke.points[i];
    length += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  return length;
}

/**
 * Resample a stroke to have evenly spaced points
 */
export function resampleStroke(stroke: Stroke, spacing: number = 2): Stroke {
  if (stroke.points.length < 2) {
    return stroke;
  }
  
  const resampledPoints: Point[] = [stroke.points[0]];
  let accumulatedDistance = 0;
  
  for (let i = 1; i < stroke.points.length; i++) {
    const p1 = stroke.points[i - 1];
    const p2 = stroke.points[i];
    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    
    accumulatedDistance += distance;
    
    while (accumulatedDistance >= spacing) {
      // Calculate the interpolation factor
      const t = (accumulatedDistance - spacing) / distance;
      const x = p2.x - (p2.x - p1.x) * t;
      const y = p2.y - (p2.y - p1.y) * t;
      
      resampledPoints.push({ x, y });
      accumulatedDistance -= spacing;
    }
  }
  
  // Always include the last point
  resampledPoints.push(stroke.points[stroke.points.length - 1]);
  
  return {
    points: resampledPoints,
    delay: stroke.delay
  };
}

