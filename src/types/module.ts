export type DataType = "number" | "color";

export interface Color {
  r: number;
  g: number;
  b: number;
}

export type ModuleValue = number | Color;

export interface ModuleInput {
  name: string;
  type: DataType;
  required?: boolean;
  default?: ModuleValue;
  // For parameter-like inputs (optional inputs that can be edited)
  min?: number;
  max?: number;
  step?: number;
}

export interface ModuleOutput {
  name: string;
  type: DataType;
}

// Helper type to infer output types from module definition
export type InferModuleOutputs<T extends ModuleDefinition> = {
  [K in T["outputs"][number]["name"]]: T["outputs"][number] extends {
    name: K;
    type: infer Type;
  }
    ? Type extends "number"
      ? number
      : Type extends "color"
      ? Color
      : never
    : never;
};

// Helper type to infer input types from module definition
export type InferModuleInputs<T extends ModuleDefinition> = {
  [K in T["inputs"][number]["name"]]: T["inputs"][number] extends {
    name: K;
    type: infer Type;
  }
    ? Type extends "number"
      ? number
      : Type extends "color"
      ? Color
      : never
    : never;
};

// Type guard functions
export function isNumber(value: ModuleValue | undefined): value is number {
  return typeof value === "number";
}

export function isColor(value: ModuleValue | undefined): value is Color {
  return (
    typeof value === "object" &&
    value !== null &&
    "r" in value &&
    "g" in value &&
    "b" in value
  );
}

export function validateInput(
  value: ModuleValue | undefined,
  type: DataType
): boolean {
  if (value === undefined) return false;
  switch (type) {
    case "number":
      return isNumber(value);
    case "color":
      return isColor(value);
    default:
      return false;
  }
}

// Helper type to ensure module inputs match their declared types
export type TypedModuleInputs<T extends { [key: string]: DataType }> = {
  [K in keyof T]: T[K] extends "number"
    ? number
    : T[K] extends "color"
    ? Color
    : never;
};

// Helper type for module calculation function
export type ModuleCalculator = (
  inputs: Record<string, ModuleValue>
) => Record<string, ModuleValue>;

export interface ModuleDefinition {
  id: string;
  type: string;
  name: string;
  inputs: ModuleInput[];
  outputs: ModuleOutput[];
  calculate: ModuleCalculator;
}

export interface ModuleInstance {
  id: string;
  definitionId: string;
  position: {
    x: number;
    y: number;
  };
  inputValues: Record<string, ModuleValue>; // Values for non-required inputs (formerly parameters)
}

export interface Connection {
  id: string;
  fromModuleId: string;
  fromOutputName: string;
  toModuleId: string;
  toInputName: string;
}
