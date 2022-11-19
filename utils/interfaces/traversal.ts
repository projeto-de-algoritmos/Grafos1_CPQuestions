import Graph from './graph'

export default interface Traversal {
  dists: number[];
  detectCycle(): boolean;
  getDists(): void;
  detectTopOrder(): boolean;
  detectBipartion(): boolean;
}
