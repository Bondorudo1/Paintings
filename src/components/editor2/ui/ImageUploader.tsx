// src/components/ui/ImageUploader.tsx

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void;
  currentImage?: string;
}

export default function ImageUploader({ onUpload, currentImage }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sample images for quick selection
  const sampleImages = [
    { id: 'sample1', name: 'Abstract', url: './samples/abstract.jpg' },
    { id: 'sample2', name: 'Landscape', url: './samples/landscape.jpg' },
    { id: 'sample3', name: 'Portrait', url: './samples/portrait.jpg' },
    { id: 'sample4', name: 'Still Life', url: './samples/still-life.jpg' },
  ];
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      onUpload(result);
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      console.error('Error reading file');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // Select sample image
  const selectSampleImage = (imageUrl: string) => {
    setPreviewUrl(imageUrl);
    onUpload(imageUrl);
  };
  
  return (
    <div className="space-y-6">
      {/* Current Image Preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="aspect-w-4 aspect-h-3 bg-gray-50">
          {(previewUrl || currentImage) ? (
            <img 
              src={previewUrl || currentImage} 
              alt="Current artwork" 
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No image selected</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Upload Controls */}
      <div className="space-y-3">
        <button
          onClick={triggerFileInput}
          disabled={isUploading}
          className="w-full py-3 px-4 flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isUploading ? (
            <span>Uploading...</span>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Upload Image</span>
            </>
          )}
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="text-xs text-gray-500 text-center">
          Supported formats: JPG, PNG, WebP. Max size: 10MB
        </div>
      </div>
      
      {/* Sample Images */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Sample Images</h3>
        <div className="grid grid-cols-2 gap-3">
          {sampleImages.map(image => (
            <button
              key={image.id}
              onClick={() => selectSampleImage(image.url)}
              className="border border-gray-200 rounded-md overflow-hidden hover:border-blue-500 transition-colors"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img src={image.url} alt={image.name} className="object-cover" />
              </div>
              <div className="p-1 text-center">
                <span className="text-xs font-medium">{image.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}