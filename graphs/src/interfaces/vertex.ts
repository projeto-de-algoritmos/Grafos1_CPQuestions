import VertexData from './vertexData';

export default interface Vertex {
  id: number,
  adjList: [Vertex],
  hasChanged: boolean,
  getData(): VertexData
}
