import Graph from "../interfaces/graph";
import Vertex from "../interfaces/vertex";
import Traversal from "../interfaces/traversal";

export default class GenericUndirectedTraversal implements Traversal {

  GRAY = 1;
  WHITE = 0;
  BLACK = 2;
  cycleStart = -1;

  g: Graph;
  start: number;
  dists: number[];
  colors: number[];
  visited: number[];
  vertexes: Vertex[];
  discovered: number[];
  isBissected: boolean = true;
  mapInd: Map<number, number>;
  

  constructor(g: Graph, start: Vertex) {
    this.g = g;
    this.start = -1;
    this.vertexes = [...g.vertexes];
    this.dists = new Array(g.vertexes.length, -1);
    this.colors = new Array(g.vertexes.length, this.WHITE);
    this.visited = new Array(g.vertexes.length, this.WHITE);
    this.discovered = new Array(g.vertexes.length, -1);
    this.mapInd = new Map(this.vertexes.map((vert, ind) => [vert.id, ind]));

    const s = this.mapInd.get(start.id);

    if (s === undefined) throw new Error("Vertex doesn't exist");

    this.start = s;
  }

  private bfsDist(graph: Vertex[], start: number) {
   let queue : number[] = [];  
   this.dists[start] = 0;
   this.colors[start] = this.GRAY;
   queue.push(start);
    
   while(queue.length !== 0) {
      let v : number | undefined = queue.pop();
      
      if (v === undefined) throw new Error("There are no more vertexes in the BFS queue");

      let pColor: number = this.colors[v];
      let color: number = pColor === this.GRAY ? this.BLACK : this.GRAY;

      for (const u of graph[v].adjList ) {
        const uind: number | undefined = this.mapInd.get(u.id);
        if (uind === undefined) throw new Error("Error in vertex on the Adj List"); 

        if (this.colors[uind] === this.colors[v]) this.isBissected = false;

        if (this.dists[uind] === -1) {
          this.dists[uind] = this.dists[v] + 1; 
          if (this.colors[uind] === this.WHITE) this.colors[uind] = color;
          queue.push(uind);
        }
      }  
      
   }
  }
  private dfsCycle(graph: Vertex[], visited: number[], vind: number): boolean {
    if (visited[vind] === this.WHITE) {
      visited[vind] = this.GRAY;

      for (const u of graph[vind].adjList) {
        const uind = this.mapInd.get(u.id);

        if (uind === undefined) throw new Error("A vertex id error ocurred on the DFS cycle detection");
        
        if (this.discovered[uind] === -1) this.discovered[uind] = vind;

        if (visited[uind] === this.GRAY) {
          this.cycleStart = uind;
          return true;
        } else if (this.dfsCycle(graph, visited, uind)) {
          return true;
        }
      }
    }

    this.visited[vind] = this.BLACK;
    return false;
  }

  public getDists(): void {
    this.bfsDist(this.vertexes, this.start); 
  }

  public detectCycle(): boolean {
    for (const v of this.vertexes) {
      const vind: number | undefined = this.mapInd.get(v.id);

      if (vind === undefined) throw new Error("A vertex id error ocurred while trying to detect a cycle");
      
      if (this.visited[vind] === this.WHITE && 
          this.dfsCycle(this.vertexes, this.visited, vind)) {
          
          this.g.isCyclic = true;
          return true;
      }
    }

    this.g.isCyclic = false;
    return false;
  }

  public detectBipartion(): boolean {
    return this.isBissected;
  }

  public detectTopOrder(): boolean {
    return false; 
  }
}
