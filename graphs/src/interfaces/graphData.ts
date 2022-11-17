export default interface GraphData {
  isCyclic: boolean,
  isDirected: boolean,
  isStronglyConnected: boolean,
  hasTopOrder: boolean,
  nVertex: number,
  nEdges: number
}
