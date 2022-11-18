import Graph from './graph'

export default interface Traversal {
  traverse(g: Graph): void;
  detectCycle(g: Graph): boolean;
  detectTopOrder(g: Graph): boolean;
}
