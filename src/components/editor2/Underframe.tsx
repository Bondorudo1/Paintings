// src/components/editor/Underframe.tsx

import { useMemo } from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import TextureHelper from '../../helpers/TextureHelper';

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
}

interface UnderframeProps {
  boxHeight: number;
  boxWidth: number;
  frameDepth?: number;
  frameTextures?: TextureSet;
  frameProperties?: MaterialProps;
}

const defaultTextures = {
  colorMapUrl: "./textures/oak/textures/oak_veneer_01_diff_1k.jpg",
  displacementMapUrl: "./textures/oak/textures/oak_veneer_01_disp_1k.png",
  normalMapUrl: "./textures/oak/textures/oak_veneer_01_nor_gl_1k.exr",
  roughnessMapUrl: "./textures/oak/textures/oak_veneer_01_rough_1k.exr",
  aoMapUrl: "./textures/oak/textures/oak_veneer_01_ao_1k.jpg",
};

const defaultProperties = {
  metalness: 0.1,
  roughness: 0.8,
  borderWidth: 5
};

const Underframe = ({
  boxHeight,
  boxWidth,
  frameDepth = 1,
  frameTextures = defaultTextures,
  frameProperties = defaultProperties
}: UnderframeProps) => {
  // Use border width from properties or default
  const borderWidth = frameProperties.borderWidth || defaultProperties.borderWidth;

  // Create the frame geometry using CSG operations
  const frame = useMemo(() => {
    // Create the outer cube for the frame
    const outerCube = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth, boxHeight, frameDepth)
    );

    // Create the inner cube to subtract (creating the opening)
    const innerCube = new THREE.Mesh(
      new THREE.BoxGeometry(
        boxWidth - borderWidth,
        boxHeight - borderWidth,
        frameDepth
      )
    );

    // Perform CSG subtraction to create the frame shape
    const csgResult = CSG.subtract(outerCube, innerCube);

    // Return the resulting geometry
    return csgResult.geometry;
  }, [boxHeight, boxWidth, frameDepth, borderWidth]);

  return (
    <mesh 
      rotation={[0, Math.PI / 2, 0]} 
      position={[0, 0, 0]} 
      geometry={frame}
      castShadow
      receiveShadow
    >
      <TextureHelper
        colorMapUrl={frameTextures.colorMapUrl}
        displacementMapUrl={frameTextures.displacementMapUrl}
        normalMapUrl={frameTextures.normalMapUrl}
        roughnessMapUrl={frameTextures.roughnessMapUrl}
        aoMapUrl={frameTextures.aoMapUrl}
        displacementScale={0.02} 
        metalness={frameProperties.metalness || defaultProperties.metalness}
        roughness={frameProperties.roughness || defaultProperties.roughness}
      />
    </mesh>
  );
}

export default Underframe;