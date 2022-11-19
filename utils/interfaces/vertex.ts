export default interface Vertex {
  adjList: Vertex[];
  id: number;
  removeVertex(id: number): Vertex;
  addVertex(v: Vertex): void;
}
