import Vertex from './vertex';
import Traversal from './traversal';

export default interface Graph {
  traversal: Traversal,
  id: number,
  vertexes: [Vertex],
  traverse(): void
}
