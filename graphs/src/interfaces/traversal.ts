import Graph from './graph';

export default interface Traversal {
  traverse(g: Graph): void
}
