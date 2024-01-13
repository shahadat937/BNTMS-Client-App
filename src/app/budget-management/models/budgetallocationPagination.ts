import { BudgetAllocation } from './BudgetAllocation';

export interface IBudgetAllocationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BudgetAllocation[]; 
}

export class BudgetAllocationPagination implements IBudgetAllocationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BudgetAllocation[] = []; 
}
 