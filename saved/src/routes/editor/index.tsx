// import { OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva, useControls } from "leva";
// import { Suspense, useState, useEffect } from 'react';
// import { Perf } from 'r3f-perf';
// import Lights from "../../components/editor/Additions/Lights";
// import Frames from "../../components/editor/Frames/Frames";
// import Underframe from "../../components/editor/Underframe/Underframe";
// import { useThrottledCallback } from "../../hooks/useThrottleCallback";

// export default function EditorPage() {
//   // State for throttled values
//   const [throttledWidth, setThrottledWidth] = useState(50);
//   const [throttledHeight, setThrottledHeight] = useState(60);
  
//   // Get raw values from Leva
//   const {
//     boxWidth,
//     boxHeight,
//     showHelpers,
//     showPerf
//   } = useControls('Painting Controls', {
//     boxWidth: {
//       value: 29,
//       min: 10,
//       max: 80,
//       step: 0.5,
//       label: 'Painting Width'
//     },
//     boxHeight: {
//       value: 40,
//       min: 10, 
//       max: 100,
//       step: 0.5,
//       label: 'Painting Height'
//     },
//     showHelpers: {
//       value: false,
//       label: 'Show Clip Planes'
//     },
//     showPerf: {
//       value: true,
//       label: 'Show Performance Monitor'
//     }
//   });

//   // Create throttled handlers for updating dimensions
//   const throttledWidthChange = useThrottledCallback(
//     (value) => setThrottledWidth(value),
//     10 // Throttle to 10ms
//   );

//   const throttledHeightChange = useThrottledCallback(
//     (value) => setThrottledHeight(value),
//     10 // Throttle to 10ms
//   );
  
//   // Update throttled values when controls change
//   useEffect(() => {
//     throttledWidthChange(boxWidth);
//   }, [boxWidth, throttledWidthChange]);
  
//   useEffect(() => {
//     throttledHeightChange(boxHeight);
//   }, [boxHeight, throttledHeightChange]);

//   // Performance monitoring options
//   const perfOptions = useControls('Performance Options', {
//     matrixUpdate: { value: true, label: 'Matrix Updates' },
//     fps: { value: true, label: 'FPS' },
//     gl: { value: true, label: 'GL Call' },
//     memory: { value: true, label: 'Memory' },
//     rendererOverview: { value: false, label: 'Renderer Overview' }
//   });

//   return (
//     <>
//       <Leva collapsed={false} />
      
//       <Canvas
//         onCreated={(state) => (state.gl.localClippingEnabled = true)}
//         gl={{ 
//           antialias: true,
//           // powerPreference: "high-performance",
//         }}
//         dpr={[1, 2]}
//         shadows
//         style={{ background: "black" }}
//       >
//         <Suspense fallback={null}>
//           {showPerf && (
//             <Perf 
//               position="top-left"
//               matrixUpdate={perfOptions.matrixUpdate}
//               fps={perfOptions.fps}
//               gl={perfOptions.gl}
//               memory={perfOptions.memory}
//               rendererOverview={perfOptions.rendererOverview}
//             />
//           )}
          
//           <OrbitControls minDistance={0.1} maxDistance={500} />
//           <Lights />
//           <Underframe boxHeight={boxHeight} boxWidth={boxWidth}/>
//           <Frames
//             boxWidth={throttledWidth}
//             boxHeight={throttledHeight}
//             positionY={0}
//             showHelpers={showHelpers}
//           />
//         </Suspense>
//       </Canvas>
//     </>
//   );
// }



import { Leva } from "leva";
import { Suspense, useState } from 'react';
import EditorCanvas from "../../components/editor1/EditorCanvas";
import ControlPanel from "../../components/editor1/ui/ControlPanel";

export default function EditorPage() {
  // State for dimension values
  const [boxWidth, setBoxWidth] = useState(29);
  const [boxHeight, setBoxHeight] = useState(40);
  const [showHelpers, setShowHelpers] = useState(false);
  const [showPerf, setShowPerf] = useState(true);
  const [perfOptions, setPerfOptions] = useState<PerfOptions>({
    matrixUpdate: true,
    fps: true,
    gl: true,
    memory: true,
    rendererOverview: false
  });

  return (
    <>
      {/* Leva controls panel */}
      <Leva collapsed={false} />
      
      {/* Control panel to manage state */}
      <ControlPanel
        onWidthChange={setBoxWidth}
        onHeightChange={setBoxHeight}
        onHelpersChange={setShowHelpers}
        onPerfChange={setShowPerf}
        onPerfOptionsChange={setPerfOptions}
      />
      
      {/* 3D Canvas with scene */}
      <Suspense fallback={<div>Loading 3D scene...</div>}>
        <EditorCanvas
          boxWidth={boxWidth}
          boxHeight={boxHeight}
          showHelpers={showHelpers}
          showPerf={showPerf}
          perfOptions={perfOptions}
          backgroundColor="#0A0A0A"
        />
      </Suspense>
    </>
  );
}