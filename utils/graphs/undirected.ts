import Graph from '../interfaces/graph';
import Traversal from '../interfaces/traversal';
import Vertex from '../interfaces/vertex';
import GenericUndirectedTraversal from '../traversal/generic_undirected_traversal';

class UndirectedGraph extends Graph {
    public addEdge([u, v] : Vertex[]) {
    let ui = this.findV(u);
    let vi = this.findV(v);

    this.vertexes[ui].addVertex(v);
    this.vertexes[vi].addVertex(u);
  }

  public removeEdge([u, v]: Vertex[]) {
    let ui = this.findV(u);
    let vi = this.findV(v);

    this.vertexes[ui].removeVertex(v.id);
    this.vertexes[vi].removeVertex(u.id)
  }

  public createTraversal(start: number, type?: string) : Traversal | null{
   if (!type) {
     return new GenericUndirectedTraversal(this, this.vertexes[start]);
   }
   return null;
  }
}
