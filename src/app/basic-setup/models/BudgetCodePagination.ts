import {BudgetCode} from './BudgetCode';

export interface IBudgetCodePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BudgetCode[];
}

export class BudgetCodePagination implements IBudgetCodePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BudgetCode[] = [];


}
