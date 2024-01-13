import { Attendance } from './attendance';

export interface IAttendancePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Attendance[]; 
}

export class AttendancePagination implements IAttendancePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Attendance[] = []; 
}
 