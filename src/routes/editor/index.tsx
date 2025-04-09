

// import { Leva } from "leva";
// import { Suspense, useState } from 'react';
// import EditorCanvas from "../../components/editor1/EditorCanvas";
// import ControlPanel from "../../components/editor1/ui/ControlPanel";

import EditorLayout from "../../components/editor2/ui/EditorLayout";
import { EditorStateProvider } from "../../hooks/useEditorState";

// export default function EditorPage() {
//   // State for dimension values
//   const [boxWidth, setBoxWidth] = useState(29);
//   const [boxHeight, setBoxHeight] = useState(40);
//   const [showHelpers, setShowHelpers] = useState(false);
//   const [showPerf, setShowPerf] = useState(true);
//   const [perfOptions, setPerfOptions] = useState<PerfOptions>({
//     matrixUpdate: true,
//     fps: true,
//     gl: true,
//     memory: true,
//     rendererOverview: false
//   });

//   return (
//     <>
//       {/* Leva controls panel */}
//       <Leva collapsed={false} />
      
//       {/* Control panel to manage state */}
//       <ControlPanel
//         onWidthChange={setBoxWidth}
//         onHeightChange={setBoxHeight}
//         onHelpersChange={setShowHelpers}
//         onPerfChange={setShowPerf}
//         onPerfOptionsChange={setPerfOptions}
//       />
      
//       {/* 3D Canvas with scene */}
//       <Suspense fallback={<div>Loading 3D scene...</div>}>
//         <EditorCanvas
//           boxWidth={boxWidth}
//           boxHeight={boxHeight}
//           showHelpers={showHelpers}
//           showPerf={showPerf}
//           perfOptions={perfOptions}
//           backgroundColor="#0A0A0A"
//         />
//       </Suspense>
//     </>
//   );
// }


// src/pages/EditorPage.tsx


// src/pages/EditorPage.tsx


export default function EditorPage() {
  return (
    <EditorStateProvider>
      <EditorLayout />
    </EditorStateProvider>
  );
}