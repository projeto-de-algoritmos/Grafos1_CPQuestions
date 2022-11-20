import Vertex from "../interfaces/vertex";

class NodeVertex implements Vertex {
    id: string;
    adjList: Vertex[];

    constructor(id: string) {
        this.id = id;
        this.adjList = [];
    }

    addVertex(v: Vertex): void {
        this.adjList.push(v);
    }

    removeVertex(id: string): Vertex {
        return this.adjList.splice(
            this.adjList.findIndex(
                v => v.id == id
            ), 
            1
        )[0]
    }
}