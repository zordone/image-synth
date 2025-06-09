import type { ModuleDefinition, ModuleValue } from "../types/module";
import { isNumber, validateInput } from "../types/module";

// Helper to validate all required inputs
function validateRequiredInputs(
  inputs: Record<string, ModuleValue>,
  definition: ModuleDefinition
): boolean {
  return definition.inputs.every((input) => {
    if (!input.required) return true;
    const value = inputs[input.name];
    return value !== undefined && validateInput(value, input.type);
  });
}

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
  parameters: [
    { name: "Value", type: "number", min: -5, max: 5, step: 0.1, default: 0 },
  ],
  calculate: (_, params) => {
    if (!isNumber(params.Value)) {
      throw new Error("Invalid parameter value");
    }
    return { Value: params.Value };
  },
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
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, AddModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.A) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types");
    }
    return { Result: inputs.A + inputs.B };
  },
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
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, MultiplyModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.A) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types");
    }
    return { Result: inputs.A * inputs.B };
  },
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
  calculate: (inputs, params) => {
    if (!validateRequiredInputs(inputs, MixModule)) {
      throw new Error("Missing required inputs");
    }
    if (
      !isNumber(inputs.A) ||
      !isNumber(inputs.B) ||
      !isNumber(params.Factor)
    ) {
      throw new Error("Invalid input types or parameters");
    }
    return {
      Result: inputs.A * (1 - params.Factor) + inputs.B * params.Factor,
    };
  },
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
  calculate: (inputs, params) => {
    if (!validateRequiredInputs(inputs, ClampModule)) {
      throw new Error("Missing required inputs");
    }
    if (
      !isNumber(inputs.Value) ||
      !isNumber(params.Min) ||
      !isNumber(params.Max)
    ) {
      throw new Error("Invalid input types or parameters");
    }
    return { Result: Math.min(Math.max(inputs.Value, params.Min), params.Max) };
  },
};

export const RGBColorModule: ModuleDefinition = {
  id: "rgbcolor",
  type: "Color",
  name: "RGB Color",
  inputs: [
    { name: "R", type: "number", default: 0 },
    { name: "G", type: "number", default: 0 },
    { name: "B", type: "number", default: 0 },
  ],
  outputs: [{ name: "Color", type: "color" }],
  parameters: [],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, RGBColorModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.R) || !isNumber(inputs.G) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types");
    }
    return {
      Color: {
        r: Math.max(0, Math.min(1, inputs.R)),
        g: Math.max(0, Math.min(1, inputs.G)),
        b: Math.max(0, Math.min(1, inputs.B)),
      },
    };
  },
};

export const OutputModule: ModuleDefinition = {
  id: "output",
  type: "Output",
  name: "Output",
  inputs: [{ name: "Image", type: "color", required: true }],
  outputs: [], // No outputs since this is the final destination
  parameters: [],
  calculate: () => ({}), // No outputs to calculate
};

export const DivideModule: ModuleDefinition = {
  id: "divide",
  type: "Math",
  name: "Divide",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", required: true },
  ],
  outputs: [
    { name: "Quotient", type: "number" },
    { name: "Whole", type: "number" },
    { name: "Remainder", type: "number" },
  ],
  parameters: [],
  calculate: (inputs) => {
    // Validate inputs
    if (!validateRequiredInputs(inputs, DivideModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.A) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types");
    }
    if (inputs.B === 0) {
      return {
        Quotient: 0,
        Whole: 0,
        Remainder: 0,
      };
    }

    const quotient = inputs.A / inputs.B;
    const whole = Math.floor(quotient);
    const remainder = inputs.A - whole * inputs.B;

    return {
      Quotient: quotient,
      Whole: whole,
      Remainder: remainder,
    };
  },
};

export const moduleRegistry: ModuleDefinition[] = [
  CoordinateModule,
  NumberModule,
  AddModule,
  MultiplyModule,
  DivideModule,
  MixModule,
  ClampModule,
  RGBColorModule,
  OutputModule,
];
