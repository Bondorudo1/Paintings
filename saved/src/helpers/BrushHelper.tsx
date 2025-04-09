import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import { BrushHelperProps } from './BrushHelperProps';
import { useMemo } from 'react';

export default function BrushHelper({
  textureUrl,
  bumpMapUrl,
  bumpScale = 1,
  metalness = 0,
  roughness = 0.5,
  color = "white",
  transparent = true,
  opacity = 1,
}: BrushHelperProps) {
  // Load textures
  const [texture, bumpMap] = useLoader(TextureLoader, [
    textureUrl,
    bumpMapUrl || '', // Fallback if not provided
  ]);
  
  // Apply texture settings
  useMemo(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
    if (bumpMap) {
      bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping;
    }
  }, [texture, bumpMap]);

  return (
    <meshStandardMaterial
      color={color}
      map={texture}
      bumpMap={bumpMapUrl ? bumpMap : null}
      bumpScale={bumpScale}
      metalness={metalness}
      roughness={roughness}
      transparent={transparent}
      opacity={opacity}
    />
  );
}