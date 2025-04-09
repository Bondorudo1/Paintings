// src/components/ui/SideBar.tsx

import { useState } from 'react';

import ImageUploader from './ImageUploader';

import frameOptions from '../../../data/frameOptions';
import backgroundOptions from '../../../data/backgroundOptions';
import { useEditorState } from '../../../hooks/useEditorState';

export default function SideBar() {
  const { state, dispatch } = useEditorState();
  const [activeSection, setActiveSection] = useState<'frames' | 'backgrounds' | 'upload'>('frames');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter frames/backgrounds based on search query
  const filteredFrames = frameOptions.filter(frame => 
    frame.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredBackgrounds = backgroundOptions.filter(bg => 
    bg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle frame selection
  const selectFrame = (frameId: string) => {
    dispatch({ type: 'SET_FRAME', frameId });
  };
  
  // Handle background selection
  const selectBackground = (backgroundId: string) => {
    dispatch({ type: 'SET_BACKGROUND', backgroundId });
  };
  
  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    dispatch({ type: 'SET_PAINTING_IMAGE', image: imageUrl });
  };
  
  return (
    <div className="w-80 bg-gray-100 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Customization</h2>
        
        {/* Search Input */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-3 top-3 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex mt-4 border-b border-gray-200">
          <button
            onClick={() => setActiveSection('frames')}
            className={`flex-1 py-2 text-center ${
              activeSection === 'frames' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'
            }`}
          >
            Frames
          </button>
          <button
            onClick={() => setActiveSection('backgrounds')}
            className={`flex-1 py-2 text-center ${
              activeSection === 'backgrounds' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'
            }`}
          >
            Backgrounds
          </button>
          <button
            onClick={() => setActiveSection('upload')}
            className={`flex-1 py-2 text-center ${
              activeSection === 'upload' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'
            }`}
          >
            Upload
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Frames Grid */}
        {activeSection === 'frames' && (
          <div className="grid grid-cols-2 gap-4">
            {filteredFrames.map(frame => (
              <div
                key={frame.id}
                onClick={() => selectFrame(frame.id)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                  state.appearance.frameId === frame.id ? 'border-blue-500' : 'border-gray-200'
                } transition-colors duration-200 hover:border-blue-300`}
              >
                <div className="aspect-w-1 aspect-h-1 bg-white">
                  {/* Use thumbnail if available, otherwise show placeholder */}
                  {frame.thumbnail ? (
                    <img
                      src={frame.thumbnail}
                      alt={frame.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-500 text-sm">No preview</span>
                    </div>
                  )}
                </div>
                <div className="p-2 text-center">
                  <span className="text-sm font-medium text-gray-900">{frame.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Backgrounds Grid */}
        {activeSection === 'backgrounds' && (
          <div className="grid grid-cols-2 gap-4">
            {filteredBackgrounds.map(background => (
              <div
                key={background.id}
                onClick={() => selectBackground(background.id)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                  state.appearance.backgroundId === background.id ? 'border-blue-500' : 'border-gray-200'
                } transition-colors duration-200 hover:border-blue-300`}
              >
                <div className="aspect-w-1 aspect-h-1 bg-white">
                  {background.thumbnail ? (
                    <img
                      src={background.thumbnail}
                      alt={background.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-500 text-sm">No preview</span>
                    </div>
                  )}
                </div>
                <div className="p-2 text-center">
                  <span className="text-sm font-medium text-gray-900">{background.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Upload Section */}
        {activeSection === 'upload' && (
          <ImageUploader onUpload={handleImageUpload} currentImage={state.appearance.paintingImage} />
        )}
      </div>
      
      {/* Footer with saved profiles/presets (optional) */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Save Current Setup
        </button>
      </div>
    </div>
  );
}