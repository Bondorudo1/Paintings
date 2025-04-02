// import React from "react";
// import { Suspense } from "react";
// import Frame from "../Frame/Frame";
// import { SizeProps } from "./SizeProps";
// import BrushHelper from "@/helpers/BrushHelper";
// // import { OrthographicCamera } from "@react-three/drei";

// export default function Frames({ boxHeight, boxWidth }: SizeProps) {
//   const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

//   const rotations: Record<string, [number, number, number]> = {
//     bottom: [Math.PI, 0, Math.PI / 2], // Bottom frame
//     left: [-Math.PI / 2, 0, Math.PI / 2], // Left frame
//     top: [0, 0, Math.PI / 2], // Top frame
//     right: [Math.PI / 2, 0, Math.PI / 2], // Right frame
//   };

//   const frameShift =(77- boxWidth)/2-2.25;
//    // Shift the frame slightly to avoid z-fighting
//   return (
//     <group>
//       <Suspense fallback={null}>
//         {/* Top and Right Frames */}
//         <Frame
//           angles={[225,225]} // Shared angle for all frames
//           rotations={
//             [
//               rotations.bottom, // Bottom frame
//               rotations.left,
//             ] // Left frame
//           }
//           positions={[
//             [-1, precise(-boxHeight / 2)-0.85 , frameShift], // Bottom frame
//             [-1, 0, precise(-boxWidth / 2) - 0.85], // Left frame
//           ]}
//           scale={1}
//           // planeYPositions={[0, 18.56]} // Pass Y positions
//           mirror={true}
//         />
//         <Frame
//           angles={[45,45]} // Shared angle for all frames
//           rotations={
//             [rotations.top, rotations.right] // Right frame
//           } // Top frame
//           positions={[
//             [-1, precise(boxHeight / 2) + 0.85, -frameShift], // Top frame
//             [-1, -0, precise(boxWidth / 2) + 0.85], // Left frame
//           ]}
//           scale={1}
//           // planeYPositions={[0, 18.56]} // Pass Y positions
//           mirror={true}
//         />

//         {/* Main Mesh */}
//         <mesh scale={1} castShadow position={[-0.55, 0, 0]}>
//           <boxGeometry args={[0.1, boxHeight, boxWidth]} />

//           <BrushHelper
//             textureUrl="./Space.jpeg"
//             bumpMapUrl="./Textures/Brushes/brush_map.png"
//             bumpScale={2} // Optional with a default
//             metalness={0} // Optional with a default
//             roughness={0.1} // Optional with a default
//             color={"white"} // Default color
//             scale={[1, 1, 1]} // Optional scale adjustment
//             position={[0, 0, 0]} // Optional position
//           />
//         </mesh>
//       </Suspense>
//       {/* <OrthographicCamera
//         makeDefault
//         position={[0, 0, 10]}
//         zoom={50} // Adjust zoom to fit your scene
//         near={0.1}
//         far={1000}
//       /> */}
//     </group>
//   );
// }

import { useMemo } from "react";
import { Suspense } from "react";
import Frame from "../Frame/Frame";
import { SizeProps } from "./SizeProps";
import BrushHelper from "../../../helpers/BrushHelper";


export default function Frames({ boxHeight, boxWidth }: SizeProps) {
  const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

  // const rotations: Record<string, [number, number, number]> = {
  //   bottom: [Math.PI, 0, Math.PI / 2], // Bottom frame
  //   left: [-Math.PI / 2, 0, Math.PI / 2], // Left frame
  //   top: [0, 0, Math.PI / 2], // Top frame
  //   right: [Math.PI / 2, 0, Math.PI / 2], // Right frame
  // };

  // Define the Y positions for the planes independently for each frame
  // const planeYPositions1 = [0, -3.535]; // Adjust as needed for the first Frame
  // const planeYPositions2 = [0, 3.535]; // Adjust as needed for the second Frame
  // const planeYPositions3 = [0,3.535]; // Adjust as needed for the first Frame
  // const planeYPositions4 = [0, -3.535]; // Adjust as needed for the second Frame
  const frameShift = (77 - boxWidth) / 2 - 2.25; // Shift to avoid z-fighting

  const planeYPositions = useMemo(
    () => ({
      frame1: [0, -3.535],
      frame2: [0, 3.535],
    }),
    [] // Empty dependency is fine if the values are static.
  );
  console.log(planeYPositions.frame1)
  const positions: Record<string, [number, number, number]> = useMemo(
    () => ({
      left: [-1, 26.25, precise(-boxWidth / 2) - 0.85],
      bottom: [-1, precise(-boxHeight / 2) - 0.85, frameShift],
      top: [-1, precise(boxHeight / 2) + 0.85, -frameShift],
      right: [-1, -26.25, precise(boxWidth / 2) + 0.85],
    }),
    [boxHeight, boxWidth, frameShift]
  );
  const rotations: Record<string, [number, number, number]> = useMemo(
    () => ({
      bottom: [Math.PI, 0, Math.PI / 2],
      left: [-Math.PI / 2, 0, Math.PI / 2],
      top: [0, 0, Math.PI / 2],
      right: [Math.PI / 2, 0, Math.PI / 2],
    }),
    []
  );
  return (
    <group>
      <Suspense fallback={null}>
        <Frame
          angles={[225, 225]}
          rotations={[rotations.left]}
          positions={[positions.left]}
          planeYPositions={planeYPositions.frame1}
        />
        <Frame
          angles={[225, 225]}
          rotations={[rotations.bottom]}
          positions={[positions.bottom]}
          planeYPositions={planeYPositions.frame2}
        />
        <Frame
          angles={[45, 45]}
          rotations={[rotations.top]}
          positions={[positions.top]}
          planeYPositions={planeYPositions.frame2}
        />
        <Frame
          angles={[45, 45]}
          rotations={[rotations.right]}
          positions={[positions.right]}
          planeYPositions={planeYPositions.frame1}
        />
        <mesh scale={1} castShadow position={[-0.55, 0, 0]}>
          <boxGeometry args={[0.1, boxHeight, boxWidth]} />
          <BrushHelper
            textureUrl="./Space.jpeg"
            bumpMapUrl="./textures/brushes/brush_map.png"
            bumpScale={2}
            metalness={0}
            roughness={0.1}
            color="white"
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
          />
        </mesh>
      </Suspense>
    </group>
  );
}
