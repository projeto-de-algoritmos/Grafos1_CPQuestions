import Vertex from './vertex';
import Traversal from './traversal';
import GraphData from './graphData';

export default interface Graph {
  traversal: Traversal,
  id: number,
  vertexes: Vertex[],
  graphData: GraphData,
  traverse(): void
}
