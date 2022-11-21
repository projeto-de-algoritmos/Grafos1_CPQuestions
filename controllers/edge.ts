import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { InvestigationModel } from "../models/investigation";

export default class EdgeController {
    public static addEdge(req: Request, resp: Response) : void {
        const gId = req.params.id;
        const { id1, id2 } = req.body;

        InvestigationModel.findOne({ _id: gId })
            .then(async graph => {
                if (graph) {
                    console.log('Found graph, preparing to add edge...');
                    console.log(`Adding edge ${id1} -- ${id2}`);
                    if (graph?.type === 'undirected') {
                        let ind2 = graph.vertexes.findIndex(v => v._id === id2);
                        graph.vertexes[ind2].adjList.push(new ObjectId(id1));
                    }

                    let ind = graph?.vertexes.findIndex(v => v._id === id1);
                    graph?.vertexes[ind].adjList.push(new ObjectId(id2));

                   await graph.save();
                   resp.status(200).send({ "success": true }) ;
                } else throw new Error("Couldn't find graph");
            })
            .catch(err => resp.status(500).json({ error: err }));
    }
}