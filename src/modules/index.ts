import type { ModuleDefinition, ModuleValue } from "../types/module";
import { isColor, isNumber, validateInput } from "../types/module";

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

function limit(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function mix(value1: number, value2: number, factor: number): number {
  factor = limit(factor, 0, 1);
  return value1 * (1 - factor) + value2 * factor;
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
  calculate: () => {
    // This will be handled by the canvas renderer
    return {};
  },
};

export const NumberModule: ModuleDefinition = {
  id: "number",
  type: "Input",
  name: "Number",
  inputs: [
    {
      name: "Number",
      type: "number",
      min: -10,
      max: 10,
      step: 0.05,
      default: 0,
    },
  ],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!isNumber(inputs.Number)) {
      throw new Error("Invalid parameter value");
    }
    return { Result: inputs.Number };
  },
};

export const AddModule: ModuleDefinition = {
  id: "add",
  type: "Math",
  name: "Add",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", default: 0 },
  ],
  outputs: [{ name: "Result", type: "number" }],
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

export const SubtractModule: ModuleDefinition = {
  id: "subtract",
  type: "Math",
  name: "Subtract",
  inputs: [
    { name: "A", type: "number", default: 0 },
    { name: "B", type: "number", default: 0 },
  ],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, SubtractModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.A) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types");
    }
    return { Result: inputs.A - inputs.B };
  },
};

export const MultiplyModule: ModuleDefinition = {
  id: "multiply",
  type: "Math",
  name: "Multiply",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", default: 1 },
  ],
  outputs: [{ name: "Result", type: "number" }],
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

export const DivideModule: ModuleDefinition = {
  id: "divide",
  type: "Math",
  name: "Divide",
  inputs: [
    { name: "A", type: "number", default: 1 },
    { name: "B", type: "number", default: 1 },
  ],
  outputs: [
    { name: "Quotient", type: "number" },
    { name: "Whole", type: "number" },
    { name: "Remainder", type: "number" },
  ],
  calculate: (inputs) => {
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

export const AbsoluteModule: ModuleDefinition = {
  id: "absolute",
  type: "Math",
  name: "Absolute",
  inputs: [{ name: "A", type: "number", required: true }],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, AbsoluteModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.A)) {
      throw new Error("Invalid input types or parameters");
    }
    return {
      Result: Math.abs(inputs.A),
    };
  },
};

export const MinimumModule: ModuleDefinition = {
  id: "minimum",
  type: "Math",
  name: "Minimum",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", default: 0 },
  ],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, MinimumModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.A) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types or parameters");
    }
    return {
      Result: Math.min(inputs.A, inputs.B),
    };
  },
};

export const MaximumModule: ModuleDefinition = {
  id: "maximum",
  type: "Math",
  name: "Maximum",
  inputs: [
    { name: "A", type: "number", required: true },
    { name: "B", type: "number", default: 0 },
  ],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, MaximumModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.A) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types or parameters");
    }
    return {
      Result: Math.max(inputs.A, inputs.B),
    };
  },
};

export const MixModule: ModuleDefinition = {
  id: "mix",
  type: "Math",
  name: "Mix",
  inputs: [
    { name: "A", type: "number", default: 0 },
    { name: "B", type: "number", default: 0 },
    { name: "Factor", type: "number", min: 0, max: 1, default: 0.5 },
  ],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, MixModule)) {
      throw new Error("Missing required inputs");
    }
    if (
      !isNumber(inputs.A) ||
      !isNumber(inputs.B) ||
      !isNumber(inputs.Factor)
    ) {
      throw new Error("Invalid input types or parameters");
    }
    const factor = Math.max(0, Math.min(1, inputs.Factor));
    return {
      Result: mix(inputs.A, inputs.B, factor),
    };
  },
};

export const ClampModule: ModuleDefinition = {
  id: "clamp",
  type: "Math",
  name: "Clamp",
  inputs: [
    { name: "Value", type: "number", required: true },
    { name: "Min", type: "number", default: 0, min: 0, max: 1, step: 0.05 },
    { name: "Max", type: "number", default: 1, min: 0, max: 1, step: 0.05 },
  ],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, ClampModule)) {
      throw new Error("Missing required inputs");
    }
    if (
      !isNumber(inputs.Value) ||
      !isNumber(inputs.Min) ||
      !isNumber(inputs.Max)
    ) {
      throw new Error("Invalid input types or parameters");
    }
    return {
      Result: limit(inputs.Value, inputs.Min, inputs.Max),
    };
  },
};

export const ClipModule: ModuleDefinition = {
  id: "clip",
  type: "Math",
  name: "Clip",
  inputs: [
    { name: "Value", type: "number", required: true },
    {
      name: "Threshold",
      type: "number",
      default: 0.5,
      min: -10,
      max: 10,
      step: 0.01,
    },
  ],
  outputs: [{ name: "Result", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, ClipModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.Value) || !isNumber(inputs.Threshold)) {
      throw new Error("Invalid input types or parameters");
    }
    return { Result: inputs.Value >= inputs.Threshold ? 1 : 0 };
  },
};

