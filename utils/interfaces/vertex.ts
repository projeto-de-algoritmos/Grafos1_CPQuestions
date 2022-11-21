export default interface Vertex {
  adjList: Vertex[];
  id: string;
  removeVertex(id: string): Vertex;
  addVertex(v: Vertex): void;
}
