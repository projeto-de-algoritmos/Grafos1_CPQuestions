import {Request, Response} from 'express';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { InvestigationModel, InvestElem, IInvestElem } from '../models/investigation';
export default class InvestController {
    /**
     * Creates the graph
     *  
     * @param req Only needs type to create
     * @param resp Returns the created graph
     */
    public static createGraph(req: Request, resp: Response) {
        let { type } = req.body;    
        let element = new InvestElem({
            adjList: [],
            name: 'default',
            descript: 'default',
            type: 'person'
        });

        let investigation = new InvestigationModel({
            type: type,
            vertexes: [element],
            start: element
        });

        InvestigationModel.create(investigation).then((doc) => {
            resp.status(200).json({ data: doc });
        })
        .catch((err) => {
            resp.status(500).json({ error: err });
        });    
    }

    public static getGraph(req: Request, resp: Response): void {
        let id = req.params.id;
        let result = InvestigationModel.findOne({ _id: new ObjectId(id) }).exec((err, result) => {
            if(result)
                resp.status(200).send({data: result});
            else
                resp.status(500).send({error: err});
        });
    }

    public static getAll(_req: Request, resp: Response): void {
        InvestigationModel.find()
            .then((result) => {resp.status(200).send({ data: result })})
            .catch(err => resp.status(500).send({ error: err }));
    } 

    public static createVertex(req: Request, resp: Response): void {
        let vertex : IInvestElem = new InvestElem({ ...req.body });
        InvestigationModel.findOne().then(async (graph) => {
            graph?.vertexes.push(vertex);
            await graph?.save();

            resp.status(200).send({ data: vertex._id });
        }).catch(err => resp.send({ error: err }));
    }
} 