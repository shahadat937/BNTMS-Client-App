import { RoutineNote } from './routinenote';

export interface IRoutineNotePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RoutineNote[]; 
}

export class RoutineNotePagination implements IRoutineNotePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RoutineNote[] = []; 
}
 