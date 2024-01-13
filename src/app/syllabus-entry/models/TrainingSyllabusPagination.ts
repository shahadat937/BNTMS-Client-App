import {TrainingSyllabus} from './TrainingSyllabus';

export interface ITrainingSyllabusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TrainingSyllabus[]; 
}

export class TrainingSyllabusPagination implements ITrainingSyllabusPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TrainingSyllabus[] = []; 
}
 