import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import TextureHelperProps from "@/types/TextureHelperProps";
import { EXRLoader } from 'three-stdlib';

export default function TextureHelper({
  colorMapUrl,
  displacementMapUrl,
  normalMapUrl,
  roughnessMapUrl,
  aoMapUrl,
  displacementScale = 0.2,
  metalness = 0, // Default to 0 if not provided
  roughness = 1, // Default to 1 if not provided
}: TextureHelperProps) {
  const [colorMap, displacementMap, aoMap] = useLoader(TextureLoader, [
    colorMapUrl,
    displacementMapUrl,
    aoMapUrl,
  ]);

  // Use EXRLoader for normalMap and roughnessMap
  const normalMap = useLoader(EXRLoader, normalMapUrl);
  const roughnessMap = useLoader(EXRLoader, roughnessMapUrl);

  return (
    <meshStandardMaterial
      displacementScale={displacementScale}
      map={colorMap}
      displacementMap={displacementMap}
      normalMap={normalMap}
      roughnessMap={roughnessMap}
      aoMap={aoMap}
      metalness={metalness}  // Apply the metalness here
      roughness={roughness}  // Apply the roughness here
      transparent={true} // Optional: for transparent textures
    />
  );
}
