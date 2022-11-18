export default interface Vertex {
  adjList: Vertex[];
  id: Number;
  removeVertex(id: number): Vertex;
  addVertex(v: Vertex): void;
}
