import { Suspense } from "react";
import { FramesProps } from "./types";
import Frame from "./Frame";
import BrushHelper from "../../helpers/BrushHelper";
import { useFrameCalculations } from "../../hooks/useFrameCalculations";


export default function Frames({ 
  boxHeight, 
  boxWidth, 
  frameWidth = 77, 
  frameRabbet = 2.255,
  positionY = 0,
  showHelpers = false
}: FramesProps) {
  // Use the hook to calculate frame positions, rotations, and clipping planes
  const { positions, rotations, planeYPositions } = useFrameCalculations({
    boxWidth,
    boxHeight,
    frameWidth,
    frameRabbet
  });

  return (
    <group position={[0, positionY, 0]}>
      <Suspense fallback={null}>
        {/* Left frame */}
        <Frame
          angles={[225, 225]}
          rotations={[rotations.left]}
          positions={[positions.left]}
          planeYPositions={planeYPositions.frame1}
          showHelpers={showHelpers}
        />
        
        {/* Bottom frame */}
        <Frame
          angles={[225, 225]}
          rotations={[rotations.bottom]}
          positions={[positions.bottom]}
          planeYPositions={planeYPositions.frame2}
          showHelpers={showHelpers}
        />
        
        {/* Top frame */}
        <Frame
          angles={[45, 45]}
          rotations={[rotations.top]}
          positions={[positions.top]}
          planeYPositions={planeYPositions.frame2}
          showHelpers={showHelpers}
        />
        
        {/* Right frame */}
        <Frame
          angles={[45, 45]}
          rotations={[rotations.right]}
          positions={[positions.right]}
          planeYPositions={planeYPositions.frame1}
          showHelpers={showHelpers}
        />
        
        {/* Canvas/painting surface with improved material */}
        <mesh scale={1} castShadow receiveShadow position={[-0.55, 0, 0]}>
          <boxGeometry args={[0.1, boxHeight, boxWidth]} />
          <BrushHelper
            textureUrl="./Space.jpeg"
            bumpMapUrl="./textures/brushes/brush_map.png"
            bumpScale={2}
            metalness={0}
            roughness={0.1}
            color="white"
          />
        </mesh>
      </Suspense>
    </group>
  );
}