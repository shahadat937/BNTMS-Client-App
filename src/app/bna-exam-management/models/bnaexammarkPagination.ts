import { BNAExamMark } from './bnaexammark';

export interface IBNAExamMarkPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamMark[]; 
}

export class BNAExamMarkPagination implements IBNAExamMarkPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamMark[] = []; 
}
 