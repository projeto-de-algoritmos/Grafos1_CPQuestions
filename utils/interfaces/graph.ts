import Vertex from "./vertex";
import Traversal from "./traversal";
import { Edge } from "../types/edge";

export default abstract class Graph {
  public vertexes: Vertex[] = [];
  public isCyclic: boolean = false;
  public isDirected: boolean = false;
  protected traversal: Traversal;

  constructor(traversal: Traversal){
    this.traversal = traversal;
  }

  public addVertex(v: Vertex): void {
    this.vertexes.push(v);
  }

  public removeVertex(id: number): Vertex | undefined {
    const v = this.vertexes.find(v => v.id == id);
    const i = this.vertexes.findIndex(v => v.id == id);
    if (v != undefined) {

      this.vertexes.forEach((u) => {
        this.removeEdge([u, v]);
      }); 

      return this.vertexes.splice(i, 1)[0];
    }
  }

  /**
  public setVertexes(vs: Vertex[]) {
    this.vertexes = vs;
  }
  public setCyclic(val: boolean) {
    this.isCyclic = val;
  }
  public setDirected(val: boolean) {
    this.isCyclic = val;
  }
  */

  public populateData() {
    this.traversal = this.createTraversal();
    this.traversal.detectCycle(this);
    if (!this.isCyclic)
      this.traversal.detectTopOrder(this);
  }

  abstract addEdge([u, v] : Vertex[]): void;
  abstract removeEdge([u, v]: Vertex[]): void;
  abstract createTraversal(): Traversal;
}
