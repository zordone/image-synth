import type {
  ModuleInstance,
  Connection,
  ModuleValue,
  Color,
  ModuleDefinition,
} from "../types/module";

interface ModuleGraph {
  modules: ReadonlyArray<ModuleInstance>;
  connections: ReadonlyArray<Connection>;
  moduleMap: ReadonlyMap<string, ModuleInstance>;
  connectionsByInput: ReadonlyMap<string, Connection>;
  definitionMap: ReadonlyMap<string, ModuleDefinition>;
}

function isColor(value: ModuleValue): value is Color {
  return (
    typeof value === "object" && "r" in value && "g" in value && "b" in value
  );
}

function calculateModule(
  moduleId: string,
  graph: ModuleGraph,
  cache: Map<string, Record<string, ModuleValue>>,
  x: number,
  y: number
): Record<string, ModuleValue> {
  // Return cached results if available
  const cachedResult = cache.get(moduleId);
  if (cachedResult) return cachedResult;

  const module = graph.moduleMap.get(moduleId);
  if (!module) return {};

  const definition = graph.definitionMap.get(module.definitionId);
  if (!definition) return {};

  // Get the input values for this module
  const inputs: Record<string, ModuleValue> = {};

  definition.inputs.forEach((input) => {
    // Find connection to this input using the map
    const connection = graph.connectionsByInput.get(
      `${moduleId}-${input.name}`
    );

    if (connection) {
      // Calculate the source module's outputs if needed
      const sourceOutputs = calculateModule(
        connection.fromModuleId,
        graph,
        cache,
        x,
        y
      );
      inputs[input.name] = sourceOutputs[connection.fromOutputName];
    } else {
      // Use the stored value for this input, or fall back to default
      inputs[input.name] = module.inputValues[input.name] ?? input.default;
    }
  });

  // Handle coordinate module separately
  if (module.definitionId === "coordinate") {
    const result = {
      X: x,
      Y: y,
    };
    cache.set(moduleId, result);
    return result;
  }

  // Special handling for output module - return its input color directly
  if (module.definitionId === "output") {
    cache.set(moduleId, inputs);
    return inputs;
  }

  // Calculate module outputs
  const result = definition.calculate(inputs);
  cache.set(moduleId, result);
  return result;
}

export function renderToCanvas(canvas: HTMLCanvasElement, graph: ModuleGraph) {
  const started = performance.now();
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  const outputModule = graph.moduleMap.get("output");

  if (!outputModule) {
    // Clear canvas if no output module is found
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const cache = new Map<string, Record<string, ModuleValue>>();
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      cache.clear();

      // Calculate normalized coordinates
      const normalizedX = x / canvas.width;
      const normalizedY = y / canvas.height;

      // Calculate the output color
      const result = calculateModule(
        outputModule.id,
        graph,
        cache,
        normalizedX,
        normalizedY
      );
      const outputColor = result.Image; // Use the "Image" input from the output module

      const i = (y * canvas.width + x) * 4;
      if (isColor(outputColor)) {
        data[i] = Math.floor(outputColor.r * 255);
        data[i + 1] = Math.floor(outputColor.g * 255);
        data[i + 2] = Math.floor(outputColor.b * 255);
        data[i + 3] = 255;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const ended = performance.now();
  console.log(`renderToCanvas: ${ended - started}ms`);
}

export function calculateModuleInputs(
  moduleId: string,
  graph: ModuleGraph
): Record<string, ModuleValue> {
  const module = graph.moduleMap.get(moduleId);
  if (!module) return {};

  const definition = graph.definitionMap.get(module.definitionId);
  if (!definition) return {};

  const inputs: Record<string, ModuleValue> = {};

  definition.inputs.forEach((input) => {
    // Find connection to this input using the map
    const connection = graph.connectionsByInput.get(
      `${moduleId}-${input.name}`
    );

    if (connection) {
      try {
        const sourceOutputs = calculateModule(
          connection.fromModuleId,
          graph,
          new Map(),
          0.5,
          0.5
        );
        inputs[input.name] = sourceOutputs[connection.fromOutputName];
      } catch (err) {
        // If calculation fails, input remains undefined
        console.error("Error calculating module input:", err);
      }
    }
  });

  return inputs;
}
