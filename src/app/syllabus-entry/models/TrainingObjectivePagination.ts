import {TrainingObjective} from './TrainingObjective';

export interface ITrainingObjectivePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TrainingObjective[]; 
}

export class TrainingObjectivePagination implements ITrainingObjectivePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TrainingObjective[] = []; 
}
 