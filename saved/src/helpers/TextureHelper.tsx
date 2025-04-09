import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { EXRLoader } from 'three-stdlib';
import { TextureHelperProps } from './TextureHelperProps';
import { useMemo } from 'react';

export default function TextureHelper({
  colorMapUrl,
  displacementMapUrl,
  normalMapUrl,
  roughnessMapUrl,
  aoMapUrl,
  displacementScale = 0.2,
  metalness = 0,
  roughness = 1,
  repeat = [1, 1],
  transparent = false,
}: TextureHelperProps) {
  // Load standard textures
  const texturesToLoad = [colorMapUrl];
  if (displacementMapUrl) texturesToLoad.push(displacementMapUrl);
  if (aoMapUrl) texturesToLoad.push(aoMapUrl);
  
  const loadedTextures = useLoader(TextureLoader, texturesToLoad);
  
  // Extract loaded textures
  const colorMap = loadedTextures[0];
  const displacementMap = displacementMapUrl ? loadedTextures[1] : null;
  const aoMap = aoMapUrl ? loadedTextures[loadedTextures.length - 1] : null;
  
  // Load EXR textures if provided
  const normalMap = normalMapUrl ? useLoader(EXRLoader, normalMapUrl) : null;
  const roughnessMap = roughnessMapUrl ? useLoader(EXRLoader, roughnessMapUrl) : null;
  
  // Apply texture settings
  useMemo(() => {
    [colorMap, displacementMap, normalMap, roughnessMap, aoMap].forEach(texture => {
      if (texture) {
        texture.repeat.set(repeat[0], repeat[1]);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    });
  }, [colorMap, displacementMap, normalMap, roughnessMap, aoMap, repeat]);

  return (
    <meshStandardMaterial
      displacementScale={displacementScale}
      map={colorMap}
      displacementMap={displacementMap}
      normalMap={normalMap}
      roughnessMap={roughnessMap}
      aoMap={aoMap}
      metalness={metalness}
      roughness={roughness}
      transparent={transparent}
    />
  );
}
