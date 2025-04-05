
// // // import Underframe from "@/components/Underframe/Underframe";

// // import { OrbitControls} from "@react-three/drei";
// // import { Leva } from "leva";
// // import Lights from "../../components/editor/Additions/Lights";
// // import Frames from "../../components/editor/Frames/Frames";
// // import { Canvas } from "@react-three/fiber";

// // export default function EditorPage() {
// //   return (
// //     <>
// //       <Leva collapsed />

// //       <Canvas
// //         gl={{ localClippingEnabled: true }}
// //         dpr={[1, 2]}
// //         shadows
// //         style={{ background: "black" }}
// //       >
// //        <OrbitControls minDistance={0.1} maxDistance={500} />

// //         <Lights />
// //         {/* <Underframe /> */}
// //         <Frames boxWidth={29} boxHeight={40} positionY={0} />
// //       </Canvas>
// //       <Leva />
// //     </>
// //   );
// // }



// // import { OrbitControls } from "@react-three/drei";
// // import { Canvas } from "@react-three/fiber";
// // import { Leva, useControls } from "leva";
// // import Lights from "../../components/editor/Additions/Lights";
// // import Frames from "../../components/editor/Frames/Frames";
// // import Underframe from "../../components/editor/Underframe/Underframe";

// // export default function EditorPage() {
// //   // Create controls with Leva - only for painting dimensions
// //   const {
// // }
// //     boxWidth,
// //     boxHeight,
// //     showHelpers
// //   } = useControls('Painting Controls', {
// //     boxWidth: {
// //       value: 29,
// //       min: 10,
// //       max: 80,
// //       step: 0.5,
// //       label: 'Painting Width'
// //     },
// //     boxHeight: {
// //       value: 40,
// //       min: 10, 
// //       max: 100,
// //       step: 0.5,
// //       label: 'Painting Height'
// //     },
// //     showHelpers: {
// //       value: false,
// //       label: 'Show Clip Planes'
// //     }
// //   });

// //   return (
// //     <>
// //       <Leva collapsed={false} />
      
// //       <Canvas
// //         gl={{ localClippingEnabled: true }}
// //         dpr={[1, 2]}
// //         shadows
// //         style={{ background: "black" }}
// //       >
// //         <OrbitControls minDistance={0.1} maxDistance={500} />
        
// //         <Lights />
// //          <Underframe /> 
// //         <Frames 
// //           boxWidth={boxWidth} 
// //           boxHeight={boxHeight} 
// //           positionY={0}
// //           showHelpers={showHelpers}
// //         />
// //       </Canvas>
// //     </>
// //   );


// import { OrbitControls, OrthographicCamera } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva, useControls } from "leva";
// import { Suspense, useState, useEffect } from 'react';
// import Lights from "../../components/editor/Additions/Lights";
// import Frames from "../../components/editor/Frames/Frames";
// import Underframe from "../../components/editor/Underframe/Underframe";
// import { useThrottledCallback } from "../../hooks/useThrottleCallback";

// export default function EditorPage() {
//   // State for throttled values
//   const [throttledWidth, setThrottledWidth] = useState(29);
//   const [throttledHeight, setThrottledHeight] = useState(40);
  
//   // Get raw values from Leva
//   const {
//     boxWidth,
//     boxHeight,
//     showHelpers
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
//     }
//   });

//   // Create throttled handlers for updating dimensions
//   const throttledWidthChange = useThrottledCallback(
//     (value) => setThrottledWidth(value),
//     10 // Throttle to 100ms
//   );

//   const throttledHeightChange = useThrottledCallback(
//     (value) => setThrottledHeight(value),
//     10 // Throttle to 100ms
//   );
  
//   // Update throttled values when controls change
//   useEffect(() => {
//     throttledWidthChange(boxWidth);
//   }, [boxWidth, throttledWidthChange]);
  
//   useEffect(() => {
//     throttledHeightChange(boxHeight);
//   }, [boxHeight, throttledHeightChange]);

//   return (
//     <>
//       <Leva collapsed={false} />
      
//       <Canvas
//         gl={{ 
//           localClippingEnabled: true,
//           antialias: true,
//           powerPreference:"high-performance",
//           // alpha: true,
//           // stencil: true,
//           // depth: true,
//           // preserveDrawingBuffer: true,
//           // failIfMajorPerformanceCaveat: true,
//           // logarithmicDepthBuffer: true,
//           // autoClear: true,
//           // autoClearColor: true,
//           // autoClearDepth: true,
//           // autoClearStencil: true,
//         }}
//         dpr={[1, 2]}
//         shadows
//         style={{ background: "black" }}
//         performance={{ min: 0.5 }}
//       >
        
//         <Suspense fallback={null}>
//           {/* Added OrthographicCamera */}
//           {/* <OrthographicCamera
//             makeDefault
//             zoom={15}
//             position={[-400, 0, 0]}
//             near={1}
//             far={1000}
//           /> */}
//           <OrbitControls minDistance={0.1} maxDistance={500} />
//           <Lights />
//           <Underframe />
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




