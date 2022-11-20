import {Request, Response} from 'express';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { InvestigationModel, InvestElem } from '../models/investigation';
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
            name: '',
            descript: '',
            type: ''
        });

        let investigation = new InvestigationModel({
            type: type,
            vertexes: [element],
            start: element
        });

        investigation.save();

        resp.status(200).send(investigation);  
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
} 