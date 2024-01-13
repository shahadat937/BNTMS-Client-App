import { BnaClassTest } from './BnaClassTest';

export interface IBnaClassTestPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaClassTest[]; 
}

export class BnaClassTestPagination implements IBnaClassTestPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaClassTest[] = []; 
}
 