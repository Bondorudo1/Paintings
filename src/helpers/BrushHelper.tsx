import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import BrushHelperProps from "@/types/BrushHelperProps";

export default function BrushHelper({
  textureUrl,
  bumpMapUrl,
  bumpScale = 1, // Default bump effect
  metalness = 0,
  roughness = 0.5,
  color = "white",
}: BrushHelperProps) {
  // Load textures
  const texture = useLoader(TextureLoader, textureUrl);
  const bumpMap = useLoader(TextureLoader, bumpMapUrl);

  return (
    <meshStandardMaterial
      color={color}
      map={texture}
      bumpMap={bumpMap}
      bumpScale={bumpScale} // Apply the bump effect here
      metalness={metalness} // Apply the metalness here
      roughness={roughness} // Apply the roughness here
      transparent={true} // Optional: for transparent textures
    />
  );
}
