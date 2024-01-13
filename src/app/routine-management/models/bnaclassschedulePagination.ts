import { BnaClassSchedule } from './bnaclassschedule';

export interface IBnaClassSchedulePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaClassSchedule[]; 
}

export class BnaClassSchedulePagination implements IBnaClassSchedulePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaClassSchedule[] = []; 
}
 