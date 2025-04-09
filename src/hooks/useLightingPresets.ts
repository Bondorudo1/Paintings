import { useState, useMemo, useCallback } from 'react';
import { Vector3 } from 'three';

// Define interface for light settings
interface LightSettings {
  position: [number, number, number];
  color: string;
  intensity: number;
  castShadow?: boolean;
  shadowRadius?: number;
}

// Define interface for ambient light settings
interface AmbientSettings {
  color: string;
  intensity: number;
}

// Define interface for complete preset
interface LightingPreset {
  keyLight: LightSettings;
  fillLight: LightSettings;
  rimLight: LightSettings;
  ambient: AmbientSettings;
  environment?: string;
  description: string;
}

// Define interface for light intensities
interface LightIntensities {
  key: number;
  fill: number;
  rim: number;
  ambient: number;
  environment?: number;
}

// Define catalog of presets
const LIGHTING_PRESETS: Record<string, LightingPreset> = {
  // Classic three-point studio lighting
  'studio': {
    keyLight: {
      position: [10, 10, 10],
      color: '#ffffff',
      intensity: 1.5,
      castShadow: true,
      shadowRadius: 8
    },
    fillLight: {
      position: [-10, 6, 4],
      color: '#e6e6ff', // Slightly blue fill
      intensity: 0.8,
      castShadow: false
    },
    rimLight: {
      position: [0, 8, -10],
      color: '#fffaf0', // Warm rim light
      intensity: 1.0,
      castShadow: false
    },
    ambient: {
      color: '#ffffff',
      intensity: 0.4
    },
    environment: 'studio',
    description: 'Classic three-point studio lighting with balanced illumination'
  },
  
  // Dramatic lighting with strong directional key
  'dramatic': {
    keyLight: {
      position: [15, 15, 5],
      color: '#fffcf0', // Warm key light
      intensity: 2.0,
      castShadow: true,
      shadowRadius: 10
    },
    fillLight: {
      position: [-5, 3, 8],
      color: '#d0d0ff', // Cool fill for contrast
      intensity: 0.3,
      castShadow: false
    },
    rimLight: {
      position: [-2, 8, -12],
      color: '#fff0e0', // Warm rim
      intensity: 1.5,
      castShadow: false
    },
    ambient: {
      color: '#202030', // Very dark blue ambient
      intensity: 0.2
    },
    environment: 'night',
    description: 'Dramatic lighting with strong shadows and contrast'
  },
  
  // Soft, diffused lighting
  'soft': {
    keyLight: {
      position: [8, 12, 8],
      color: '#fff8f0', // Slightly warm key
      intensity: 1.0,
      castShadow: true,
      shadowRadius: 15
    },
    fillLight: {
      position: [-8, 8, 2],
      color: '#f0f8ff', // Slightly cool fill
      intensity: 0.7,
      castShadow: false
    },
    rimLight: {
      position: [0, 5, -8],
      color: '#fff5f0', // Subtle rim
      intensity: 0.5,
      castShadow: false
    },
    ambient: {
      color: '#ffffff',
      intensity: 0.6
    },
    environment: 'sunset',
    description: 'Soft, diffused lighting with gentle shadows'
  },
  
  // Morning light
  'morning': {
    keyLight: {
      position: [10, 8, 5],
      color: '#fff2e0', // Warm morning sun
      intensity: 1.2,
      castShadow: true,
      shadowRadius: 12
    },
    fillLight: {
      position: [-6, 4, 3],
      color: '#e0f0ff', // Blue sky fill
      intensity: 0.6,
      castShadow: false
    },
    rimLight: {
      position: [-4, 10, -8],
      color: '#ffeecc', // Subtle golden rim
      intensity: 0.8,
      castShadow: false
    },
    ambient: {
      color: '#e6f0ff', // Subtle blue ambient
      intensity: 0.5
    },
    environment: 'dawn',
    description: 'Fresh morning lighting with warm sun and blue sky'
  },
  
  // Museum/Gallery lighting
  'gallery': {
    keyLight: {
      position: [0, 15, 5],
      color: '#fff9ed', // Warm gallery spots
      intensity: 1.0,
      castShadow: true,
      shadowRadius: 5
    },
    fillLight: {
      position: [10, 10, 10],
      color: '#fff9ed', // Matching color
      intensity: 0.6,
      castShadow: false
    },
    rimLight: {
      position: [-10, 10, -5],
      color: '#fff9ed', // Matching color
      intensity: 0.6,
      castShadow: false
    },
    ambient: {
      color: '#fffaf5', // Warm ambient
      intensity: 0.5
    },
    environment: 'warehouse',
    description: 'Museum/gallery lighting optimized for artwork display'
  },
  
  // North window light - painter's favorite
  'north-window': {
    keyLight: {
      position: [0, 15, 10],
      color: '#f5f9ff', // Cool north light
      intensity: 1.3,
      castShadow: true,
      shadowRadius: 12
    },
    fillLight: {
      position: [-8, 5, 0],
      color: '#f5f9ff', // Matching color
      intensity: 0.7,
      castShadow: false
    },
    rimLight: {
      position: [8, 5, -5],
      color: '#fffbf0', // Slightly warmer bounce
      intensity: 0.3,
      castShadow: false
    },
    ambient: {
      color: '#f8f8f8', // Neutral ambient
      intensity: 0.5
    },
    environment: 'city',
    description: 'North window light - ideal for artists and painters'
  }
};

/**
 * Custom hook to manage lighting presets for realistic lighting
 * 
 * @param initialPreset - The name of the initial preset to use
 * @returns Object with active preset, all presets, intensity values, and setter functions
 */
export function useLightingPresets(initialPreset = 'studio') {
  // Store the current preset name
  const [activePresetName, setActivePresetName] = useState(
    Object.keys(LIGHTING_PRESETS).includes(initialPreset) ? initialPreset : 'studio'
  );
  
  // Store custom intensity values
  const [intensities, setIntensities] = useState<LightIntensities>(() => {
    const preset = LIGHTING_PRESETS[activePresetName];
    return {
      key: preset.keyLight.intensity,
      fill: preset.fillLight.intensity,
      rim: preset.rimLight.intensity,
      ambient: preset.ambient.intensity,
      environment: 1.0
    };
  });
  
  // Get the active preset
  const activePreset = useMemo(() => {
    return LIGHTING_PRESETS[activePresetName];
  }, [activePresetName]);
  
  // Function to set a specific light's intensity
  const setLightIntensity = useCallback((light: keyof LightIntensities, value: number) => {
    setIntensities(prev => ({
      ...prev,
      [light]: value
    }));
  }, []);
  
  // Function to change the active preset
  const changePreset = useCallback((presetName: string) => {
    if (Object.keys(LIGHTING_PRESETS).includes(presetName)) {
      const preset = LIGHTING_PRESETS[presetName];
      
      // Update the preset name
      setActivePresetName(presetName);
      
      // Update intensities to match the new preset
      setIntensities({
        key: preset.keyLight.intensity,
        fill: preset.fillLight.intensity,
        rim: preset.rimLight.intensity,
        ambient: preset.ambient.intensity,
        environment: intensities.environment // Keep current environment intensity
      });
    }
  }, [intensities.environment]);
  
  // Return everything needed to control lighting
  return {
    activePreset,
    presets: LIGHTING_PRESETS,
    presetNames: Object.keys(LIGHTING_PRESETS),
    intensities,
    setLightIntensity,
    changePreset,
    activePresetName
  };
}