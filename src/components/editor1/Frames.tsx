import { Suspense } from "react";
import { FramesProps } from "./types";
import Frame from "./Frame";
import BrushHelper from "../../helpers/BrushHelper";
import { useFrameCalculations } from "../../hooks/useFrameCalculations";
import { FrontSide } from "three";

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
        
        {/* Canvas/painting surface with controlled shadow */}
        <mesh
          scale={1}
          castShadow={true}
          receiveShadow
          position={[-0.55, 0, 0]}
        >
          <boxGeometry args={[0.1, boxHeight, boxWidth]} />
          <BrushHelper 
  attach="material-0" // Передняя часть холста
  textureUrl="./textures/fabric/Fabric060_1K-JPG_Color.jpg" // Основная текстура
  bumpMapUrl="./textures/fabric/Fabric060_1K-JPG_NormalGL.jpg" // Карта нормалей
  bumpScale={3} // Меньшее значение для тонкой текстуры холста
  metalness={0}
  roughness={1} // Уменьшите шероховатость
  color="#FFFFFF"
  intensity={20} // Настройте интенсивность
/>
          <BrushHelper 
            attach="material-1" // Front face - where your texture will show
            textureUrl="./self-portrait.jpg"
            bumpMapUrl="./textures/brushes/brush_map.png"
            bumpScale={1}
            metalness={0}
            roughness={0.05}
            color="white"
          />
          <meshStandardMaterial attach="material-2" color="white" /> {/* Top face */}
          <meshStandardMaterial attach="material-3" color="white" /> {/* Bottom face */}
          <meshStandardMaterial attach="material-4" color="white" /> {/* Left face */}
          <meshStandardMaterial attach="material-5" color="white" /> {/* Back face */}
        </mesh>
      </Suspense>
    </group>
  );
}
