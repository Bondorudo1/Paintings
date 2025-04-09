// src/components/ui/EditorLayout.tsx

import { useState } from 'react';
import SideBar from './SideBar';

import ConfigurationPanel from './ConfigurationPanel';
import { useEditorState } from '../../../hooks/useEditorState';
import frameOptions from '../../../data/frameOptions';
import backgroundOptions from '../../../data/backgroundOptions';
import EditorCanvas from '../EditorCanvas';


export default function EditorLayout() {
  const { state } = useEditorState();
  const [configOpen, setConfigOpen] = useState(true);

  // Find current frame and background based on IDs
  const currentFrame = frameOptions.find(frame => frame.id === state.appearance.frameId);
  const currentBackground = backgroundOptions.find(bg => bg.id === state.appearance.backgroundId);

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Sidebar for Frame/Background Selection */}
      <SideBar />
      
      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <EditorCanvas
          boxWidth={state.dimensions.width}
          boxHeight={state.dimensions.height}
          showHelpers={state.ui.showHelpers}
          showPerf={state.ui.showPerf}
          paintingImage={state.appearance.paintingImage}
          frameTextures={currentFrame?.textureSet}
          frameProperties={currentFrame?.properties}
          backgroundTextures={currentBackground?.textureSet}
          backgroundProperties={currentBackground?.properties}
          lightingSettings={state.lighting}
        />
        
        {/* Configuration Panel Button */}
        <button 
          className="absolute top-5 right-5 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg"
          onClick={() => setConfigOpen(!configOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>
      
      {/* Right Configuration Panel */}
      <ConfigurationPanel isOpen={configOpen} />
    </div>
  );
}