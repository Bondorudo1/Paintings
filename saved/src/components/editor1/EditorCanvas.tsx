import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import SceneLighting from "./SceneLighting";
import Underframe from "./Underframe";
import Frames from "./Frames";


interface EditorCanvasProps {
  boxWidth: number;
  boxHeight: number;
  showHelpers?: boolean;
  showPerf?: boolean;
  perfOptions?: {
    matrixUpdate?: boolean;
    fps?: boolean;
    gl?: boolean;
    memory?: boolean;
    rendererOverview?: boolean;
  };
  backgroundColor?: string;
}

export default function EditorCanvas({
  boxWidth,
  boxHeight,
  showHelpers = false,
  showPerf = false,
  perfOptions = {
    matrixUpdate: true,
    fps: true,
    gl: true,
    memory: true,
    rendererOverview: false,
  },
  backgroundColor = "#0A0A0A",
}: EditorCanvasProps) {
  return (
    <Canvas
      onCreated={(state) => {
        // Enable local clipping planes for the renderer
        state.gl.localClippingEnabled = true;
        
        // Optional: Set pixel ratio based on device capabilities
        state.gl.setPixelRatio(window.devicePixelRatio || 2);
        
        // Optional: Set tone mapping for better color representation
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
      shadows={{ type: THREE.PCFSoftShadowMap }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 5, 15],
      }}
      style={{ 
        background: backgroundColor,
        width: "100%", 
        height: "100%" 
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
          maxDistance={100}
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 6} // Limit to avoid going under the model
          maxPolarAngle={Math.PI - Math.PI / 6} // Limit to avoid going over the model
        />
        
        {/* Lighting system */}
        <SceneLighting showHelpers={showHelpers} />
        
        {/* Scene content */}
        <Underframe boxHeight={boxHeight} boxWidth={boxWidth} />
        <Frames
          boxWidth={boxWidth}
          boxHeight={boxHeight}
          showHelpers={showHelpers}
        />
        
        {/* Optional ground plane for better shadow visibility */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -5, 0]} 
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Suspense>
    </Canvas>
  );
}