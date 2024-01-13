import { NewEntryEvaluation } from './NewEntryEvaluation';

export interface INewEntryEvaluationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: NewEntryEvaluation[]; 
}

export class NewEntryEvaluationPagination implements INewEntryEvaluationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: NewEntryEvaluation[] = []; 
}
 