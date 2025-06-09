import { proxy } from "valtio";
import type { ModuleInstance, Connection, ModuleValue } from "../types/module";

interface AppState {
  modules: ModuleInstance[];
  connections: Connection[];
}

export const state = proxy<AppState>({
  modules: [],
  connections: [],
});

export const actions = {
  addModule: (module: ModuleInstance) => {
    state.modules.push(module);
  },

  removeModule: (moduleId: string) => {
    state.modules = state.modules.filter((m) => m.id !== moduleId);
    state.connections = state.connections.filter(
      (c) => c.fromModuleId !== moduleId && c.toModuleId !== moduleId
    );
  },

  updateModulePosition: (moduleId: string, x: number, y: number) => {
    const module = state.modules.find((m) => m.id === moduleId);
    if (module) {
      module.position = { x, y };
    }
  },

  updateModuleParameter: (
    moduleId: string,
    paramName: string,
    value: ModuleValue
  ) => {
    const module = state.modules.find((m) => m.id === moduleId);
    if (module) {
      module.parameters[paramName] = value;
    }
  },

  addConnection: (connection: Connection) => {
    // Check if there's already a connection to this input
    const existingConnection = state.connections.find(
      (c) =>
        c.toModuleId === connection.toModuleId &&
        c.toInputName === connection.toInputName
    );

    if (existingConnection) {
      // Replace existing connection
      state.connections = state.connections.map((c) =>
        c.id === existingConnection.id ? connection : c
      );
    } else {
      state.connections.push(connection);
    }
  },

  removeConnection: (connectionId: string) => {
    state.connections = state.connections.filter((c) => c.id !== connectionId);
  },
};
