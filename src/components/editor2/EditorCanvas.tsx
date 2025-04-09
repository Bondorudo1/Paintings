// src/components/editor/EditorCanvas.tsx

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import SceneLighting from "./SceneLighting";
import Underframe from "./Underframe";
import Frames from "./Frames";
import * as THREE from "three";
import TextureHelper from "../../helpers/TextureHelper";
import { useEditorState } from "../../hooks/useEditorState";

interface TextureSet {
  colorMapUrl: string;
  displacementMapUrl: string;
  normalMapUrl: string;
  roughnessMapUrl: string;
  aoMapUrl: string;
}

interface MaterialProps {
  metalness?: number;
  roughness?: number;
  borderWidth?: number;
  displacementScale?: number;
}

interface EditorCanvasProps {
  boxWidth: number;
  boxHeight: number;
  showHelpers?: boolean;
  showPerf?: boolean;
  paintingImage?: string;
  frameTextures?: TextureSet;
  frameProperties?: MaterialProps;
  backgroundTextures?: TextureSet;
  backgroundProperties?: MaterialProps;
  lightingSettings?: {
    keyIntensity: number;
    fillIntensity: number;
    rimIntensity: number;
    ambientIntensity: number;
  };
  perfOptions?: {
    matrixUpdate?: boolean;
    fps?: boolean;
    gl?: boolean;
    memory?: boolean;
    rendererOverview?: boolean;
  };
}

export default function EditorCanvas({
  boxWidth,
  boxHeight,
  showHelpers = false,
  showPerf = false,
  paintingImage = "./self-portrait.jpg",
  frameTextures,
  frameProperties,
  backgroundTextures,
  backgroundProperties,
  lightingSettings,
  perfOptions = {
    matrixUpdate: true,
    fps: true,
    gl: true,
    memory: true,
    rendererOverview: false,
  },
}: EditorCanvasProps) {
  const { state } = useEditorState();
const { width, height, depth, textureRepeat } = state.background;




  return (
    <Canvas
      onCreated={(state) => {
        // Enable local clipping planes for the renderer
        state.gl.localClippingEnabled = true;
        
        // Set pixel ratio based on device capabilities
        state.gl.setPixelRatio(window.devicePixelRatio || 2);
        
        // Set tone mapping for better color representation
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        state.gl.toneMappingExposure = 1.2;
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        precision: "highp",
        alpha: true,
      }}
      dpr={[1, 2]} // Responsive pixel ratio
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [-100, 0, 0],
      }}
      style={{ 
        width: "100%", 
        height: "100%",
        background: "#b9b6b6" 
      }}
    >
      {/* Performance monitor */}
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
      
      <Suspense fallback={null}>
        {/* Camera controls */}
        <OrbitControls
          minDistance={5}
          maxDistance={200}
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 6} // Limit to avoid going under the model
          maxPolarAngle={Math.PI - Math.PI / 6} // Limit to avoid going over the model
        />
        
        {/* Lighting system */}
        <SceneLighting 
          showHelpers={showHelpers} 
          lightingSettings={lightingSettings}
        />
        
        {/* Scene content */}
        <Underframe 
          boxHeight={boxHeight} 
          boxWidth={boxWidth} 
          frameTextures={frameTextures}
          frameProperties={frameProperties}
        />
        
        <Frames
          boxWidth={boxWidth}
          boxHeight={boxHeight}
          showHelpers={showHelpers}
          paintingImage={paintingImage}
        />
        
        {/* Background plane with texture */}
        <mesh 
          rotation={[0, Math.PI, 0]} 
          position={[1.5, 0, 0]} 
          receiveShadow
        >
                  <boxGeometry args={[depth, height, width]} />
          <TextureHelper
            colorMapUrl={backgroundTextures?.colorMapUrl || "./textures/fabric/Fabric060_1K-JPG_Color.jpg"}
            displacementMapUrl={backgroundTextures?.displacementMapUrl || "./textures/fabric/Fabric060_1K-JPG_Displacement.jpg"}
            normalMapUrl={backgroundTextures?.normalMapUrl || "./textures/fabric/Fabric060_1K-JPG_NormalGL.jpg"}
            roughnessMapUrl={backgroundTextures?.roughnessMapUrl || "./textures/fabric/Fabric060_1K-JPG_Roughness.jpg"}
            aoMapUrl={backgroundTextures?.aoMapUrl || ""}
            displacementScale={backgroundProperties?.displacementScale || 0.05}
            metalness={backgroundProperties?.metalness || 0}
            roughness={backgroundProperties?.roughness || 1}
            textureRepeat={textureRepeat} 
          />
        </mesh>
      </Suspense>
    </Canvas>
  );
}