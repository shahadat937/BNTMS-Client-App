import { BNASemesterDuration } from './BNASemesterDuration';

export interface IBNASemesterDurationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASemesterDuration[]; 
}

export class BNASemesterDurationPagination implements IBNASemesterDurationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASemesterDuration[] = []; 
}
 