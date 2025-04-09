// src/components/ui/FrameSelector.tsx

import { useState } from 'react';

import frameOptions from '../../../data/frameOptions';
import { useEditorState } from '../../../hooks/useEditorState';


interface FrameSelectorProps {
  className?: string;
}

export default function FrameSelector({ className = '' }: FrameSelectorProps) {
  const { state, dispatch } = useEditorState();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter frames based on search query
  const filteredFrames = frameOptions.filter(frame => 
    frame.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle frame selection
  const handleFrameSelect = (frameId: string) => {
    dispatch({ type: 'SET_FRAME', frameId });
  };
  
  return (
    <div className={`${className}`}>
      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search frames..."
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
      </div>
      
      {/* Frames Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredFrames.map(frame => (
          <div
            key={frame.id}
            onClick={() => handleFrameSelect(frame.id)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
              state.appearance.frameId === frame.id ? 'border-blue-500' : 'border-gray-200'
            } transition-colors duration-200 hover:border-blue-300`}
          >
            <div className="aspect-w-1 aspect-h-1 bg-white">
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
      
      {/* Empty State */}
      {filteredFrames.length === 0 && (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No frames found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}