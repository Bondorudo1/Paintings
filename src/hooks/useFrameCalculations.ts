import { useMemo } from 'react';

/**
 * Ensures numeric precision to avoid floating point issues
 */
const precise = (value: number): number => {
  return parseFloat(value.toFixed(6));
};

/**
 * Calculates the side length from a hypotenuse value
 */
const calculateSide = (hypotenuse: number): number => {
  return Math.abs(hypotenuse / Math.sqrt(2));
};

interface FrameCalculationParams {
  boxWidth: number;
  boxHeight: number;
  frameWidth?: number;
  frameRabbet?: number;
}

interface FrameCalculationResult {
  positions: Record<string, [number, number, number]>;
  rotations: Record<string, [number, number, number]>;
  planeYPositions: {
    frame1: [number, number];
    frame2: [number, number];
  };
}

/**
 * Hook that calculates frame positions, rotations, and clipping planes
 * based on the given dimensions.
 * 
 * @param params - Object containing box dimensions and frame properties
 * @returns Object with calculated positions, rotations, and plane positions
 */
export function useFrameCalculations({
  boxWidth,
  boxHeight,
  frameWidth = 77,
  frameRabbet = 2.255
}: FrameCalculationParams): FrameCalculationResult {
  
  // Calculate all frame layout values in one memoized operation
  return useMemo(() => {
    // Determine which dimension is larger
    let boxBigger = 0;
    let boxSmaller = 0;
    let frameShiftBigger = 0;
    let frameShiftSmaller = 0;
    
    if (boxWidth <= boxHeight) {
      boxBigger = boxHeight;
      boxSmaller = boxWidth;
    } else {
      boxBigger = boxWidth;
      boxSmaller = boxHeight;
    }
  
    // Calculate triangle dimensions
    const triangleBiggestSide = (boxBigger / 2) - (boxSmaller / 2);
    let side = calculateSide(triangleBiggestSide);
  
    // Calculate frame shifts
    const frameShift1 = Math.abs((frameWidth - boxBigger) / 2 - frameRabbet);
    const frameShift2 = Math.abs((frameWidth - boxSmaller) / 2 - frameRabbet);
  
    // Apply orientation-specific adjustments
    if (boxWidth <= boxHeight) {
      side = -side;
      frameShiftBigger = frameShift1;
      frameShiftSmaller = frameShift2;
    } else {
      frameShiftBigger = frameShift2;
      frameShiftSmaller = frameShift1;
    }
    
    // Calculate plane Y positions for clipping
    const planeYPositions = {
      frame1: [0, -side] as [number, number],
      frame2: [0, side] as [number, number],
    };
    
    // Calculate frame positions
    const positions: Record<string, [number, number, number]> = {
      left: [-1, frameShiftBigger, precise(-boxWidth / 2) - 0.85],
      bottom: [-1, precise(-boxHeight / 2) - 0.85, frameShiftSmaller],
      top: [-1, precise(boxHeight / 2) + 0.85, -frameShiftSmaller],
      right: [-1, -frameShiftBigger, precise(boxWidth / 2) + 0.85],
    };
    
    // Define rotations (these don't change with dimensions)
    const rotations: Record<string, [number, number, number]> = {
      bottom: [Math.PI, 0, Math.PI / 2],
      left: [-Math.PI / 2, 0, Math.PI / 2],
      top: [0, 0, Math.PI / 2],
      right: [Math.PI / 2, 0, Math.PI / 2],
    };
  
    return {
      positions,
      rotations,
      planeYPositions
    };
  }, [boxWidth, boxHeight, frameWidth, frameRabbet]);
}