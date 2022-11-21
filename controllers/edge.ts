import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { IInvestigation, InvestigationModel } from "../models/investigation";

export default class EdgeController {
    static traverse(graph: IInvestigation) : void {
    }

    public static async addEdge(req: Request, resp: Response) : Promise<void> {
        const gId = req.params.id;
        const { id1, id2 } = req.body;
        
        await InvestigationModel.findOne({ _id: new ObjectId(gId) })
            .then(graph => {
                if (graph) {
                    console.log('Found graph, preparing to add edge...');
                    console.log(`Adding edge ${id1} -- ${id2}`);

                    let v2 = graph?.vertexes.id(id2);
                    let v1 = graph?.vertexes.id(id1);

                    console.log(v2);
                    console.log(v1);

                    if(v1 && v2) {
                        if (graph.type === 'undirected' ) {
                            v2.adjList.push(v1._id);
                            v2.save();
                        }

                       v1.adjList.push(v2._id);
                       v1.save();
                    }

                   console.log('Saving edge...')
                   return graph?.save();
                } else throw new Error("Couldn't find graph");
            })
            .then(graph => { 
                EdgeController.traverse(graph);
                resp.status(200).send({data: graph }); 
            })
            .catch(err => {
                console.log(err);
                resp.status(500).send({ error: err });
            } );
    }
}