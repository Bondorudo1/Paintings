// import React, { useEffect, useMemo, useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls } from "leva";
// import ModelProps from "./ModelProps";

// export default function Frame({
//   angles,
//   rotations,
//   positions,
//   planeYPositions,
// }: ModelProps) {
//   const modelRef = useRef<THREE.Object3D>();

//   const { scene: originalScene } = useGLTF("/Models/APPLIED3.glb");

//   // Clone the scene to ensure uniqueness
//   const scene = useMemo(() => {
//     const clone = originalScene.clone();
//     clone.updateMatrixWorld();
//     return clone;
//   }, [originalScene]);

//   const { planeYPosition } = useControls("Clipping Plane", {
//     planeYPosition: {
//       value: 0,
//       min: -50,
//       max: 18.56,
//       step: 0.01,
//     },
//   });

//   // const planes = useMemo(() => {
//   //   return angles.map((angle) => {
//   //     const radians = (angle * Math.PI) / 180;
//   //     const planeNormal = new THREE.Vector3(
//   //       0,
//   //       Math.cos(radians),
//   //       Math.sin(radians)
//   //     );
//   //     return new THREE.Plane(planeNormal, planeYPosition);
//   //   });
//   // }, [angles]);
//   const planes = useMemo(() => {
//     return angles.map((angle, index) => {
//       const radians = (angle * Math.PI) / 180;
//       const planeNormal = new THREE.Vector3(0, Math.cos(radians), Math.sin(radians));
//       return new THREE.Plane(planeNormal, planeYPositions[index]);
//     });
//   }, [angles, planeYPositions]);

//   // Ensure the planes update when `planeYPosition` changes
//   useEffect(() => {
//     planes.forEach((plane) => {
//       plane.constant = planeYPosition;
//     });
//   }, [planeYPosition, planes]);

//   useEffect(() => {
//     planes.forEach((plane) => {
//       scene.traverse((child) => {
//         if ((child as THREE.Mesh).isMesh) {
//           const mesh = child as THREE.Mesh;
//           mesh.castShadow = true;
//           mesh.receiveShadow = true;

//           if (mesh.material instanceof THREE.Material) {
//             mesh.material = mesh.material.clone();
//             mesh.material.clippingPlanes = [plane];
//             mesh.material.clipIntersection = true;
//             mesh.material.needsUpdate = true;
//           }
//         }
//       });
//     });
//   }, [scene, planes]);

//   return (
//     <>
//       {rotations.map((rotation, index) => (
//         <primitive
//           key={index}
//           ref={index === 0 ? modelRef : undefined}
//           object={scene.clone()} // Clone scene for each frame
//           position={positions[index]}
//           rotation={rotation}
//         />
//       ))}
//       {planes.map((plane, index) => (
//         <primitive
//           key={`plane-${index}`}
//           object={new THREE.PlaneHelper(plane, 5, 0xff0000)} // Plane helper
//         />
//       ))}
//     </>
//   );
// }

import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ModelProps from "./ModelProps";

export default function Frame({
  angles,
  rotations,
  positions,
  planeYPositions,
}: ModelProps) {
  const { scene: originalScene } = useGLTF("/models/APPLIED3.glb");
  const modelRef = useRef<THREE.Object3D>();

  
  

  // Clone the scene to ensure uniqueness
  const scene = useMemo(() => {
    const clone = originalScene.clone();
    clone.updateMatrixWorld();
    return clone;
  }, [originalScene]);

  // Create clipping planes based on provided angles and positions
  const planes = useMemo(() => {
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

  useEffect(() => {
    planes.forEach((plane) => {
      scene.traverse((child) => {
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
  }, [scene, planes]);

  return (
    <>
      {rotations.map((rotation, index) => (
        <primitive
          key={index}
          ref={index === 0 ? modelRef : undefined}
          object={scene.clone()} // Clone scene for each frame
          position={positions[index]}
          rotation={rotation}
          planeYPositions={planeYPositions}
        />
      ))}
      {planes.map((plane, index) => (
        <primitive
          key={`plane-${index}`}
          object={new THREE.PlaneHelper(plane, 5, 0xff0000)} // Plane helper for visualization
        />
      ))}
    </>
  );
}




