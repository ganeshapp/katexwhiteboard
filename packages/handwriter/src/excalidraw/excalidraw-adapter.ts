/**
 * Excalidraw Adapter - Converts our drawing instructions to Excalidraw elements
 */

import { Point, DrawingPlan, DrawingInstruction } from '../types.js';

/**
 * Excalidraw element (simplified type definition)
 */
export interface ExcalidrawElement {
  type: string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: string;
  strokeWidth: number;
  strokeStyle: string;
  roughness: number;
  opacity: number;
  points?: [number, number][];
  isDeleted?: boolean;
}

/**
 * Configuration for Excalidraw rendering
 */
export interface ExcalidrawConfig {
  strokeColor?: string;
  strokeWidth?: number;
  roughness?: number;
  opacity?: number;
}

/**
 * Convert drawing plan to Excalidraw elements
 */
export function convertToExcalidrawElements(
  plan: DrawingPlan,
  config: ExcalidrawConfig = {}
): ExcalidrawElement[] {
  const elements: ExcalidrawElement[] = [];
  
  const {
    strokeColor = '#000000',
    strokeWidth = 2,
    roughness = 0,
    opacity = 100
  } = config;
  
  let elementIndex = 0;
  
  for (const instruction of plan.instructions) {
    if (instruction.type === 'stroke' && instruction.points && instruction.points.length > 1) {
      const points = instruction.points;
      
      // Calculate bounding box
      const xs = points.map(p => p.x);
      const ys = points.map(p => p.y);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      
      // Convert points to relative coordinates
      const relativePoints: [number, number][] = points.map(p => [
        p.x - minX,
        p.y - minY
      ]);
      
      elements.push({
        type: 'freedraw',
        id: `katex-handwrite-${Date.now()}-${elementIndex++}`,
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        strokeColor,
        backgroundColor: 'transparent',
        fillStyle: 'solid',
        strokeWidth,
        strokeStyle: 'solid',
        roughness,
        opacity,
        points: relativePoints
      });
    }
  }
  
  return elements;
}

/**
 * Animate drawing on Excalidraw
 * This function works with the Excalidraw API to progressively add elements
 */
export async function animateOnExcalidraw(
  excalidrawAPI: any,
  plan: DrawingPlan,
  config: ExcalidrawConfig = {}
): Promise<void> {
  const {
    strokeColor = '#000000',
    strokeWidth = 2,
    roughness = 0,
    opacity = 100
  } = config;
  
  return new Promise((resolve) => {
    let currentInstructionIndex = 0;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      
      const elapsed = timestamp - startTime;
      
      // Find current instruction
      while (
        currentInstructionIndex < plan.instructions.length &&
        plan.instructions[currentInstructionIndex].endTime <= elapsed
      ) {
        const instruction = plan.instructions[currentInstructionIndex];
        
        if (instruction.type === 'stroke' && instruction.points && instruction.points.length > 1) {
          addStrokeToExcalidraw(excalidrawAPI, instruction.points, {
            strokeColor,
            strokeWidth,
            roughness,
            opacity
          });
        }
        
        currentInstructionIndex++;
      }
      
      // Check if we have a current in-progress stroke
      if (currentInstructionIndex < plan.instructions.length) {
        const instruction = plan.instructions[currentInstructionIndex];
        
        if (
          instruction.type === 'stroke' &&
          instruction.points &&
          elapsed >= instruction.startTime &&
          elapsed < instruction.endTime
        ) {
          // Draw partial stroke
          const progress = (elapsed - instruction.startTime) / 
                          (instruction.endTime - instruction.startTime);
          const partialPoints = interpolatePoints(instruction.points, progress);
          
          if (partialPoints.length > 1) {
            // Remove previous partial stroke if it exists
            const elements = excalidrawAPI.getSceneElements();
            const partialElements = elements.filter((el: any) => 
              el.id.startsWith('katex-partial-')
            );
            if (partialElements.length > 0) {
              excalidrawAPI.updateScene({
                elements: elements.filter((el: any) => 
                  !el.id.startsWith('katex-partial-')
                )
              });
            }
            
            addStrokeToExcalidraw(excalidrawAPI, partialPoints, {
              strokeColor,
              strokeWidth,
              roughness,
              opacity
            }, 'katex-partial-current');
          }
        }
        
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        // Remove any partial strokes
        const elements = excalidrawAPI.getSceneElements();
        excalidrawAPI.updateScene({
          elements: elements.filter((el: any) => 
            !el.id.startsWith('katex-partial-')
          )
        });
        resolve();
      }
    };
    
    requestAnimationFrame(animate);
  });
}

/**
 * Add a single stroke to Excalidraw
 */
function addStrokeToExcalidraw(
  excalidrawAPI: any,
  points: Point[],
  config: ExcalidrawConfig,
  idPrefix: string = 'katex-handwrite'
): void {
  if (!excalidrawAPI || points.length < 2) {
    console.warn('Cannot add stroke: invalid API or points');
    return;
  }
  
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  
  const relativePoints: [number, number][] = points.map(p => [
    p.x - minX,
    p.y - minY
  ]);
  
  const newElement: any = {
    type: 'freedraw',
    id: `${idPrefix}-${Date.now()}-${Math.random()}`,
    x: minX,
    y: minY,
    width: Math.max(maxX - minX, 1),
    height: Math.max(maxY - minY, 1),
    angle: 0,
    strokeColor: config.strokeColor || '#000000',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: config.strokeWidth || 2,
    strokeStyle: 'solid',
    roughness: config.roughness || 0,
    opacity: config.opacity || 100,
    points: relativePoints,
    pressures: [],
    simulatePressure: false, // Changed to false for cleaner lines
    locked: false,
    isDeleted: false,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 100000),
    updated: Date.now(),
    link: null,
    boundElements: null
  };
  
  try {
    const currentElements = excalidrawAPI.getSceneElements();
    const newElements = [...currentElements, newElement];
    
    excalidrawAPI.updateScene({
      elements: newElements,
      appState: {
        ...excalidrawAPI.getAppState(),
      }
    });
  } catch (error) {
    console.error('Error adding stroke to Excalidraw:', error);
  }
}

/**
 * Interpolate points for partial stroke rendering
 */
function interpolatePoints(points: Point[], progress: number): Point[] {
  if (progress <= 0) {
    return [];
  }
  if (progress >= 1) {
    return points;
  }
  
  let totalLength = 0;
  const segmentLengths: number[] = [];
  
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    segmentLengths.push(length);
    totalLength += length;
  }
  
  const targetLength = totalLength * progress;
  let accumulatedLength = 0;
  
  for (let i = 0; i < segmentLengths.length; i++) {
    if (accumulatedLength + segmentLengths[i] >= targetLength) {
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