export const RGBColorModule: ModuleDefinition = {
  id: "rgbcolor",
  type: "Color",
  name: "RGB Color",
  inputs: [
    { name: "R", type: "number", default: 0, min: 0, max: 1, step: 0.05 },
    { name: "G", type: "number", default: 0, min: 0, max: 1, step: 0.05 },
    { name: "B", type: "number", default: 0, min: 0, max: 1, step: 0.05 },
  ],
  outputs: [{ name: "Color", type: "color" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, RGBColorModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.R) || !isNumber(inputs.G) || !isNumber(inputs.B)) {
      throw new Error("Invalid input types");
    }
    return {
      Color: {
        r: limit(inputs.R, 0, 1),
        g: limit(inputs.G, 0, 1),
        b: limit(inputs.B, 0, 1),
      },
    };
  },
};

export const ColorMixModule: ModuleDefinition = {
  id: "colormix",
  type: "Color",
  name: "Color Mix",
  inputs: [
    { name: "Color1", type: "color", required: true },
    { name: "Color2", type: "color", required: true },
    {
      name: "Factor",
      type: "number",
      min: 0,
      max: 1,
      default: 0.5,
      step: 0.05,
    },
  ],
  outputs: [{ name: "Color", type: "color" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, ColorMixModule)) {
      throw new Error("Missing required inputs");
    }
    if (
      !isNumber(inputs.Factor) ||
      !isColor(inputs.Color1) ||
      !isColor(inputs.Color2)
    ) {
      throw new Error("Invalid input types");
    }
    return {
      Color: {
        r: mix(inputs.Color1.r, inputs.Color2.r, inputs.Factor),
        g: mix(inputs.Color1.g, inputs.Color2.g, inputs.Factor),
        b: mix(inputs.Color1.b, inputs.Color2.b, inputs.Factor),
      },
    };
  },
};

export const LengthModule: ModuleDefinition = {
  id: "length",
  type: "Math",
  name: "Length",
  inputs: [
    { name: "X1", type: "number", default: 0 },
    { name: "Y1", type: "number", default: 0 },
    { name: "X2", type: "number", default: 0 },
    { name: "Y2", type: "number", default: 0 },
  ],
  outputs: [{ name: "Length", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, LengthModule)) {
      throw new Error("Missing required inputs");
    }
    if (
      !isNumber(inputs.X1) ||
      !isNumber(inputs.Y1) ||
      !isNumber(inputs.X2) ||
      !isNumber(inputs.Y2)
    ) {
      throw new Error("Invalid input types");
    }
    const dx = inputs.X2 - inputs.X1;
    const dy = inputs.Y2 - inputs.Y1;
    return { Length: Math.sqrt(dx * dx + dy * dy) };
  },
};

export const AngleModule: ModuleDefinition = {
  id: "angle",
  type: "Math",
  name: "Angle",
  inputs: [
    { name: "X1", type: "number", default: 0 },
    { name: "Y1", type: "number", default: 0 },
    { name: "X2", type: "number", default: 0 },
    { name: "Y2", type: "number", default: 0 },
  ],
  outputs: [{ name: "Angle", type: "number" }],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, AngleModule)) {
      throw new Error("Missing required inputs");
    }
    if (
      !isNumber(inputs.X1) ||
      !isNumber(inputs.Y1) ||
      !isNumber(inputs.X2) ||
      !isNumber(inputs.Y2)
    ) {
      throw new Error("Invalid input types");
    }
    const dx = inputs.X2 - inputs.X1;
    const dy = inputs.Y2 - inputs.Y1;
    return { Angle: Math.atan2(dy, dx) };
  },
};

export const TrigonometryModule: ModuleDefinition = {
  id: "trigonometry",
  type: "Math",
  name: "Trigonometry",
  inputs: [{ name: "Angle", type: "number", required: true }],
  outputs: [
    { name: "Sin", type: "number" },
    { name: "Cos", type: "number" },
    { name: "Tan", type: "number" },
  ],
  calculate: (inputs) => {
    if (!validateRequiredInputs(inputs, TrigonometryModule)) {
      throw new Error("Missing required inputs");
    }
    if (!isNumber(inputs.Angle)) {
      throw new Error("Invalid input type");
    }
    return {
      Sin: Math.sin(inputs.Angle),
      Cos: Math.cos(inputs.Angle),
      Tan: Math.tan(inputs.Angle),
    };
  },
};

export const OutputModule: ModuleDefinition = {
  id: "output",
  type: "Output",
  name: "Output",
  inputs: [{ name: "Image", type: "color", required: true }],
  outputs: [], // No outputs since this is the final destination
  calculate: () => ({}), // No outputs to calculate
};

export const moduleRegistry: ModuleDefinition[] = [
  CoordinateModule,
  NumberModule,
  AddModule,
  SubtractModule,
  MultiplyModule,
  DivideModule,
  AbsoluteModule,
  MinimumModule,
  MaximumModule,
  MixModule,
  ClampModule,
  ClipModule,
  LengthModule,
  AngleModule,
  TrigonometryModule,
  RGBColorModule,
  ColorMixModule,
  OutputModule,
];
