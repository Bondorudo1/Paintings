"use client";


// import Underframe from "@/components/Underframe/Underframe";

import { OrbitControls} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Lights from "../../components/editor/Additions/Lights";
import Frames from "../../components/editor/Frames/Frames";

export default function EditorPage() {
  return (
    <>
      <Leva collapsed />

      <Canvas
        onCreated={(state) => (state.gl.localClippingEnabled = true)}
        dpr={[1, 2]}
        shadows
        style={{ background: "black" }}
      >
       <OrbitControls minDistance={0.1} maxDistance={500} />

        <Lights />
        {/* <Underframe /> */}
        <Frames boxWidth={30} boxHeight={20} positionY={0} />
      </Canvas>
      <Leva />
    </>
  );
}
