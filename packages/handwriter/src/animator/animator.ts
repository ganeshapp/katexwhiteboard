/**
 * Animator - Creates drawing instructions with timing information
 */

import { Stroke, DrawingInstruction, DrawingPlan, Point, LayoutBox } from '../types.js';
import { calculateStrokeLength } from '../strokes/stroke-generator.js';

export interface AnimationConfig {
  /** Speed of drawing in pixels per second */
  speed: number;
  /** Pause between strokes in milliseconds */
  pauseBetweenStrokes?: number;
  /** Pause between characters in milliseconds */
  pauseBetweenChars?: number;
}

/**
 * Create a drawing plan with timing information
 */
export function createDrawingPlan(
  strokes: Stroke[],
  bounds: LayoutBox,
  config: AnimationConfig
): DrawingPlan {
  const instructions: DrawingInstruction[] = [];
  let currentTime = 0;
  
  const pauseBetweenStrokes = config.pauseBetweenStrokes ?? 50;
  
  for (const stroke of strokes) {
    // Calculate duration based on stroke length and speed
    const strokeLength = calculateStrokeLength(stroke);
    const duration = (strokeLength / config.speed) * 1000; // Convert to ms
    
    // Add delay if specified
    if (stroke.delay) {
      instructions.push({
        type: 'pause',
        duration: stroke.delay,
        startTime: currentTime,
        endTime: currentTime + stroke.delay
      });
      currentTime += stroke.delay;
    }
    
    // Add stroke instruction
    instructions.push({
      type: 'stroke',
      points: stroke.points,
      startTime: currentTime,
      endTime: currentTime + duration
    });
    
    currentTime += duration;
    
    // Add pause between strokes
    if (pauseBetweenStrokes > 0) {
      instructions.push({
        type: 'pause',
        duration: pauseBetweenStrokes,
        startTime: currentTime,
        endTime: currentTime + pauseBetweenStrokes
      });
      currentTime += pauseBetweenStrokes;
    }
  }
  
  return {
    instructions,
    totalDuration: currentTime,
    bounds
  };
}

/**
 * Interpolate between points along a stroke at a given time
 */
export function interpolateStroke(
  points: Point[],
  progress: number
): Point[] {
  if (progress <= 0) {
    return [];
  }
  if (progress >= 1) {
    return points;
  }
  
  // Calculate total length
  let totalLength = 0;
  const segmentLengths: number[] = [];
  
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    segmentLengths.push(length);
    totalLength += length;
  }
  
  // Find the target length based on progress
  const targetLength = totalLength * progress;
  let accumulatedLength = 0;
  
  // Find which segment we're in
  for (let i = 0; i < segmentLengths.length; i++) {
    if (accumulatedLength + segmentLengths[i] >= targetLength) {
      // Interpolate within this segment
      const segmentProgress = (targetLength - accumulatedLength) / segmentLengths[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      
      const interpolatedPoint = {
        x: p1.x + (p2.x - p1.x) * segmentProgress,
        y: p1.y + (p2.y - p1.y) * segmentProgress
      };
      
      return [...points.slice(0, i + 1), interpolatedPoint];
    }
    accumulatedLength += segmentLengths[i];
  }
  
  return points;
}

/**
 * Get the current drawing state at a specific time
 */
export function getDrawingStateAtTime(
  plan: DrawingPlan,
  time: number
): Point[][] {
  const completedStrokes: Point[][] = [];
  
  for (const instruction of plan.instructions) {
    if (instruction.type === 'stroke' && instruction.points) {
      if (time >= instruction.endTime) {
        // Stroke is complete
        completedStrokes.push(instruction.points);
      } else if (time >= instruction.startTime) {
        // Stroke is in progress
        const progress = (time - instruction.startTime) / (instruction.endTime - instruction.startTime);
        const partialStroke = interpolateStroke(instruction.points, progress);
        if (partialStroke.length > 0) {
          completedStrokes.push(partialStroke);
        }
      }
    }
  }
  
  return completedStrokes;
}

/**
 * Create an animation frame generator
 */
export function* createAnimationFrames(
  plan: DrawingPlan,
  fps: number = 60
): Generator<Point[][], void, unknown> {
  const frameDuration = 1000 / fps;
  let currentTime = 0;
  
  while (currentTime <= plan.totalDuration) {
    yield getDrawingStateAtTime(plan, currentTime);
    currentTime += frameDuration;
  }
  
  // Final frame with complete drawing
  yield getDrawingStateAtTime(plan, plan.totalDuration);
}

