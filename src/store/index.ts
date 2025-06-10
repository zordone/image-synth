import { proxy, subscribe } from "valtio";
import type {
  ModuleInstance,
  Connection,
  ModuleValue,
  ModuleDefinition,
} from "../types/module";
import { moduleRegistry } from "../modules";

interface AppState {
  modules: ModuleInstance[];
  connections: Connection[];
  lastUpdated: number;
  moduleMap: Map<string, ModuleInstance>;
  connectionMap: Map<string, Connection>;
  connectionsByInput: Map<string, Connection>; // key: `${moduleId}-${inputName}`
  definitionMap: Map<string, ModuleDefinition>; // key: definition.id
}

// Create module definition map once since it never changes
const definitionMap = new Map<string, ModuleDefinition>();
moduleRegistry.forEach((def) => definitionMap.set(def.id, def));

// Load initial state from localStorage or use empty state
const savedState = localStorage.getItem("imageSynthState");
let initialState: AppState;

if (savedState) {
  const parsed = JSON.parse(savedState);
  initialState = {
    ...parsed,
    moduleMap: new Map(),
    connectionMap: new Map(),
    connectionsByInput: new Map(),
    definitionMap, // Add our static definition map
  };
  // Populate maps from arrays
  parsed.modules.forEach((m: ModuleInstance) =>
    initialState.moduleMap.set(m.id, m)
  );
  parsed.connections.forEach((c: Connection) => {
    initialState.connectionMap.set(c.id, c);
    initialState.connectionsByInput.set(`${c.toModuleId}-${c.toInputName}`, c);
  });
} else {
  initialState = {
    modules: [],
    connections: [],
    lastUpdated: 0,
    moduleMap: new Map(),
    connectionMap: new Map(),
    connectionsByInput: new Map(),
    definitionMap, // Add our static definition map
  };
}

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
    state.moduleMap.set(module.id, module);
    state.lastUpdated = Date.now();
  },

  removeModule: (moduleId: string) => {
    state.modules = state.modules.filter((m) => m.id !== moduleId);
    state.moduleMap.delete(moduleId);

    // Remove any connections to/from this module
    const connectionsToRemove = state.connections.filter(
      (c) => c.fromModuleId === moduleId || c.toModuleId === moduleId
    );

    connectionsToRemove.forEach((c) => {
      state.connectionMap.delete(c.id);
      state.connectionsByInput.delete(`${c.toModuleId}-${c.toInputName}`);
    });

    state.connections = state.connections.filter(
      (c) => c.fromModuleId !== moduleId && c.toModuleId !== moduleId
    );

    state.lastUpdated = Date.now();
  },

  updateModulePosition: (moduleId: string, x: number, y: number) => {
    const module = state.moduleMap.get(moduleId);
    if (module) {
      module.position.x = x;
      module.position.y = y;
    }
  },

  updateModuleParameter: (
    moduleId: string,
    paramName: string,
    value: ModuleValue
  ) => {
    const module = state.moduleMap.get(moduleId);
    if (module) {
      module.parameters[paramName] = value;
      state.lastUpdated = Date.now();
    }
  },

  addConnection: (connection: Connection) => {
    const inputKey = `${connection.toModuleId}-${connection.toInputName}`;
    const existingConnection = state.connectionsByInput.get(inputKey);

    if (existingConnection) {
      // Replace existing connection
      state.connections = state.connections.map((c) =>
        c.id === existingConnection.id ? connection : c
      );
      state.connectionMap.set(connection.id, connection);
      state.connectionsByInput.set(inputKey, connection);
    } else {
      state.connections.push(connection);
      state.connectionMap.set(connection.id, connection);
      state.connectionsByInput.set(inputKey, connection);
    }
    state.lastUpdated = Date.now();
  },

  removeConnection: (connectionId: string) => {
    const connection = state.connectionMap.get(connectionId);
    if (connection) {
      state.connectionsByInput.delete(
        `${connection.toModuleId}-${connection.toInputName}`
      );
      state.connectionMap.delete(connectionId);
      state.connections = state.connections.filter(
        (c) => c.id !== connectionId
      );
      state.lastUpdated = Date.now();
    }
  },
};
