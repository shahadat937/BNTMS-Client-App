import { BNAExamInstructorAssign } from './bnaexaminstructorassign';

export interface IBNAExamInstructorAssignPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamInstructorAssign[]; 
}

export class BNAExamInstructorAssignPagination implements IBNAExamInstructorAssignPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamInstructorAssign[] = []; 
}
 