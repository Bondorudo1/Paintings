// import { useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import TextureHelperProps from "@/types/TextureHelperProps";
// import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

// export default function TextureHelper({
//   colorMapUrl,
//   displacementMapUrl,
//   normalMapUrl,
//   roughnessMapUrl,
//   aoMapUrl,
//   displacementScale = 0.2,
//   metalness = 0, // Default to 0 if not provided
//   roughness = 1,
//   ...props // Default to 1 if not provided
// }: TextureHelperProps) {
//   // Helper function to determine if a file is an EXR
//   const isEXR = (url: string) => url?.toLowerCase().endsWith('.exr');

//   // Load color, displacement, and ao maps with TextureLoader
//   const colorMap = useLoader(TextureLoader, colorMapUrl);
//   const displacementMap = useLoader(TextureLoader, displacementMapUrl);
//   // const aoMap = useLoader(TextureLoader, aoMapUrl);
//   const aoMap = aoMapUrl ? useLoader(TextureLoader, aoMapUrl) : null;
//   // Load normal map with appropriate loader based on file extension
//   const normalMap = isEXR(normalMapUrl) 
//     ? useLoader(EXRLoader, normalMapUrl)
//     : useLoader(TextureLoader, normalMapUrl);

//   // Load roughness map with appropriate loader based on file extension
//   const roughnessMap = isEXR(roughnessMapUrl)
//     ? useLoader(EXRLoader, roughnessMapUrl)
//     : useLoader(TextureLoader, roughnessMapUrl);

//   return (
//     <meshStandardMaterial
//     {...props}
//       displacementScale={displacementScale}
//       map={colorMap}
//       displacementMap={displacementMap}
//       normalMap={normalMap}
//       roughnessMap={roughnessMap}
//       aoMap={aoMap || undefined} 
//       metalness={metalness}
//       roughness={roughness}
//       transparent={true}
//     />
//   );
// }


import { useLoader } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping } from 'three'; // Add RepeatWrapping import
import TextureHelperProps from "@/types/TextureHelperProps";
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

export default function TextureHelper({
  colorMapUrl,
  displacementMapUrl,
  normalMapUrl,
  roughnessMapUrl,
  aoMapUrl,
  displacementScale = 0.2,
  metalness = 0, // Default to 0 if not provided
  roughness = 1, // Default to 1 if not provided
  textureRepeat = 1, // Add texture repeat with default value of 1
  ...props
}: TextureHelperProps) {
  // Helper function to determine if a file is an EXR
  const isEXR = (url: string) => url?.toLowerCase().endsWith('.exr');

  // Load color, displacement, and ao maps with TextureLoader
  const colorMap = useLoader(TextureLoader, colorMapUrl);
  const displacementMap = useLoader(TextureLoader, displacementMapUrl);
  // const aoMap = useLoader(TextureLoader, aoMapUrl);
  const aoMap = aoMapUrl ? useLoader(TextureLoader, aoMapUrl) : null;
  
  // Load normal map with appropriate loader based on file extension
  const normalMap = isEXR(normalMapUrl)
     ? useLoader(EXRLoader, normalMapUrl)
    : useLoader(TextureLoader, normalMapUrl);

  // Load roughness map with appropriate loader based on file extension
  const roughnessMap = isEXR(roughnessMapUrl)
    ? useLoader(EXRLoader, roughnessMapUrl)
    : useLoader(TextureLoader, roughnessMapUrl);

  // Configure texture repeat for each map
  if (colorMap) {
    colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(textureRepeat, textureRepeat);
  }
  
  if (displacementMap) {
    displacementMap.wrapS = displacementMap.wrapT = RepeatWrapping;
    displacementMap.repeat.set(textureRepeat, textureRepeat);
  }
  
  if (normalMap) {
    normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
    normalMap.repeat.set(textureRepeat, textureRepeat);
  }
  
  if (roughnessMap) {
    roughnessMap.wrapS = roughnessMap.wrapT = RepeatWrapping;
    roughnessMap.repeat.set(textureRepeat, textureRepeat);
  }
  
  if (aoMap) {
    aoMap.wrapS = aoMap.wrapT = RepeatWrapping;
    aoMap.repeat.set(textureRepeat, textureRepeat);
  }

  return (
    <meshStandardMaterial
      {...props}
      displacementScale={displacementScale}
      map={colorMap}
      displacementMap={displacementMap}
      normalMap={normalMap}
      roughnessMap={roughnessMap}
      aoMap={aoMap || undefined}
      metalness={metalness}
      roughness={roughness}
      transparent={true}
    />
  );
}