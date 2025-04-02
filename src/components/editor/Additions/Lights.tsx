import { useEffect, useRef, useState } from "react";
import { DirectionalLight } from "three";


export default function Lights() {
  const directionalLightRef = useRef<DirectionalLight>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (directionalLightRef.current) {
      setIsReady(true);
    }
  }, []);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        position={[-50, 50, 50]}
        castShadow
        intensity={3}
      />
      {isReady && directionalLightRef.current && (
        <directionalLightHelper
          args={[directionalLightRef.current, 2, 0xff0000]}
        />
      )}
      <ambientLight intensity={2.6} />
    </>
  );
}
