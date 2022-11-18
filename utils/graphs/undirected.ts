import Graph from '../interfaces/graph';
import Vertex from '../interfaces/vertex';

class UndirectedGraph extends Graph {
  public addEdge([u, v] : Vertex[]) {
    let ui = this.vertexes.findIndex(k => k.id == u.id);
    let vi = this.vertexes.findIndex(k => k.id == v.id);

    this.vertexes[ui].addVertex(v);
    this.vertexes[vi].addVertex(u);
  }
}
