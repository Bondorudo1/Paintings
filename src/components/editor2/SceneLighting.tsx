// src/components/editor/SceneLighting.tsx

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneLightingProps {
  showHelpers?: boolean;
  lightingSettings?: {
    keyIntensity: number;
    fillIntensity: number;
    rimIntensity: number;
    ambientIntensity: number;
  };
}

export default function SceneLighting({ 
  showHelpers = false,
  lightingSettings 
}: SceneLightingProps) {
  // References for the various lights
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  
  // Default lighting values
  const defaultSettings = {
    keyIntensity: 1.5,
    fillIntensity: 0.7,
    rimIntensity: 1.0,
    ambientIntensity: 0.5
  };
  
  // Apply lighting settings when they change
  useEffect(() => {
    if (!lightingSettings) return;
    
    if (keyLightRef.current) {
      keyLightRef.current.intensity = lightingSettings.keyIntensity;
    }
    
    if (fillLightRef.current) {
      fillLightRef.current.intensity = lightingSettings.fillIntensity;
    }
    
    if (rimLightRef.current) {
      rimLightRef.current.intensity = lightingSettings.rimIntensity;
    }
    
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = lightingSettings.ambientIntensity;
    }
  }, [lightingSettings]);
  
  // Optional animation for rim light to create subtle movement
  useFrame(({ clock }) => {
    if (rimLightRef.current) {
      const time = clock.getElapsedTime();
      rimLightRef.current.position.x = Math.sin(time * 0.1) * 50;
    }
  });

  // Use props or default values
  const settings = lightingSettings || defaultSettings;

  return (
    <>
      {/* Key light - main directional light */}
      <directionalLight
        ref={keyLightRef}
        position={[-40, 50, 30]} 
        intensity={settings.keyIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      >
        <orthographicCamera 
          attach="shadow-camera"
          args={[-10, 10, 10, -10, 0.1, 100]}
        />
      </directionalLight>
      
      {/* Fill light - softer light from opposite side */}
      <directionalLight
        ref={fillLightRef}
        position={[-12, 5, -20]}
        intensity={settings.fillIntensity}
        castShadow={false}
      />
      
      {/* Rim light - highlights edges of objects */}
      <directionalLight
        ref={rimLightRef}
        position={[-30, 10, -50]}
        intensity={settings.rimIntensity}
        castShadow={false}
        color="#E1E1FF" // Slight blue tint for rim light
      />
      
      {/* Ambient light - overall scene illumination */}
      <ambientLight ref={ambientLightRef} intensity={settings.ambientIntensity} />
      
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