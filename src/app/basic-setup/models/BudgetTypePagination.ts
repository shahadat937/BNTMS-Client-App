import { BudgetType } from "./BudgetType";

export interface IBudgetTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BudgetType[];
}
export class BudgetTypePagination implements IBudgetTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BudgetType[] = [];


}
