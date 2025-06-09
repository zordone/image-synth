import type {
  ModuleInstance,
  Connection,
  ModuleValue,
  Color,
} from "../types/module";
import { moduleRegistry } from "../modules";

interface ModuleGraph {
  modules: ReadonlyArray<ModuleInstance>;
  connections: ReadonlyArray<Connection>;
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
  if (cache.has(moduleId)) {
    return cache.get(moduleId)!;
  }

  const module = graph.modules.find((m) => m.id === moduleId);
  if (!module) return {};

  const definition = moduleRegistry.find((m) => m.id === module.definitionId);
  if (!definition) return {};

  // Get the input values for this module
  const inputs: Record<string, ModuleValue> = {};

  definition.inputs.forEach((input) => {
    // Find connection to this input
    const connection = graph.connections.find(
      (c) => c.toModuleId === moduleId && c.toInputName === input.name
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
    } else if (input.default !== undefined) {
      inputs[input.name] = input.default;
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

  // Calculate module outputs
  const result = definition.calculate(inputs, module.parameters);
  cache.set(moduleId, result);
  return result;
}

export function renderToCanvas(canvas: HTMLCanvasElement, graph: ModuleGraph) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  // Find output module (any module with color output)
  const outputModule = graph.modules.find((module) => {
    const definition = moduleRegistry.find((m) => m.id === module.definitionId);
    return definition?.outputs.some((output) => output.type === "color");
  });

  if (!outputModule) {
    // Clear canvas if no output module is found
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const cache = new Map<string, Record<string, ModuleValue>>();

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
      const outputColor = Object.values(result)[0];

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
}
