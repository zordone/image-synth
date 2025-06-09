import { proxy, subscribe } from "valtio";
import type { ModuleInstance, Connection, ModuleValue } from "../types/module";

interface AppState {
  modules: ModuleInstance[];
  connections: Connection[];
  lastUpdated: number;
}

// Load initial state from localStorage or use empty state
const savedState = localStorage.getItem("imageSynthState");
const initialState: AppState = savedState
  ? JSON.parse(savedState)
  : {
      modules: [],
      connections: [],
    };

export const state = proxy<AppState>(initialState);

// Subscribe to state changes and save to localStorage
export const subscribeWithStorage = () => {
  const unsubscribe = subscribe(state, () => {
    localStorage.setItem("imageSynthState", JSON.stringify(state));
  });
  return unsubscribe;
};

export const actions = {
  addModule: (module: ModuleInstance) => {
    state.modules.push(module);
    state.lastUpdated = Date.now();
  },

  removeModule: (moduleId: string) => {
    state.modules = state.modules.filter((m) => m.id !== moduleId);
    // Also remove any connections to/from this module
    state.connections = state.connections.filter(
      (c) => c.fromModuleId !== moduleId && c.toModuleId !== moduleId
    );
    state.lastUpdated = Date.now();
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
      state.lastUpdated = Date.now();
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
    state.lastUpdated = Date.now();
  },

  removeConnection: (connectionId: string) => {
    state.connections = state.connections.filter((c) => c.id !== connectionId);
    state.lastUpdated = Date.now();
  },
};
