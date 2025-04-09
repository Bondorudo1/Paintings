import { useControls, folder } from 'leva';
import { useEffect } from 'react';
import { useThrottledCallback } from '../../hooks/useThrottledCallback';

interface ControlPanelProps {
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onHelpersChange: (show: boolean) => void;
  onPerfChange: (show: boolean) => void;
  onPerfOptionsChange: (options: PerfOptions) => void;
  initialWidth?: number;
  initialHeight?: number;
  initialShowHelpers?: boolean;
  initialShowPerf?: boolean;
}

export interface PerfOptions {
  matrixUpdate: boolean;
  fps: boolean;
  gl: boolean;
  memory: boolean;
  rendererOverview: boolean;
}

export default function ControlPanel({
  onWidthChange,
  onHeightChange,
  onHelpersChange,
  onPerfChange,
  onPerfOptionsChange,
  initialWidth = 29,
  initialHeight = 40,
  initialShowHelpers = false,
  initialShowPerf = true,
}: ControlPanelProps) {
  // Create throttled handlers for dimension changes
  const throttledWidthChange = useThrottledCallback(onWidthChange, 10);
  const throttledHeightChange = useThrottledCallback(onHeightChange, 10);

  // Main painting controls
  const paintingControls = useControls('Painting', {
    Dimensions: folder({
      boxWidth: {
        value: initialWidth,
        min: 10,
        max: 80,
        step: 0.5,
        label: 'Width'
      },
      boxHeight: {
        value: initialHeight,
        min: 10, 
        max: 100,
        step: 0.5,
        label: 'Height'
      }
    }),
    Debug: folder({
      showHelpers: {
        value: initialShowHelpers,
        label: 'Show Clip Planes'
      },
      showPerf: {
        value: initialShowPerf,
        label: 'Show Performance Monitor'
      }
    })
  });

  // Performance monitoring controls
  const perfOptions = useControls('Performance', {
    Options: folder({
      matrixUpdate: { value: true, label: 'Matrix Updates' },
      fps: { value: true, label: 'FPS' },
      gl: { value: true, label: 'GL Call' },
      memory: { value: true, label: 'Memory' },
      rendererOverview: { value: false, label: 'Renderer Overview' }
    })
  }, { collapsed: true });

  // Apply changes when controls are adjusted
  useEffect(() => {
    throttledWidthChange(paintingControls.boxWidth);
  }, [paintingControls.boxWidth, throttledWidthChange]);
  
  useEffect(() => {
    throttledHeightChange(paintingControls.boxHeight);
  }, [paintingControls.boxHeight, throttledHeightChange]);
  
  useEffect(() => {
    onHelpersChange(paintingControls.showHelpers);
  }, [paintingControls.showHelpers, onHelpersChange]);
  
  useEffect(() => {
    onPerfChange(paintingControls.showPerf);
  }, [paintingControls.showPerf, onPerfChange]);
  
  useEffect(() => {
    onPerfOptionsChange({
      matrixUpdate: perfOptions.matrixUpdate,
      fps: perfOptions.fps,
      gl: perfOptions.gl,
      memory: perfOptions.memory,
      rendererOverview: perfOptions.rendererOverview
    });
  }, [
    perfOptions.matrixUpdate,
    perfOptions.fps,
    perfOptions.gl,
    perfOptions.memory,
    perfOptions.rendererOverview,
    onPerfOptionsChange
  ]);

  return null; // This component doesn't render anything, it just manages controls
}