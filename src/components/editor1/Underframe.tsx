import { useMemo } from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import TextureHelper from '../../helpers/TextureHelper';


interface UnderframeProps {
  boxHeight: number;
  boxWidth: number;
  frameDepth?: number;
  borderWidth?: number;
}

const Underframe = ({
  boxHeight,
  boxWidth,
  frameDepth = 1,
  borderWidth = 5
}: UnderframeProps) => {
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
        colorMapUrl="./textures/oak/textures/oak_veneer_01_diff_1k.jpg"
        displacementMapUrl="./textures/oak/textures/oak_veneer_01_disp_1k.png"
        normalMapUrl="./textures/oak/textures/oak_veneer_01_nor_gl_1k.exr"
        roughnessMapUrl="./textures/oak/textures/oak_veneer_01_rough_1k.exr"
        aoMapUrl="./textures/oak/textures/oak_veneer_01_ao_1k.jpg"
        displacementScale={0} 
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

export default Underframe;

