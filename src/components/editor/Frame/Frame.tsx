// import React, { useEffect, useMemo, useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import ModelProps from "./ModelProps";

// export default function Frame({
//   angles,
//   rotations,
//   positions,
//   planeYPositions,
// }: ModelProps) {
//   const { scene: originalScene } = useGLTF("/models/APPLIED3.glb");
//   const modelRef = useRef<THREE.Object3D>();
  
//   // Create clipping planes based on provided angles and positions
//   const planes = useMemo(() => {
//     return angles.map((angle, index) => {
//       const radians = (angle * Math.PI) / 180;
//       const planeNormal = new THREE.Vector3(
//         0,
//         Math.cos(radians),
//         Math.sin(radians)
//       );
//       return new THREE.Plane(planeNormal, planeYPositions[index]);
//     });
//   }, [angles, planeYPositions]);

//   // Create prepared scene clones for each position/rotation
//   const preparedScenes = useMemo(() => {
//     return rotations.map(() => {
//       // Clone the scene for this instance
//       const clonedScene = originalScene.clone();
      
//       // Apply clipping planes to all materials in this clone
//       planes.forEach((plane) => {
//         clonedScene.traverse((child) => {
//           if ((child as THREE.Mesh).isMesh) {
//             const mesh = child as THREE.Mesh;
//             mesh.castShadow = true;
//             mesh.receiveShadow = true;
            
//             if (mesh.material instanceof THREE.Material) {
//               mesh.material = mesh.material.clone();
//               mesh.material.clippingPlanes = [plane];
//               mesh.material.clipIntersection = true;
//               mesh.material.needsUpdate = true;
//             }
//           }
//         });
//       });
      
//       return clonedScene;
//     });
//   }, [originalScene, planes, rotations.length]);

//   return (
//     <>
//       {rotations.map((rotation, index) => (
//         <primitive
//           key={index}
//           ref={index === 0 ? modelRef : undefined}
//           object={preparedScenes[index]} // Use the pre-prepared scene with clipping already applied
//           position={positions[index]}
//           rotation={rotation}
//         />
//       ))}
//       {planes.map((plane, index) => (
//         <primitive
//           key={`plane-${index}`}
//           object={new THREE.PlaneHelper(plane, 5, 0xff0000)}
//         />
//       ))}
//     </>
//   );
// }


// import { Suspense, useMemo } from "react";
// import Frame from "../Frame/Frame";
// import { SizeProps } from "./SizeProps";
// import BrushHelper from "../../../helpers/BrushHelper";

// // Extended SizeProps to include showHelpers
// interface FramesProps extends SizeProps {
//   showHelpers?: boolean;
//   positionY?: number;
// }

// export default function Frames({ 
//   boxHeight, 
//   boxWidth, 
//   frameWidth = 77, 
//   frameRabbet = 2.255,
//   positionY = 0,
//   showHelpers = false
// }: FramesProps) {
//   const precise = (value: number) => parseFloat(value.toFixed(6));

//   // All calculations performed in useMemo to optimize rendering
//   const calculatedValues = useMemo(() => {
//     let boxBigger = 0;
//     let boxSmaller = 0;
//     let frameShiftBigger = 0;
//     let frameShiftSmaller = 0;
    
//     if (boxWidth <= boxHeight) {
//       boxBigger = boxHeight;
//       boxSmaller = boxWidth;
//     } else {
//       boxBigger = boxWidth;
//       boxSmaller = boxHeight;
//     }
  
//     const triangleBiggestSide = (boxBigger / 2) - (boxSmaller / 2);
    
//     function calculateSide(hypotenuse: number) {
//       return Math.abs(hypotenuse / Math.sqrt(2));
//     }
    
//     let side = calculateSide(triangleBiggestSide);
    
//     const frameShift1 = Math.abs((frameWidth - boxBigger) / 2 - frameRabbet);
//     const frameShift2 = Math.abs((frameWidth - boxSmaller) / 2 - frameRabbet);
  
//     if (boxWidth <= boxHeight) {
//       side = -side;
//       frameShiftBigger = frameShift1;
//       frameShiftSmaller = frameShift2;
//     } else {
//       frameShiftBigger = frameShift2;
//       frameShiftSmaller = frameShift1;
//     }
    
//     // Plane Y positions for clipping
//     const planeYPositions = {
//       frame1: [0, -side],
//       frame2: [0, side],
//     };
    
//     // Calculate frame positions
//     const positions: Record<string, [number, number, number]> = {
//       left: [-1, frameShiftBigger, precise(-boxWidth / 2) - 0.85],
//       bottom: [-1, precise(-boxHeight / 2) - 0.85, frameShiftSmaller],
//       top: [-1, precise(boxHeight / 2) + 0.85, -frameShiftSmaller],
//       right: [-1, -frameShiftBigger, precise(boxWidth / 2) + 0.85],
//     };
    
