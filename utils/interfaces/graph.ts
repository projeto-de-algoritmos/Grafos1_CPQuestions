import Vertex from "./vertex";
import Traversal from "./traversal";
import { Edge } from "../types/edge";

export default abstract class Graph {
  public vertexes: Vertex[] = [];
  public isCyclic: boolean = false;
  public isDirected: boolean = false;
  public isBipartite: boolean = false;
  public hasTopOrder: boolean = false;
  public start: number;

  constructor(vStart: Vertex){
    this.start = this.findV(vStart) ;
  }

  public setStart(v: Vertex, directed: boolean) {
    this.isDirected = directed;
    this.start = this.findV(v); 
  }

  protected findV({ id } : Vertex) {
    return this.vertexes.findIndex(k => k.id === id);
  }

  public addVertex(v: Vertex): void {
    this.vertexes.push(v);
  }

  public removeVertex(id: string): Vertex | undefined {
    const v = this.vertexes.find(v => v.id === id);
    const i = this.vertexes.findIndex(v => v.id === id);
    if (v === undefined) throw new Error('Vertex id error while trying to remove Vertex');

    this.vertexes.forEach((u) => {
      this.removeEdge([u, v]);
    }); 

    return this.vertexes.splice(i, 1)[0];
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

  public populateData(start: number, type?: string,) {
    let traversal = this.createTraversal(start, type);
    if (traversal) {
      traversal.detectCycle();
      if (!this.isCyclic) {
        traversal.detectTopOrder();
      }
      this.isCyclic = traversal.isCyclic;
      this.hasTopOrder = traversal.hasTopOrder;

    } else {
      throw new Error('Traversal is not possible');
    }

  }

  abstract addEdge([u, v] : Vertex[]): void;
  abstract removeEdge([u, v]: Vertex[]): void;
  abstract createTraversal(start: number, type?: string): Traversal | null;
}
