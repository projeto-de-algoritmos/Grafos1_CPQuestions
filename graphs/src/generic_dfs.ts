import Graph from "./interfaces/graph";
import Traversal from "./interfaces/traversal";
import Vertex from "./interfaces/vertex";
import GraphData from "./interfaces/graphData";

abstract class GenericDFS implements Traversal {
  graph: Graph;
  indexMap: Map<number, number>;
  private visited: number[];
  private count: number;
  private color: number[];
  private parent: number[];
  private WHITE = 0;
  private GRAY = 1;
  private BLACK = 2;

  constructor(g: Graph) {
    this.graph = g;
    this.indexMap = new Map(
      this.graph.vertexes.map((val, ind) => [val.id, ind])
    );
    this.color = new Array(this.graph.vertexes.length, this.WHITE);
    this.visited = new Array(this.graph.vertexes.length, -1);
    this.parent = new Array(this.graph.vertexes.length, -1);
    this.count = 0;
  }

  private dfs (graph: Vertex[], v: number) {
    if (!this.visited[v]) {
      this.visited[v] = this.count++;
      this.color[v] = this.GRAY;

      for (let u of graph[v].adjList) {
        let ind = this.indexMap.get(u.id);
        if (ind) {
          this.parent[ind] = v;
          this.dfs(graph, ind);
        }
      }

      this.color[v] = this.BLACK;
    }
  }

  public traverse(){
    let vlist = this.graph.vertexes;
    vlist.forEach((vertex) => {
      let v: number | undefined = this.indexMap.get(vertex.id);
      if (v) {
        if (this.visited[v] <= -1) {
          this.dfs(vlist, v);
        }
      }
    });
  }
}
