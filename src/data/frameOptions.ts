// src/data/frameOptions.ts

export interface FrameOption {
   id: string;
   name: string;
   thumbnail: string;
   modelPath: string;
   textureSet: {
     colorMapUrl: string;
     displacementMapUrl: string;
     normalMapUrl: string;
     roughnessMapUrl: string;
     aoMapUrl: string;
   };
   properties: {
     metalness: number;
     roughness: number;
     borderWidth: number;
   };
 }
 
 const frameOptions: FrameOption[] = [
   {
     id: 'modern-black',
     name: 'Modern Black',
     thumbnail: '/thumbnails/frames/modern-black.jpg',
     modelPath: '/models/frames/modern.glb',
     textureSet: {
       colorMapUrl: '/textures/frames/black-wood/color.jpg',
       displacementMapUrl: '/textures/frames/black-wood/displacement.jpg',
       normalMapUrl: '/textures/frames/black-wood/normal.jpg',
       roughnessMapUrl: '/textures/frames/black-wood/roughness.jpg',
       aoMapUrl: '/textures/frames/black-wood/ao.jpg',
     },
     properties: {
       metalness: 0.1,
       roughness: 0.8,
       borderWidth: 4,
     }
   },
   {
     id: 'classic-oak',
     name: 'Classic Oak',
     thumbnail: '/thumbnails/frames/classic-oak.jpg',
     modelPath: '/models/frames/classic.glb',
     textureSet: {
       colorMapUrl: '/textures/oak/textures/oak_veneer_01_diff_1k.jpg',
       displacementMapUrl: '/textures/oak/textures/oak_veneer_01_disp_1k.png',
       normalMapUrl: '/textures/oak/textures/oak_veneer_01_nor_gl_1k.exr',
       roughnessMapUrl: '/textures/oak/textures/oak_veneer_01_rough_1k.exr',
       aoMapUrl: '/textures/oak/textures/oak_veneer_01_ao_1k.jpg',
     },
     properties: {
       metalness: 0.1,
       roughness: 0.8,
       borderWidth: 5,
     }
   },
   {
     id: 'ornate-gold',
     name: 'Ornate Gold',
     thumbnail: '/thumbnails/frames/ornate-gold.jpg',
     modelPath: '/models/frames/ornate.glb',
     textureSet: {
       colorMapUrl: '/textures/gold/gold_diff.jpg',
       displacementMapUrl: '/textures/gold/gold_disp.jpg',
       normalMapUrl: '/textures/gold/gold_nor.jpg',
       roughnessMapUrl: '/textures/gold/gold_rough.jpg',
       aoMapUrl: '/textures/gold/gold_ao.jpg',
     },
     properties: {
       metalness: 0.9,
       roughness: 0.1,
       borderWidth: 7,
     }
   },
   {
     id: 'slim-white',
     name: 'Slim White',
     thumbnail: '/thumbnails/frames/slim-white.jpg',
     modelPath: '/models/frames/slim.glb',
     textureSet: {
       colorMapUrl: '/textures/frames/white-paint/color.jpg',
       displacementMapUrl: '/textures/frames/white-paint/displacement.jpg',
       normalMapUrl: '/textures/frames/white-paint/normal.jpg',
       roughnessMapUrl: '/textures/frames/white-paint/roughness.jpg',
       aoMapUrl: '/textures/frames/white-paint/ao.jpg',
     },
     properties: {
       metalness: 0.05,
       roughness: 0.9,
       borderWidth: 3,
     }
   }
 ];
 
 export default frameOptions;