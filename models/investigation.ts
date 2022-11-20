import {model, Model, Schema, Types} from 'mongoose';

export interface IInvestElem {
    _id: Types.ObjectId;
    name: string;
    descript: string;
    type:string;
    thumb: string;
    adjList: Types.ObjectId[];
}

export type InvestElemModel = Model<IInvestElem> ;

export const investElemSchema = new Schema<IInvestElem, InvestElemModel>({
    adjList: [{ type: Schema.Types.ObjectId, ref: 'InvestElem'}],
    name: {type: String, required: true},
    descript: {type: String, required: true},
    type: {type: String, required: true, enum: ['Person', 'Local', 'Object']},
    thumb: { type: String }
});

export const InvestElem = model<IInvestElem, InvestElemModel>('InvestElem', investElemSchema);

export interface IInvestigation {
    vertexes: IInvestElem[];
    isCyclic: boolean;
    isDirected: boolean;
    start: number;
    hasTopOrder: boolean;
    isBipartite: boolean;
    type: string;
}

export type IInvestigationDocProps = {
    vertexes: Types.DocumentArray<IInvestElem>;
} 

export type InvestigationModelType = Model<IInvestigation, {}, IInvestigationDocProps>;

export const invetigationSchema = new Schema<IInvestigation, InvestigationModelType>({
    vertexes: [new Schema<IInvestElem>({
        adjList: [{ type: Schema.Types.ObjectId, ref: 'InvestElem'}],
        name: {type: String, required: true},
        descript: {type: String, required: true},
        type: {type: String, required: true, enum: ['person', 'local', 'object']},
        thumb: { type: String }
    })],
    isDirected: { type: Boolean },
    start: { type: Number, required: true},
    hasTopOrder: { type: Boolean },
    isBipartite: { type: Boolean },
    type: { type: String, enum: ['directed', 'undirected'] },
});

export const InvestigationModel = model<IInvestigation, InvestigationModelType>('Investigation', invetigationSchema);