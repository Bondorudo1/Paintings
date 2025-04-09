// src/hooks/useEditorState.tsx

import React, { useReducer, createContext, useContext, ReactNode } from "react";
import { EditorState, EditorAction } from "../types/editorTypes";
import defaultSettings from "../data/defaultSettings";

// Initial state based on default settings
const initialEditorState: EditorState = {
  dimensions: {
    width: defaultSettings.dimensions.width,
    height: defaultSettings.dimensions.height,
  },
  appearance: {
    frameId: defaultSettings.defaultFrameId,
    backgroundId: defaultSettings.defaultBackgroundId,
    paintingImage: defaultSettings.defaultImage,
  },
  lighting: {
    keyIntensity: defaultSettings.lighting.keyIntensity,
    fillIntensity: defaultSettings.lighting.fillIntensity,
    rimIntensity: defaultSettings.lighting.rimIntensity,
    ambientIntensity: defaultSettings.lighting.ambientIntensity,
  },
  ui: {
    activeTab: "frames",
    showHelpers: defaultSettings.displayHelpers,
    showPerf: false,
  },
  background: {
    width: defaultSettings.background.width,
    height: defaultSettings.background.height,
    depth: defaultSettings.background.depth,
    textureRepeat: defaultSettings.background.textureRepeat,
  }
};

// Reducer function to handle all editor state changes
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "SET_DIMENSIONS":
      return {
        ...state,
        dimensions: {
          width: action.width,
          height: action.height,
        },
      };

    case "SET_FRAME":
      return {
        ...state,
        appearance: {
          ...state.appearance,
          frameId: action.frameId,
        },
      };

    case "SET_BACKGROUND":
      return {
        ...state,
        appearance: {
          ...state.appearance,
          backgroundId: action.backgroundId,
        },
      };

    case "SET_PAINTING_IMAGE":
      return {
        ...state,
        appearance: {
          ...state.appearance,
          paintingImage: action.image,
        },
      };

    case "SET_LIGHTING":
      return {
        ...state,
        lighting: {
          ...state.lighting,
          ...action.settings,
        },
      };

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        ui: {
          ...state.ui,
          activeTab: action.tab,
        },
      };

    case "TOGGLE_HELPERS":
      return {
        ...state,
        ui: {
          ...state.ui,
          showHelpers: !state.ui.showHelpers,
        },
      };

    case "TOGGLE_PERF":
      return {
        ...state,
        ui: {
          ...state.ui,
          showPerf: !state.ui.showPerf,
        },
      };
    case "SET_BACKGROUND_SIZE":
      return {
        ...state,
        background: {
          ...state.background,
          width: action.width,
          height: action.height,
          depth: action.depth,
        },
      };

    case "SET_TEXTURE_REPEAT":
      return {
        ...state,
        background: {
          ...state.background,
          textureRepeat: action.repeat,
        },
      };

    default:
      return state;
  }
}

// Define the context type
type EditorStateContextType = {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
};

// Create the context with a default value (null)
export const EditorStateContext = createContext<EditorStateContextType | null>(
  null
);

// Hook to use editor state in components
export function useEditorState() {
  const context = useContext(EditorStateContext);

  if (!context) {
    throw new Error(
      "useEditorState must be used within an EditorStateProvider"
    );
  }

  return context;
}

// Provider component
interface EditorStateProviderProps {
  children: ReactNode;
}

export function EditorStateProvider({ children }: EditorStateProviderProps) {
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);

  return (
    <EditorStateContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorStateContext.Provider>
  );
}
