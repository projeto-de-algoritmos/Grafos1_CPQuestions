import Graph from './graph';
import Vertex from './vertex';

export default interface Traversal {
  graph: Graph;
  indexMap: Map<number, number>;
  traverse(): void;
}
