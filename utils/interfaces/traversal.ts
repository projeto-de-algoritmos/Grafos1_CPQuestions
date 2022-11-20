export default interface Traversal {
  dists: number[];
  isCyclic: boolean;
  isDirected: boolean;
  isBipartite: boolean;
  hasTopOrder: boolean;
  detectCycle(): boolean;
  getDists(): void;
  detectTopOrder(): boolean;
  detectBipartion(): boolean;
}
