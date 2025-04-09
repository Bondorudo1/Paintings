// src/components/editor/Frame.tsx

import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ModelProps } from "../../types/editorTypes";

export default function Frame({
  angles,
  rotations,
  positions,
  planeYPositions,
  showHelpers = false
}: ModelProps) {
  const { scene: originalScene } = useGLTF("/models/APPLIED3.glb");
  const modelRef = useRef<THREE.Object3D>();
  
  // Create clipping planes based on provided angles and positions
  const planes = useMemo(() => {
    if (!angles || !planeYPositions) return [];
    
    return angles.map((angle, index) => {
      const radians = (angle * Math.PI) / 180;
      const planeNormal = new THREE.Vector3(
        0,
        Math.cos(radians),
        Math.sin(radians)
      ).normalize();
      return new THREE.Plane(planeNormal, planeYPositions[index]);
    });
  }, [angles, planeYPositions]);

  // Create prepared scene clones for each position/rotation
  const preparedScenes = useMemo(() => {
    if (!rotations || !planes.length || !originalScene) return [];
    
    return rotations.map(() => {
      // Clone the scene for this instance
      const clonedScene = originalScene.clone();
      
      // Apply clipping planes to all materials in this clone
      planes.forEach((plane) => {
        clonedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            
            // Set shadow properties based on mesh names
            if (mesh.name.includes('frame_visible') || mesh.name.includes('front_panel')) {
              mesh.castShadow = true;
            } else {
              mesh.castShadow = false;
            }
            
            mesh.receiveShadow = true;
            
            if (mesh.material) {
              // Handle both single materials and arrays of materials
              if (Array.isArray(mesh.material)) {
                mesh.material = mesh.material.map(mat => {
                  const clonedMat = mat.clone();
                  clonedMat.clippingPlanes = [plane];
                  clonedMat.clipIntersection = true;
                  clonedMat.needsUpdate = true;
                  return clonedMat;
                });
              } else {
                mesh.material = mesh.material.clone();
                mesh.material.clippingPlanes = [plane];
                mesh.material.clipIntersection = true;
                mesh.material.needsUpdate = true;
              }
            }
          }
        });
      });
      
      return clonedScene;
    });
  }, [originalScene, planes, rotations]);

  // Create helper elements if needed
  const planeHelpers = useMemo(() => {
    if (!showHelpers || !planes.length) return null;
    
    return planes.map((plane, index) => (
      <primitive
        key={`plane-helper-${index}`}
        object={new THREE.PlaneHelper(plane, 5, 0xff0000)}
      />
    ));
  }, [planes, showHelpers]);

  // Render primitive elements with shadow configuration
  const primitiveElements = useMemo(() => {
    if (!rotations || !positions || !preparedScenes.length) return null;
    
    return rotations.map((rotation, index) => (
      <primitive
        key={`model-${index}`}
        ref={index === 0 ? modelRef : undefined}
        object={preparedScenes[index]}
        position={positions[index]}
        rotation={rotation}
      />
    ));
  }, [rotations, positions, preparedScenes]);

  return (
    <>
      {primitiveElements}
      {planeHelpers}
    </>
  );
}