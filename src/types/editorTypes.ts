// src/types/editorTypes.ts
import * as THREE from 'three';
// Frame types
export interface ModelProps {
   angles: number[];
   rotations: THREE.Euler[];
   positions: THREE.Vector3[];
   planeYPositions: number[];
   showHelpers?: boolean;
 }
 
 export interface FramesProps {
   boxHeight: number;
   boxWidth: number;
   frameWidth?: number;
   frameRabbet?: number;
   positionY?: number;
   showHelpers?: boolean;
   paintingImage?: string;
   frameType?: string;
 }
 
 export interface FrameCalculationParams {
   boxWidth: number;
   boxHeight: number;
   frameWidth: number;
   frameRabbet: number;
 }
 
 export interface FrameCalculationResult {
   positions: {
     left: THREE.Vector3;
     right: THREE.Vector3;
     top: THREE.Vector3;
     bottom: THREE.Vector3;
   };
   rotations: {
     left: THREE.Euler;
     right: THREE.Euler;
     top: THREE.Euler;
     bottom: THREE.Euler;
   };
   planeYPositions: {
     frame1: number[];
     frame2: number[];
   };
 }
 
 // Textures
 export interface TextureSet {
   colorMapUrl: string;
   displacementMapUrl: string;
   normalMapUrl: string;
   roughnessMapUrl: string;
   aoMapUrl: string;
 }
 
 export interface TextureProps {
   colorMapUrl: string;
   displacementMapUrl: string;
   normalMapUrl: string;
   roughnessMapUrl: string;
   aoMapUrl: string;
   displacementScale?: number;
   metalness?: number;
   roughness?: number;
 }
 
 // Canvas performance options
 export interface PerfOptions {
   matrixUpdate: boolean;
   fps: boolean;
   gl: boolean;
   memory: boolean;
   rendererOverview: boolean;
 }
 
 // Editor state
 export interface EditorState {
   dimensions: {
     width: number;
     height: number;
   };
   appearance: {
     frameId: string;
     backgroundId: string;
     paintingImage: string;
   };
   lighting: {
     keyIntensity: number;
     fillIntensity: number;
     rimIntensity: number;
     ambientIntensity: number;
   };
   ui: {
     activeTab: string;
     showHelpers: boolean;
     showPerf: boolean;
   };
   background: {
    width: number;
    height: number;
    depth: number;
    textureRepeat: number;
  };
 }
 
 // Editor actions
// At the bottom of your file, update the EditorAction type:

export type EditorAction =
   | { type: 'SET_DIMENSIONS'; width: number; height: number }
   | { type: 'SET_FRAME'; frameId: string }
   | { type: 'SET_BACKGROUND'; backgroundId: string }
   | { type: 'SET_PAINTING_IMAGE'; image: string }
   | { type: 'SET_LIGHTING'; settings: Partial<EditorState['lighting']> }
   | { type: 'SET_ACTIVE_TAB'; tab: string }
   | { type: 'TOGGLE_HELPERS' }
   | { type: 'TOGGLE_PERF' }
   | { type: 'SET_BACKGROUND_SIZE'; width: number; height: number; depth: number }
   | { type: 'SET_TEXTURE_REPEAT'; repeat: number };