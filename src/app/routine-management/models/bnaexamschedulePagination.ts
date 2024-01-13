import { BNAExamSchedule } from './bnaexamschedule';

export interface IBNAExamSchedulePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamSchedule[]; 
}

export class BNAExamSchedulePagination implements IBNAExamSchedulePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamSchedule[] = []; 
}
 