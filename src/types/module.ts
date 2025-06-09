export type DataType = "number";
export type ModuleValue = number;

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
