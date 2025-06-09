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
  required: boolean;
  default?: ModuleValue;
}

export interface ModuleOutput {
  name: string;
  type: DataType;
}

export interface ModuleParameter {
  name: string;
  type: DataType;
  min?: number;
  max?: number;
  default?: ModuleValue;
}

export type TypedInputs<T extends Record<string, DataType>> = {
  [K in keyof T]: T[K] extends "number"
    ? number
    : T[K] extends "color"
    ? Color
    : never;
};

export type TypedOutputs<T extends Record<string, DataType>> = {
  [K in keyof T]: T[K] extends "number"
    ? number
    : T[K] extends "color"
    ? Color
    : never;
};

export interface ModuleDefinition {
  id: string;
  type: string;
  name: string;
  inputs: ModuleInput[];
  outputs: ModuleOutput[];
  parameters: ModuleParameter[];
  calculate: (
    inputs: Record<string, ModuleValue>,
    parameters: Record<string, ModuleValue>
  ) => Record<string, ModuleValue>;
}

export interface ModuleInstance {
  id: string;
  definitionId: string;
  position: {
    x: number;
    y: number;
  };
  parameters: Record<string, ModuleValue>;
}

export interface Connection {
  id: string;
  fromModuleId: string;
  fromOutputName: string;
  toModuleId: string;
  toInputName: string;
}
