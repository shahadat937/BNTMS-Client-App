import {StepRelation} from './StepRelation';

export interface IStepRelationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: StepRelation[];
}

export class StepRelationPagination implements IStepRelationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: StepRelation[] = [];


}
