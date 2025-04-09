// src/data/defaultSettings.ts

export interface EditorSettings {
   dimensions: {
     width: number;
     height: number;
     maxWidth: number;
     maxHeight: number;
     minWidth: number;
     minHeight: number;
   };
   lighting: {
     keyIntensity: number;
     fillIntensity: number;
     rimIntensity: number;
     ambientIntensity: number;
   };
   camera: {
     fov: number;
     near: number;
     far: number;
     position: [number, number, number];
     minDistance: number;
     maxDistance: number;
   };
   background: {
    width: number;
    height: number;
    depth: number;
    textureRepeat: number;
    minTextureRepeat: number;
    maxTextureRepeat: number;
    minSize: number;
    maxSize: number;
  }  
   defaultFrameId: string;
   defaultBackgroundId: string;
   defaultImage: string;
   displayHelpers: boolean;
 }
 
 const defaultSettings: EditorSettings = {
   dimensions: {
     width: 29,
     height: 40,
     maxWidth: 80,
     maxHeight: 100,
     minWidth: 10,
     minHeight: 10,
   },
   lighting: {
     keyIntensity: 1.5,
     fillIntensity: 0.7,
     rimIntensity: 1.0,
     ambientIntensity: 0.5,
   },
   camera: {
     fov: 45,
     near: 0.1,
     far: 1000,
     position: [0, 5, 15],
     minDistance: 5,
     maxDistance: 100,
   },
   background: {
    width: 100,
    height: 100,
    depth: 2,
    textureRepeat: 10, // Controls texture tiling
    minTextureRepeat: 1,
    maxTextureRepeat: 20,
    minSize: 10,
    maxSize: 200
  },
   defaultFrameId: 'classic-oak',
   defaultBackgroundId: 'fabric-beige',
   defaultImage: './self-portrait.jpg',
   displayHelpers: false,
 };
 
 export default defaultSettings;