// // import { OrbitControls, OrthographicCamera } from "@react-three/drei";
// // import { Canvas, useThree } from "@react-three/fiber";
// // import { Leva, useControls } from "leva";
// // import { Suspense, useState, useEffect, useRef } from 'react';
// // import Lights from "../../components/editor/Additions/Lights";
// // import Frames from "../../components/editor/Frames/Frames";
// // import Underframe from "../../components/editor/Underframe/Underframe";
// // import { useThrottledCallback } from "../../hooks/useThrottleCallback";

// // // Camera controller component to handle camera position changes
// // const CameraController = ({ cameraPosition, cameraTarget }) => {
// //   const { camera, controls } = useThree();
// //   const prevPositionRef = useRef(cameraPosition);
// //   const prevTargetRef = useRef(cameraTarget);
  
// //   useEffect(() => {
// //     if (camera && controls) {
// //       // Only update if position has changed
// //       if (
// //         prevPositionRef.current[0] !== cameraPosition[0] ||
// //         prevPositionRef.current[1] !== cameraPosition[1] ||
// //         prevPositionRef.current[2] !== cameraPosition[2]
// //       ) {
// //         camera.position.set(...cameraPosition);
// //         prevPositionRef.current = cameraPosition;
// //       }
      
// //       // Only update if target has changed
// //       if (
// //         controls.target &&
// //         (prevTargetRef.current[0] !== cameraTarget[0] ||
// //         prevTargetRef.current[1] !== cameraTarget[1] ||
// //         prevTargetRef.current[2] !== cameraTarget[2])
// //       ) {
// //         controls.target.set(...cameraTarget);
// //         prevTargetRef.current = cameraTarget;
// //         controls.update();
// //       }
// //     }
// //   }, [camera, controls, cameraPosition, cameraTarget]);
  
// //   return null;
// // };

// // export default function EditorPage() {
// //   // State for throttled values
// //   const [throttledWidth, setThrottledWidth] = useState(29);
// //   const [throttledHeight, setThrottledHeight] = useState(40);
  
// //   // Camera view presets
// //   const viewPresets = {
// //     front: { position: [0, 0, 100], target: [0, 0, 0] },
// //     side: { position: [100, 0, 0], target: [0, 0, 0] },
// //     top: { position: [0, 100, 0], target: [0, 0, 0] },
// //     perspective: { position: [50, 50, 50], target: [0, 0, 0] },
// //     custom: { position: [-400, 0, 0], target: [0, 0, 0] }, // Your original position
// //   };
  
// //   // Get raw values from Leva for painting dimensions
// //   const {
// //     boxWidth,
// //     boxHeight,
// //     showHelpers
// //   } = useControls('Painting Controls', {
// //     boxWidth: {
// //       value: 2.4,
// //       min: 10,
// //       max: 80,
// //       step: 0.5,
// //       label: 'Painting Width'
// //     },
// //     boxHeight: {
// //       value: 23.834,
// //       min: 10, 
// //       max: 100,
// //       step: 0.5,
// //       label: 'Painting Height'
// //     },
// //     showHelpers: {
// //       value: false,
// //       label: 'Show Clip Planes'
// //     }
// //   });
  
// //   // Camera controls with Leva
// //   const {
// //     cameraView,
// //     cameraZoom,
// //     cameraPositionX,
// //     cameraPositionY,
// //     cameraPositionZ
// //   } = useControls('Camera Controls', {
// //     cameraView: {
// //       options: Object.keys(viewPresets),
// //       value: 'custom',
// //       label: 'Camera View'
// //     },
// //     cameraZoom: {
// //       value: 15,
// //       min: 5,
// //       max: 50,
// //       step: 1,
// //       label: 'Camera Zoom'
// //     },
// //     cameraPositionX: {
// //       value: -400,
// //       min: -500,
// //       max: 500,
// //       step: 10,
// //       label: 'Camera X'
// //     },
// //     cameraPositionY: {
// //       value: 0,
// //       min: -500,
// //       max: 500,
// //       step: 10,
// //       label: 'Camera Y'
// //     },
// //     cameraPositionZ: {
// //       value: 0,
// //       min: -500,
// //       max: 500,
// //       step: 10,
// //       label: 'Camera Z'
// //     }
// //   });
  
// //   // Determine current camera position based on view preset or custom values
// //   const currentCameraPosition = cameraView === 'custom' 
// //     ? [cameraPositionX, cameraPositionY, cameraPositionZ]
// //     : viewPresets[cameraView].position;
    
// //   const currentCameraTarget = cameraView === 'custom'
// //     ? [0, 0, 0]  // Default target for custom view
// //     : viewPresets[cameraView].target;
  
// //   // Create throttled handlers for updating dimensions
// //   const throttledWidthChange = useThrottledCallback(
// //     (value) => setThrottledWidth(value),
// //     10 // Throttle to 100ms
// //   );
  
