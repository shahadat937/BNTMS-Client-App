import { ClassPeriod } from './classperiod';

export interface IClassPeriodPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ClassPeriod[]; 
}

export class ClassPeriodPagination implements IClassPeriodPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ClassPeriod[] = []; 
}
 