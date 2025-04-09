
import { useMemo } from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import TextureHelper from '../../../helpers/TextureHelper';


// Since you're using React, we can use the React.FC (Functional Component) type here
const Underframe = ({boxHeight,boxWidth}) => {
  const frame = useMemo(() => {
    // Create the outer cube
    const outerCube = new THREE.Mesh(new THREE.BoxGeometry(boxWidth, boxHeight, 1));

    // Create the inner cube to subtract
    const innerCube = new THREE.Mesh(new THREE.BoxGeometry(boxWidth-5, boxHeight-5, 1));

    // Perform CSG subtraction
    const csgResult = CSG.subtract(outerCube, innerCube);

    return csgResult.geometry;
  }, [boxHeight, boxWidth]);

  return (
    <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]} geometry={frame}>
      <TextureHelper
        colorMapUrl="./textures/oak/textures/oak_veneer_01_diff_1k.jpg"
        displacementMapUrl="./textures/oak/textures/oak_veneer_01_disp_1k.png"
        normalMapUrl="./textures/oak/textures/oak_veneer_01_nor_gl_1k.exr"
        roughnessMapUrl="./textures/oak/textures/oak_veneer_01_rough_1k.exr"
        aoMapUrl="./textures/oak/textures/oak_veneer_01_ao_1k.jpg"
        displacementScale={0} 
    
      />
    </mesh>
  );
}

export default Underframe;
