import type { ModuleDefinition } from "../types/module";

export const CoordinateModule: ModuleDefinition = {
  id: "coordinate",
  type: "Input",
  name: "Coordinates",
  inputs: [],
  outputs: [
    { name: "X", type: "number" },
    { name: "Y", type: "number" },
  ],
  parameters: [],
  calculate: () => {
    // This will be handled by the canvas renderer
    return {};
  },
};

export const NumberModule: ModuleDefinition = {
  id: "number",
  type: "Input",
  name: "Number",
  inputs: [],
  outputs: [{ name: "Value", type: "number" }],
  parameters: [{ name: "Value", type: "number", default: 0 }],
  calculate: (_, params) => ({
    Value: params.Value,
  }),
};

export const AddModule: ModuleDefinition = {
  id: "add",
  type: "Math",
  name: "Add",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", required: true },
  ],
  outputs: [{ name: "Result", type: "number" }],
  parameters: [],
  calculate: (inputs) => ({
    Result: inputs.A + inputs.B,
  }),
};

export const MultiplyModule: ModuleDefinition = {
  id: "multiply",
  type: "Math",
  name: "Multiply",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", required: true },
  ],
  outputs: [{ name: "Result", type: "number" }],
  parameters: [],
  calculate: (inputs) => ({
    Result: inputs.A * inputs.B,
  }),
};

export const MixModule: ModuleDefinition = {
  id: "mix",
  type: "Math",
  name: "Mix",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", required: true },
  ],
  outputs: [{ name: "Result", type: "number" }],
  parameters: [
    { name: "Factor", type: "number", min: 0, max: 1, default: 0.5 },
  ],
  calculate: (inputs, params) => ({
    Result: inputs.A * (1 - params.Factor) + inputs.B * params.Factor,
  }),
};

export const ClampModule: ModuleDefinition = {
  id: "clamp",
  type: "Math",
  name: "Clamp",
  inputs: [{ name: "Value", type: "number", required: true }],
  outputs: [{ name: "Result", type: "number" }],
  parameters: [
    { name: "Min", type: "number", default: 0 },
    { name: "Max", type: "number", default: 1 },
  ],
  calculate: (inputs, params) => ({
    Result: Math.min(Math.max(inputs.Value, params.Min), params.Max),
  }),
};

export const RGBColorModule: ModuleDefinition = {
  id: "rgbcolor",
  type: "Color",
  name: "RGB Color",
  inputs: [
    { name: "R", type: "number", required: true },
    { name: "G", type: "number", required: true },
    { name: "B", type: "number", required: true },
  ],
  outputs: [{ name: "Color", type: "color" }],
  parameters: [],
  calculate: (inputs) => ({
    Color: {
      r: Math.max(0, Math.min(1, inputs.R as number)),
      g: Math.max(0, Math.min(1, inputs.G as number)),
      b: Math.max(0, Math.min(1, inputs.B as number)),
    },
  }),
};

export const moduleRegistry: ModuleDefinition[] = [
  CoordinateModule,
  NumberModule,
  AddModule,
  MultiplyModule,
  MixModule,
  ClampModule,
  RGBColorModule,
];