//     // Define rotations (these don't change with dimensions)
//     const rotations: Record<string, [number, number, number]> = {
//       bottom: [Math.PI, 0, Math.PI / 2],
//       left: [-Math.PI / 2, 0, Math.PI / 2],
//       top: [0, 0, Math.PI / 2],
//       right: [Math.PI / 2, 0, Math.PI / 2],
//     };

//     return {
//       planeYPositions,
//       positions,
//       rotations
//     };
//   }, [boxWidth, boxHeight, frameWidth, frameRabbet]);

//   const { planeYPositions, positions, rotations } = calculatedValues;

//   return (
//     <group position={[0, positionY, 0]}>
//       <Suspense fallback={null}>
//         <Frame
//           angles={[225, 225]}
//           rotations={[rotations.left]}
//           positions={[positions.left]}
//           planeYPositions={planeYPositions.frame1}
//           showHelpers={showHelpers}
//         />
//         <Frame
//           angles={[225, 225]}
//           rotations={[rotations.bottom]}
//           positions={[positions.bottom]}
//           planeYPositions={planeYPositions.frame2}
//           showHelpers={showHelpers}
//         />
//         <Frame
//           angles={[45, 45]}
//           rotations={[rotations.top]}
//           positions={[positions.top]}
//           planeYPositions={planeYPositions.frame2}
//           showHelpers={showHelpers}
//         />
//         <Frame
//           angles={[45, 45]}
//           rotations={[rotations.right]}
//           positions={[positions.right]}
//           planeYPositions={planeYPositions.frame1}
//           showHelpers={showHelpers}
//         />
//         <mesh scale={1} castShadow position={[-0.55, 0, 0]}>
//           <boxGeometry args={[0.1, boxHeight, boxWidth]} />
//           <BrushHelper
//             textureUrl="./Space.jpeg"
//             bumpMapUrl="./textures/brushes/brush_map.png"
//             bumpScale={2}
//             metalness={0}
//             roughness={0.1}
//             color="white"
//             scale={[1, 1, 1]}
//             position={[0, 0, 0]}
//           />
//         </mesh>
//       </Suspense>
//     </group>
//   );
// }



import React, { useMemo, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ModelProps from "./ModelProps";

export default function Frame({
  angles,
  rotations,
  positions,
  planeYPositions,
  showHelpers = false
}: ModelProps) {
  const { scene: originalScene } = useGLTF("/models/APPLIED3.glb");
  const modelRef = useRef<THREE.Object3D>();
  
  // Create clipping planes based on provided angles and positions
  const planes = useMemo(() => {
    if (!angles || !planeYPositions) return [];
    
    return angles.map((angle, index) => {
      const radians = (angle * Math.PI) / 180;
      const planeNormal = new THREE.Vector3(
        0,
        Math.cos(radians),
        Math.sin(radians)
      );
      return new THREE.Plane(planeNormal, planeYPositions[index]);
    });
  }, [angles, planeYPositions]);

  // Create prepared scene clones for each position/rotation
  const preparedScenes = useMemo(() => {
    if (!rotations || !planes.length || !originalScene) return [];
    
    return rotations.map(() => {
      // Clone the scene for this instance
      const clonedScene = originalScene.clone();
      
      // Apply clipping planes to all materials in this clone
      planes.forEach((plane) => {
        clonedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            if (mesh.material instanceof THREE.Material) {
              mesh.material = mesh.material.clone();
              mesh.material.clippingPlanes = [plane];
              mesh.material.clipIntersection = true;
              mesh.material.needsUpdate = true;
            }
          }
        });
      });
      
      return clonedScene;
    });
  }, [originalScene, planes, rotations]);

  // Create helper elements if needed - safely
  const planeHelpers = useMemo(() => {
    if (!showHelpers || !planes.length) return null;
    
    return planes.map((plane, index) => (
      <primitive
        key={`plane-helper-${index}`}
        object={new THREE.PlaneHelper(plane, 5, 0xff0000)}
      />
    ));
  }, [planes, showHelpers]);

  // Handle primitive rendering safely
  const primitiveElements = useMemo(() => {
    if (!rotations || !positions || !preparedScenes.length) return null;
    
    return rotations.map((rotation, index) => (
      <primitive
        key={`model-${index}`}
        ref={index === 0 ? modelRef : undefined}
        object={preparedScenes[index]}
        position={positions[index]}
        rotation={rotation}
      />
    ));
  }, [rotations, positions, preparedScenes]);

  return (
    <>
      {primitiveElements}
      {planeHelpers}
    </>
  );
}