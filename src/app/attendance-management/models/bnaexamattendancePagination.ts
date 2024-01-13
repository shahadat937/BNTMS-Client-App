import { BNAExamAttendance } from './bnaexamattendance';

export interface IBNAExamAttendancePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamAttendance[]; 
}

export class BNAExamAttendancePagination implements IBNAExamAttendancePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAExamAttendance[] = []; 
}
 