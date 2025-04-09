import { Suspense } from "react";
import Frame from "../Frame/Frame";
import { useFrameCalculations } from "../../../hooks/useFrameCalculations";
import BrushHelper from "../../../helpers/BrushHelper";

// Extended props interface with showHelpers
interface FramesProps {
  boxHeight: number;
  boxWidth: number;
  frameWidth?: number;
  frameRabbet?: number;
  positionY?: number;
  showHelpers?: boolean;
}

export default function Frames({ 
  boxHeight, 
  boxWidth, 
  frameWidth = 77, 
  frameRabbet = 2.255,
  positionY = 0,
  showHelpers = false
}: FramesProps) {
  // Use the new hook to calculate frame positions, rotations, and clipping planes
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
        
        {/* Canvas/painting surface */}
        <mesh scale={1} castShadow position={[-0.55, 0, 0]}>
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