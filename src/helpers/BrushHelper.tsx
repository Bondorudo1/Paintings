import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, DoubleSide, FrontSide, BackSide } from "three";
import BrushHelperProps from "@/types/BrushHelperProps";

export default function BrushHelper({
  textureUrl,
  bumpMapUrl,
  bumpScale = 1,
  metalness = 0,
  roughness = 0.5,
  color = "white",
  side = FrontSide,
  intensity = 0.1, // Default emissive intensity
  ...props // Allow for additional props like "attach"
}: BrushHelperProps) {
  // Load textures
  const texture = useLoader(TextureLoader, textureUrl);
  const bumpMap = useLoader(TextureLoader, bumpMapUrl);
  
  return (
    <meshStandardMaterial
      {...props} // Spread additional props
      color={color}
      map={texture}
      bumpMap={bumpMap}
      bumpScale={bumpScale}
      metalness={metalness}
      roughness={roughness}
      transparent={true}
      side={side}
      emissive="#111111" // Добавьте небольшое свечение
      emissiveIntensity={intensity} // Настройте интенсивность
    />
  );
}
