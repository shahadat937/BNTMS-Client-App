import { CourseBudgetAllocation } from './courseBudgetAllocation';

export interface ICourseBudgetAllocationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseBudgetAllocation[]; 
}

export class CourseBudgetAllocationPagination implements ICourseBudgetAllocationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseBudgetAllocation[] = []; 
}
 