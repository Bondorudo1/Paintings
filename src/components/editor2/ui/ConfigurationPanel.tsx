// src/components/ui/ConfigurationPanel.tsx

import { useState } from "react";

import defaultSettings from "../../../data/defaultSettings";
import { useEditorState } from "../../../hooks/useEditorState";

interface ConfigurationPanelProps {
  isOpen: boolean;
}

export default function ConfigurationPanel({
  isOpen,
}: ConfigurationPanelProps) {
  const { state, dispatch } = useEditorState();
  const [activeSection, setActiveSection] = useState<'dimensions' | 'lighting' | 'view' | 'background'>('dimensions');
  // Handler for dimension changes
  const handleDimensionChange = (
    dimension: "width" | "height",
    value: number
  ) => {
    const { minWidth, minHeight, maxWidth, maxHeight } =
      defaultSettings.dimensions;

    // Validate within min/max range
    let validatedValue = value;
    if (dimension === "width") {
      validatedValue = Math.min(Math.max(value, minWidth), maxWidth);
    } else {
      validatedValue = Math.min(Math.max(value, minHeight), maxHeight);
    }

    dispatch({
      type: "SET_DIMENSIONS",
      width: dimension === "width" ? validatedValue : state.dimensions.width,
      height: dimension === "height" ? validatedValue : state.dimensions.height,
    });
  };

  // Handler for lighting changes
  const handleLightingChange = (
    lightType: keyof typeof state.lighting,
    value: number
  ) => {
    dispatch({
      type: "SET_LIGHTING",
      settings: { [lightType]: value },
    });
  };

  const handleBackgroundSizeChange = (
    dimension: "width" | "height" | "depth",
    value: number
  ) => {
    const { minSize, maxSize } = defaultSettings.background;
    const validatedValue = Math.min(Math.max(value, minSize), maxSize);

    dispatch({
      type: "SET_BACKGROUND_SIZE",
      width: dimension === "width" ? validatedValue : state.background.width,
      height: dimension === "height" ? validatedValue : state.background.height,
      depth: dimension === "depth" ? validatedValue : state.background.depth,
    });
  };

  const handleTextureRepeatChange = (value: number) => {
    const { minTextureRepeat, maxTextureRepeat } = defaultSettings.background;
    const validatedValue = Math.min(
      Math.max(value, minTextureRepeat),
      maxTextureRepeat
    );

    dispatch({
      type: "SET_TEXTURE_REPEAT",
      repeat: validatedValue,
    });
  };

  // Toggle helpers visibility
  const toggleHelpers = () => {
    dispatch({ type: "TOGGLE_HELPERS" });
  };

  // Toggle performance monitor
  const togglePerf = () => {
    dispatch({ type: "TOGGLE_PERF" });
  };

  return (
    <div
      className={`w-80 bg-white border-l border-gray-200 h-full transition-all duration-300 overflow-hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Configuration</h2>

        {/* Navigation Tabs */}
        <div className="flex mt-4 border-b border-gray-200">
          <button
            onClick={() => setActiveSection("dimensions")}
            className={`flex-1 py-2 text-center ${
              activeSection === "dimensions"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            Size
          </button>
          <button
            onClick={() => setActiveSection("lighting")}
            className={`flex-1 py-2 text-center ${
              activeSection === "lighting"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            Lighting
          </button>
          <button
            onClick={() => setActiveSection("view")}
            className={`flex-1 py-2 text-center ${
              activeSection === "view"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            View
          </button>
          <button
            onClick={() => setActiveSection("background")}
            className={`flex-1 py-2 text-center ${
              activeSection === "background"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            Background
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Dimensions Section */}
        {activeSection === "dimensions" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width: {state.dimensions.width} cm
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">
                  {defaultSettings.dimensions.minWidth}
                </span>
                <input
                  type="range"
                  min={defaultSettings.dimensions.minWidth}
                  max={defaultSettings.dimensions.maxWidth}
                  step={0.5}
                  value={state.dimensions.width}
                  onChange={(e) =>
                    handleDimensionChange("width", parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-xs text-gray-500">
                  {defaultSettings.dimensions.maxWidth}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height: {state.dimensions.height} cm
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">
                  {defaultSettings.dimensions.minHeight}
                </span>
                <input
                  type="range"
                  min={defaultSettings.dimensions.minHeight}
                  max={defaultSettings.dimensions.maxHeight}
                  step={0.5}
                  value={state.dimensions.height}
                  onChange={(e) =>
                    handleDimensionChange("height", parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-xs text-gray-500">
                  {defaultSettings.dimensions.maxHeight}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Preset Sizes
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    dispatch({ type: "SET_DIMENSIONS", width: 30, height: 40 });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  30 × 40 cm
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "SET_DIMENSIONS", width: 40, height: 60 });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  40 × 60 cm
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "SET_DIMENSIONS", width: 50, height: 70 });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  50 × 70 cm
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "SET_DIMENSIONS", width: 60, height: 80 });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  60 × 80 cm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lighting Section */}
        {activeSection === "lighting" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Light: {state.lighting.keyIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={state.lighting.keyIntensity}
                onChange={(e) =>
                  handleLightingChange(
                    "keyIntensity",
                    parseFloat(e.target.value)
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fill Light: {state.lighting.fillIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={state.lighting.fillIntensity}
                onChange={(e) =>
                  handleLightingChange(
                    "fillIntensity",
                    parseFloat(e.target.value)
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rim Light: {state.lighting.rimIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={state.lighting.rimIntensity}
                onChange={(e) =>
                  handleLightingChange(
                    "rimIntensity",
                    parseFloat(e.target.value)
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ambient Light: {state.lighting.ambientIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={state.lighting.ambientIntensity}
                onChange={(e) =>
                  handleLightingChange(
                    "ambientIntensity",
                    parseFloat(e.target.value)
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Lighting Presets
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_LIGHTING",
                      settings: {
                        keyIntensity: 1.5,
                        fillIntensity: 0.7,
                        rimIntensity: 1.0,
                        ambientIntensity: 0.5,
                      },
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Balanced
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_LIGHTING",
                      settings: {
                        keyIntensity: 2.5,
                        fillIntensity: 0.3,
                        rimIntensity: 1.5,
                        ambientIntensity: 0.2,
                      },
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Dramatic
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_LIGHTING",
                      settings: {
                        keyIntensity: 1.0,
                        fillIntensity: 1.0,
                        rimIntensity: 0.5,
                        ambientIntensity: 1.0,
                      },
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Soft
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_LIGHTING",
                      settings: {
                        keyIntensity: 2.0,
                        fillIntensity: 0.0,
                        rimIntensity: 2.0,
                        ambientIntensity: 0.3,
                      },
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  High Contrast
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Settings */}
        {activeSection === "view" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Show Helpers
              </label>
              <div
                className={`w-12 h-6 rounded-full flex items-center ${
                  state.ui.showHelpers
                    ? "bg-blue-600 justify-end"
                    : "bg-gray-300 justify-start"
                } cursor-pointer transition-colors`}
                onClick={toggleHelpers}
              >
                <div className="w-5 h-5 bg-white rounded-full m-0.5"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Performance Monitor
              </label>
              <div
                className={`w-12 h-6 rounded-full flex items-center ${
                  state.ui.showPerf
                    ? "bg-blue-600 justify-end"
                    : "bg-gray-300 justify-start"
                } cursor-pointer transition-colors`}
                onClick={togglePerf}
              >
                <div className="w-5 h-5 bg-white rounded-full m-0.5"></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Camera Views
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200">
                  Front View
                </button>
                <button className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200">
                  Side View
                </button>
                <button className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200">
                  Angle View
                </button>
                <button className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200">
                  Close-up
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Background Section */}
        {activeSection === "background" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width: {state.background.width} units
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">
                  {defaultSettings.background.minSize}
                </span>
                <input
                  type="range"
                  min={defaultSettings.background.minSize}
                  max={defaultSettings.background.maxSize}
                  step={5}
                  value={state.background.width}
                  onChange={(e) =>
                    handleBackgroundSizeChange("width", parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-xs text-gray-500">
                  {defaultSettings.background.maxSize}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height: {state.background.height} units
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">
                  {defaultSettings.background.minSize}
                </span>
                <input
                  type="range"
                  min={defaultSettings.background.minSize}
                  max={defaultSettings.background.maxSize}
                  step={5}
                  value={state.background.height}
                  onChange={(e) =>
                    handleBackgroundSizeChange("height", parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-xs text-gray-500">
                  {defaultSettings.background.maxSize}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Depth: {state.background.depth} units
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">1</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={state.background.depth}
                  onChange={(e) =>
                    handleBackgroundSizeChange("depth", parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-xs text-gray-500">10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texture Density: {state.background.textureRepeat.toFixed(1)}
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-xs text-gray-500">
                  {defaultSettings.background.minTextureRepeat}
                </span>
                <input
                  type="range"
                  min={defaultSettings.background.minTextureRepeat}
                  max={defaultSettings.background.maxTextureRepeat}
                  step={0.5}
                  value={state.background.textureRepeat}
                  onChange={(e) => handleTextureRepeatChange(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-xs text-gray-500">
                  {defaultSettings.background.maxTextureRepeat}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Background Presets
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_BACKGROUND_SIZE",
                      width: 100,
                      height: 100,
                      depth: 2,
                    });
                    dispatch({
                      type: "SET_TEXTURE_REPEAT",
                      repeat: 10,
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Default
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_BACKGROUND_SIZE",
                      width: 150,
                      height: 150,
                      depth: 2,
                    });
                    dispatch({
                      type: "SET_TEXTURE_REPEAT",
                      repeat: 15,
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Large
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_BACKGROUND_SIZE",
                      width: 80,
                      height: 80,
                      depth: 1,
                    });
                    dispatch({
                      type: "SET_TEXTURE_REPEAT",
                      repeat: 8,
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Small
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_BACKGROUND_SIZE",
                      width: 200,
                      height: 100,
                      depth: 3,
                    });
                    dispatch({
                      type: "SET_TEXTURE_REPEAT",
                      repeat: 12,
                    });
                  }}
                  className="py-2 px-3 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                >
                  Wide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <button
          onClick={() => {}} // You can add export functionality here
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Export Design
        </button>
      </div>
    </div>
  );
}