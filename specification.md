# Image Synthesizer

We are creating an app similar to a modular synthesizer, but for images instead of audio.

## General Idea

Small simple modules, with inputs (on the left), outputs (on the right), and changeable parameters can be connected together to achieve a more complex final output that will be rendered on the screen.

The most basic inputs are screen coordinates (normalized between 0 and 1), this is what the first modules will receive as input. Following modules can be added, connected, disconnected, and their parameters can be changed by the user at runtime.

A given type output can only be connected to the same type of input of another module. One output can only be connected to multiple different inputs of other modules, but one input can only be connected to one output. If a module has missing required inputs, or threw an exception, mark it with a red border.

Connection cycles are allowed in general, unless they would cause infinitely changing values. If there is an invalid connection, mark the connection itself red.

This chain of modules are evaluated for each pixel, that's how the final output is calculated. The calculation should update in real time, as the user updates things.

## Architecture

This will be a client-only React app written in TypeScript.

Use yarn, vite, dnd-kit, styled-components, valtio. Don't use npm, zustand or tailwind.

Make the architecture in a way to make it super easy to add new types of modules by just creating a new component, that is using a base component to provide a simple way to define inputs, outputs, parameters, and to add the new module into the registry. For example:

```ts
const MixModule = () => {
  const inputs: ModuleInputs = [
    { name: 'Value1', type: 'number', required: true },
    { name: 'Value2', type: 'number', default: 0 },
  ];
  const params = ModuleParams = [
    { name: 'Factor', type: 'number', min: 0, max: 1, default: 0.5 },
  ];
  count outputs: ModuleOutputs = [
    { name: 'Result', type: 'number' },
  ];
  const onCalculate = (inputs, params) => {
    return {
      Result: inputs.Value1 * (1-params.Factor) + inputs.Value2 * params.Factor
    };
  };
  return <BaseModule
    name="Mix"
    type="Math"
    inputs={inputs}
    params={params}
    outputs={outputs}
    onCalculate={onCalculate}
  />
};
```

Make sure that we support different data types, not just numbers. We want to be able to add modules that work with booleans, colors and so on, but we will start with the numbers. So don't implement other data types yet, but make sure the architecture is ready for adding more in the future.

## Step 1: Discuss the specification

Query:

Don't start coding yet. Just read through this specification and if anything is unclear or you have any questions, ask me.

Response:

I'll review the specification and ask any clarifying questions I have about the requirements:

1. About module types and data flow:

   - The app will process images pixel by pixel, with modules forming a processing chain
   - Each module has inputs, outputs, and parameters
   - Modules receive screen coordinates as initial input
   - Should we assume the screen coordinates are normalized (0-1) or actual pixel coordinates?

2. About the module architecture:

   - The example shows a `BaseModule` component that other modules will extend
   - The `onCalculate` function receives inputs and params and returns outputs
   - The example shows a "Mix" module but is labeled as "Add" in the BaseModule name prop - is this a typo?

3. About the UI and interaction:

   - The UI will have a left panel with coordinate inputs
   - Users can add/remove module instances from a menu
   - Modules can be connected with cables
   - Parameters are adjusted with rotary encoders
   - Should we implement drag-and-drop for module placement?
   - Should we allow multiple connections to an output?

4. About data types:

   - Initially focusing on numbers
   - Future support for booleans and colors
   - For colors, what format should we use? (RGB, HSL, etc.)
   - Should we implement type checking between connections?

5. Technical questions:
   - Should the calculation be real-time as parameters change?
   - How should we handle performance optimization for pixel-by-pixel processing?
   - Should we implement any error handling for invalid connections or cycles in the graph?

Could you please clarify these points so I can better understand the requirements before moving to the planning phase?

Query:

Great questions! I answered them all in the same `specification.md` file. If all is clear, please continue to "Step 2: Make a plan".

## Step 2: Make a plan

Query:

Don't start coding yet. Just make a step by step plan.

Response:

Yes, the specification is much clearer now! I'll create a step-by-step plan for implementing this image synthesizer.

1. Project Setup

   - Create a new React + TypeScript project using Vite
   - Set up ESLint and Prettier for code quality
   - Create the basic project structure for components, types, and utilities

2. Core Types and Interfaces

   - Define TypeScript interfaces for Module, Input, Output, Parameter
   - Create types for supported data types (starting with numbers)
   - Define types for connection management

3. Base Module Implementation

   - Create the BaseModule component
   - Implement input/output port visualization
   - Add parameter controls with rotary encoder UI
   - Create the module container with drag & drop support

4. Module Registry System

   - Create a registry for module types
   - Implement module instantiation system
   - Create the module selection menu

5. Connection System

   - Implement drag & drop cable connections
   - Add connection validation (type checking, cycle detection)
   - Visual feedback for valid/invalid connections
   - Handle multiple outputs to inputs, but single input restriction

6. Basic Math Modules

   - Implement coordinate input module
   - Create basic math modules:
     - Add
     - Multiply
     - Mix
     - Clamp
     - Number (constant value)

7. Canvas Rendering System

   - Create the output canvas
   - Implement per-pixel calculation system
   - Setup the module graph evaluation
   - Add real-time updates

8. UI Layout and Styling

   - Implement left panel with coordinate inputs
   - Add module workspace area
   - Create right panel with output display
   - Style everything according to example-ui.png

9. Error Handling and Visual Feedback

   - Add error states for modules (red border)
   - Implement invalid connection highlighting
   - Add loading states during calculations

10. Performance Baseline
    - Implement basic rendering at reasonable resolution
    - Add FPS counter for monitoring
    - Test with different module configurations

Each step builds upon the previous one, and we can validate functionality as we go. Would you like me to proceed with implementing Step 1?

Query:

Sounds like a great plan! Please proceed.

## Step 3: Basic implementation

Please generate a simple web app.

Make the screen coordinate inputs available on the left side as an outlet. The user can add or remove any number of instances of the available module types from a menu, change their parameters via rotary encoders, and connect them together with cables. Cable connection and module placement should work by drag & drop. Make the final output outlet available on the right side.

I know per pixel calculation won't be very fast, so make the output image a reasonable size, but don't do any crazy optimizations yet. Let's see how it performs first.

See the `example-ui.png` file for inspiration on how the UI should work and look like.

As a first step, just define a few basic math nodes to add, multiply, mix, clamp, numerical values.

## Reverts

1. Unsolvable issue around making connections.

See `specification.md`.
We ran into an issue we couldn't resolve during an earlier try, so I reverted all changes since the last commit.
We have our basic project setup, and our module system. Next up, we should work on making the connections between modules.

Please make sure to pay attention to how we calculate, store and update the coordinates of our input/output ports. Coordinates should be relative to our working area. The left sidebar should be acounted for. And the port locations should be updated when we move our modules around.

And in general, please continue implementing the spec.
