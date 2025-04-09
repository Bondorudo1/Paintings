import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

interface SceneLightingProps {
  showHelpers?: boolean;
}

export default function SceneLighting({ showHelpers = false }: SceneLightingProps) {
  // References for the various lights
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  
  // Optional lighting controls if needed
  const lightControls = useControls('Lighting', {
    enableControls: { value: false, label: 'Enable Light Controls' },
  });

  // Advanced lighting controls that appear conditionally
  const { keyIntensity, fillIntensity, rimIntensity, ambientIntensity } = useControls(
    'Light Settings', 
    {
      keyIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
      fillIntensity: { value: 0.7, min: 0, max: 2, step: 0.1 },
      rimIntensity: { value: 1.0, min: 0, max: 3, step: 0.1 },
      ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
    },
    { collapsed: true, render: (get) => get('Lighting.enableControls') }
  );

  // Optional animation for rim light to create subtle movement
  useFrame(({ clock }) => {
    if (rimLightRef.current) {
      const time = clock.getElapsedTime();
      rimLightRef.current.position.x = Math.sin(time * 0.1) * 50;
    }
  });

  return (
    <>
      {/* Key light - main directional light */}
      <directionalLight
        ref={keyLightRef}
        position={[-40, 50, 30]} 
        intensity={keyIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-far={100}
      />
      
      {/* Fill light - softer light from opposite side */}
      <directionalLight
        ref={fillLightRef}
        position={[30, 20, -20]}
        intensity={fillIntensity}
        castShadow={false} // Usually fill lights don't cast shadows
      />
      
      {/* Rim light - highlights edges of objects */}
      <directionalLight
        ref={rimLightRef}
        position={[-30, 10, -50]}
        intensity={rimIntensity}
        castShadow={false}
        color="#E1E1FF" // Slight blue tint for rim light
      />
      
      {/* Ambient light - overall scene illumination */}
      <ambientLight intensity={ambientIntensity} />
      
      {/* Optional helpers for debugging */}
      {showHelpers && keyLightRef.current && (
        <directionalLightHelper args={[keyLightRef.current, 5, "#FFFF00"]} />
      )}
      
      {showHelpers && fillLightRef.current && (
        <directionalLightHelper args={[fillLightRef.current, 5, "#00FF00"]} />
      )}
      
      {showHelpers && rimLightRef.current && (
        <directionalLightHelper args={[rimLightRef.current, 5, "#0000FF"]} />
      )}
    </>
  );
}