// //   const throttledHeightChange = useThrottledCallback(
// //     (value) => setThrottledHeight(value),
// //     10 // Throttle to 100ms
// //   );
  
// //   // Update throttled values when controls change
// //   useEffect(() => {
// //     throttledWidthChange(boxWidth);
// //   }, [boxWidth, throttledWidthChange]);
  
// //   useEffect(() => {
// //     throttledHeightChange(boxHeight);
// //   }, [boxHeight, throttledHeightChange]);
  
// //   return (
// //     <>
// //       <Leva collapsed={false} />
      
// //       <Canvas
// //         gl={{
// //           localClippingEnabled: true,
// //           antialias: true,
// //           powerPreference:"high-performance",
// //           // alpha: true,
// //           // stencil: true,
// //           // depth: true,
// //           // preserveDrawingBuffer: true,
// //           // failIfMajorPerformanceCaveat: true,
// //           // logarithmicDepthBuffer: true,
// //           // autoClear: true,
// //           // autoClearColor: true,
// //           // autoClearDepth: true,
// //           // autoClearStencil: true,
// //         }}
// //         dpr={[1, 2]}
// //         shadows
// //         style={{ background: "black" }}
// //         performance={{ min: 0.5 }}
// //       >
        
// //         <Suspense fallback={null}>
// //           {/* OrthographicCamera with zoom from controls */}
// //           <OrthographicCamera
// //             makeDefault
// //             zoom={cameraZoom}
// //             position={currentCameraPosition}
// //             near={1}
// //             far={1000}
// //           />
          
// //           {/* Camera Controller to handle position/target changes */}
// //           <CameraController 
// //             cameraPosition={currentCameraPosition} 
// //             cameraTarget={currentCameraTarget} 
// //           />
          
// //           <OrbitControls minDistance={0.1} maxDistance={500} />
// //           <Lights />
// //           <Underframe />
// //           <Frames
// //             boxWidth={throttledWidth}
// //             boxHeight={throttledHeight}
// //             positionY={0}
// //             showHelpers={showHelpers}
// //           />
// //         </Suspense>
// //       </Canvas>
// //     </>
// //   );
// // }


import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Suspense, useState, useEffect } from 'react';
import { Perf } from 'r3f-perf';
import Lights from "../../components/editor/Additions/Lights";
import Frames from "../../components/editor/Frames/Frames";
import Underframe from "../../components/editor/Underframe/Underframe";
import { useThrottledCallback } from "../../hooks/useThrottleCallback";

export default function EditorPage() {
  // State for throttled values
  const [throttledWidth, setThrottledWidth] = useState(29);
  const [throttledHeight, setThrottledHeight] = useState(40);
  
  // Get raw values from Leva
  const {
    boxWidth,
    boxHeight,
    showHelpers,
    showPerf
  } = useControls('Painting Controls', {
    boxWidth: {
      value: 29,
      min: 10,
      max: 80,
      step: 0.5,
      label: 'Painting Width'
    },
    boxHeight: {
      value: 40,
      min: 10, 
      max: 100,
      step: 0.5,
      label: 'Painting Height'
    },
    showHelpers: {
      value: false,
      label: 'Show Clip Planes'
    },
    showPerf: {
      value: true,
      label: 'Show Performance Monitor'
    }
  });

  // Create throttled handlers for updating dimensions
  const throttledWidthChange = useThrottledCallback(
    (value) => setThrottledWidth(value),
    10 // Throttle to 10ms
  );

  const throttledHeightChange = useThrottledCallback(
    (value) => setThrottledHeight(value),
    10 // Throttle to 10ms
  );
  
  // Update throttled values when controls change
  useEffect(() => {
    throttledWidthChange(boxWidth);
  }, [boxWidth, throttledWidthChange]);
  
  useEffect(() => {
    throttledHeightChange(boxHeight);
  }, [boxHeight, throttledHeightChange]);

  // Performance monitoring options
  const perfOptions = useControls('Performance Options', {
    matrixUpdate: { value: true, label: 'Matrix Updates' },
    fps: { value: true, label: 'FPS' },
    gl: { value: true, label: 'GL Call' },
    memory: { value: true, label: 'Memory' },
    rendererOverview: { value: false, label: 'Renderer Overview' }
  });

  return (
    <>
      <Leva collapsed={false} />
      
      <Canvas
        gl={{ 
          localClippingEnabled: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        shadows
        style={{ background: "black" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {showPerf && (
            <Perf 
              position="top-left"
              matrixUpdate={perfOptions.matrixUpdate}
              fps={perfOptions.fps}
              gl={perfOptions.gl}
              memory={perfOptions.memory}
              rendererOverview={perfOptions.rendererOverview}
            />
          )}
          
          <OrbitControls minDistance={0.1} maxDistance={500} />
          <Lights />
          <Underframe />
          <Frames
            boxWidth={throttledWidth}
            boxHeight={throttledHeight}
            positionY={0}
            showHelpers={showHelpers}
          />
        </Suspense>
      </Canvas>
    </>
  );
}