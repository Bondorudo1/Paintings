// src/data/backgroundOptions.ts

export interface BackgroundOption {
  id: string;
  name: string;
  thumbnail: string;
  textureSet: {
    colorMapUrl: string;
    displacementMapUrl: string;
    normalMapUrl: string;
    roughnessMapUrl: string;
    aoMapUrl?: string;
  };
  properties: {
    displacementScale: number;
    metalness: number;
    roughness: number;
  };
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'fabric-beige',
    name: 'Fabric Beige',
    thumbnail: '/thumbnails/backgrounds/fabric-beige.jpg',
    textureSet: {
      colorMapUrl: './textures/fabric/Fabric060_1K-JPG_Color.jpg',
      displacementMapUrl: './textures/fabric/Fabric060_1K-JPG_Displacement.jpg',
      normalMapUrl: './textures/fabric/Fabric060_1K-JPG_NormalGL.jpg',
      roughnessMapUrl: './textures/fabric/Fabric060_1K-JPG_Roughness.jpg',
      aoMapUrl: './textures/fabric/Fabric060_1K-JPG_AmbientOcclusion.jpg',
    },
    properties: {
      displacementScale: 0.05,
      metalness: 0,
      roughness: 1,
    }
  },
  {
    id: 'marble-white',
    name: 'Marble White',
    thumbnail: '/thumbnails/backgrounds/Marble020.png',
    textureSet: {
      colorMapUrl: './textures/marble/Marble020_2K-JPG_Color.jpg',
      displacementMapUrl: './textures/marble/Marble020_2K-JPG_Displacement.jpg',
      normalMapUrl: './textures/marble/Marble020_2K-JPG_NormalGL.jpg',
      roughnessMapUrl: './textures/marble/Marble020_2K-JPG_Roughness.jpg'
    },
    properties: {
      displacementScale: 0.02,
      metalness: 0.1,
      roughness: 0.8,
    }
  },
  {
    id: 'marble-dark',
    name: 'Dark Marble',
    thumbnail: '/thumbnails/backgrounds/marble-dark.jpg',
    textureSet: {
      colorMapUrl: './textures/marble1/Marble023_2K-JPG_Color.jpg',
      displacementMapUrl: './textures/marble1/Marble023_2K-JPG_Displacement.jpg',
      normalMapUrl: './textures/marble1/Marble023_2K-JPG_NormalGL.jpg',
      roughnessMapUrl: './textures/marble1/Marble023_2K-JPG_Roughness.jpg'
      // No AO map is specified in the material
    },
    properties: {
      displacementScale: 0.02,
      metalness: 0, // Slightly higher metalness for the reflective qualities seen in the image
      roughness: 1, // Lower roughness for the polished, shiny look
    }
  },
  {
    id: 'plastic-black',
    name: 'Black Plastic',
    thumbnail: '/thumbnails/backgrounds/plastic-black.jpg',
    textureSet: {
      colorMapUrl: './textures/plastic/Plastic006_2K-JPG_Color.jpg',
      displacementMapUrl: './textures/plastic/Plastic006_2K-JPG_Displacement.jpg',
      normalMapUrl: './textures/plastic/Plastic006_2K-JPG_NormalGL.jpg',
      roughnessMapUrl: './textures/plastic/Plastic006_2K-JPG_Roughness.jpg',
    },
    properties: {
      displacementScale: 0.03,
      metalness: 0.1,
      roughness: 0.7,
    }
  },
  {
    id: 'concrete',
    name: 'Concrete',
    thumbnail: '/thumbnails/backgrounds/concrete.jpg',
    textureSet: {
      colorMapUrl: './textures/concrete/concrete_color.jpg',
      displacementMapUrl: './textures/concrete/concrete_displacement.jpg',
      normalMapUrl: './textures/concrete/concrete_normal.jpg',
      roughnessMapUrl: './textures/concrete/concrete_roughness.jpg',
      aoMapUrl: './textures/concrete/concrete_ao.jpg',
    },
    properties: {
      displacementScale: 0.1,
      metalness: 0.05,
      roughness: 0.95,
    }
  },
  {
    id: 'marble',
    name: 'Marble',
    thumbnail: '/thumbnails/backgrounds/marble.jpg',
    textureSet: {
      colorMapUrl: './textures/marble/marble_color.jpg',
      displacementMapUrl: './textures/marble/marble_displacement.jpg',
      normalMapUrl: './textures/marble/marble_normal.jpg',
      roughnessMapUrl: './textures/marble/marble_roughness.jpg',
      aoMapUrl: './textures/marble/marble_ao.jpg',
    },
    properties: {
      displacementScale: 0.01,
      metalness: 0.2,
      roughness: 0.3,
    }
  }
];

export default backgroundOptions;