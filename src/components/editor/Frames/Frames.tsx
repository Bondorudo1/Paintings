// import { Suspense } from "react";
// import Frame from "../Frame/Frame";
// import { SizeProps } from "./SizeProps";
// import BrushHelper from "../../../helpers/BrushHelper";

// export default function Frames({ boxHeight, boxWidth, frameWidth = 77, frameRabbet = 2.255 }: SizeProps) {
//   const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

//   let boxBigger = 0;
//   let boxSmaller = 0;
//   let frameShiftBigger = 0;
//   let frameShiftSmaller = 0;
  
//   if (boxWidth <= boxHeight) {
//     boxBigger = boxHeight;
//     boxSmaller = boxWidth;
//   } else {
//     boxBigger = boxWidth;
//     boxSmaller = boxHeight;
//   }

//   const triangleBiggestSide = (boxBigger / 2) - (boxSmaller / 2);
//   console.log("tianglE" + triangleBiggestSide);

//   function calculateSide(hypotenuse: number) {
//     return Math.abs(hypotenuse / Math.sqrt(2));
//   }
  
//   let side = calculateSide(triangleBiggestSide);
//   console.log("side" + side);

//   const frameShift1 = Math.abs((frameWidth - boxBigger) / 2 - frameRabbet);
//   const frameShift2 = Math.abs((frameWidth - boxSmaller) / 2 - frameRabbet);

//   if (boxWidth <= boxHeight) {
//     side = -side;
//     frameShiftBigger = frameShift1;
//     frameShiftSmaller = frameShift2;
//   } else {
//     frameShiftBigger = frameShift2;
//     frameShiftSmaller = frameShift1;
//   }
  
//   console.log("frameShift1 " + frameShift1);
//   console.log("frameShift2 " + frameShift2);

//   // Removed useMemo - calculate values directly
//   const planeYPositions = {
//     frame1: [0, -side],
//     frame2: [0, side],
//   };
  
//   console.log(planeYPositions.frame1);
  
//   // Removed useMemo - calculate positions directly
//   const positions: Record<string, [number, number, number]> = {
//     left: [-1, frameShiftBigger, precise(-boxWidth / 2) - 0.85],
//     bottom: [-1, precise(-boxHeight / 2) - 0.85, frameShiftSmaller],
//     top: [-1, precise(boxHeight / 2) + 0.85, -frameShiftSmaller],
//     right: [-1, -frameShiftBigger, precise(boxWidth / 2) + 0.85],
//   };
  
//   // Removed useMemo - define rotations directly
//   const rotations: Record<string, [number, number, number]> = {
//     bottom: [Math.PI, 0, Math.PI / 2],
//     left: [-Math.PI / 2, 0, Math.PI / 2],
//     top: [0, 0, Math.PI / 2],
//     right: [Math.PI / 2, 0, Math.PI / 2],
//   };

//   return (
//     <group>
//       <Suspense fallback={null}>
//         <Frame
//           angles={[225, 225]}
//           rotations={[rotations.left]}
//           positions={[positions.left]}
//           planeYPositions={planeYPositions.frame1}
//         />
//         <Frame
//           angles={[225, 225]}
//           rotations={[rotations.bottom]}
//           positions={[positions.bottom]}
//           planeYPositions={planeYPositions.frame2}
//         />
//         <Frame
//           angles={[45, 45]}
//           rotations={[rotations.top]}
//           positions={[positions.top]}
//           planeYPositions={planeYPositions.frame2}
//         />
//         <Frame
//           angles={[45, 45]}
//           rotations={[rotations.right]}
//           positions={[positions.right]}
//           planeYPositions={planeYPositions.frame1}
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





import { Suspense } from "react";
import Frame from "../Frame/Frame";
import { SizeProps } from "./SizeProps";
import BrushHelper from "../../../helpers/BrushHelper";

// Extended SizeProps to include showHelpers
interface FramesProps extends SizeProps {
  showHelpers?: boolean;
  positionY?: number;
}

export default function Frames({ 
  boxHeight, 
  boxWidth, 
  frameWidth = 77, 
  frameRabbet = 2.255,
  positionY = 0,
  showHelpers = false
}: FramesProps) {
  const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

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

  const triangleBiggestSide = (boxBigger / 2) - (boxSmaller / 2);
  console.log("tianglE" + triangleBiggestSide);

  function calculateSide(hypotenuse: number) {
    return Math.abs(hypotenuse / Math.sqrt(2));
  }
  
  let side = calculateSide(triangleBiggestSide);
  console.log("side" + side);

  const frameShift1 = Math.abs((frameWidth - boxBigger) / 2 - frameRabbet);
  const frameShift2 = Math.abs((frameWidth - boxSmaller) / 2 - frameRabbet);

  if (boxWidth <= boxHeight) {
    side = -side;
    frameShiftBigger = frameShift1;
    frameShiftSmaller = frameShift2;
  } else {
    frameShiftBigger = frameShift2;
    frameShiftSmaller = frameShift1;
  }
  
  console.log("frameShift1 " + frameShift1);
  console.log("frameShift2 " + frameShift2);

  // Calculate values directly
  const planeYPositions = {
    frame1: [0, -side],
    frame2: [0, side],
  };
  
  console.log(planeYPositions.frame1);
  
  // Calculate positions directly
  const positions: Record<string, [number, number, number]> = {
    left: [-1, frameShiftBigger, precise(-boxWidth / 2) - 0.85],
    bottom: [-1, precise(-boxHeight / 2) - 0.85, frameShiftSmaller],
    top: [-1, precise(boxHeight / 2) + 0.85, -frameShiftSmaller],
    right: [-1, -frameShiftBigger, precise(boxWidth / 2) + 0.85],
  };
  
  // Define rotations directly
  const rotations: Record<string, [number, number, number]> = {
    bottom: [Math.PI, 0, Math.PI / 2],
    left: [-Math.PI / 2, 0, Math.PI / 2],
    top: [0, 0, Math.PI / 2],
    right: [Math.PI / 2, 0, Math.PI / 2],
  };

  return (
    <group position={[0, positionY, 0]}>
      <Suspense fallback={null}>
        <Frame
          angles={[225, 225]}
          rotations={[rotations.left]}
          positions={[positions.left]}
          planeYPositions={planeYPositions.frame1}
          showHelpers={showHelpers}
        />
        <Frame
          angles={[225, 225]}
          rotations={[rotations.bottom]}
          positions={[positions.bottom]}
          planeYPositions={planeYPositions.frame2}
          showHelpers={showHelpers}
        />
        <Frame
          angles={[45, 45]}
          rotations={[rotations.top]}
          positions={[positions.top]}
          planeYPositions={planeYPositions.frame2}
          showHelpers={showHelpers}
        />
        <Frame
          angles={[45, 45]}
          rotations={[rotations.right]}
          positions={[positions.right]}
          planeYPositions={planeYPositions.frame1}
          showHelpers={showHelpers}
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