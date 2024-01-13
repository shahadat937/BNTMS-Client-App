import { Branch } from "./branch";

export interface IBranchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Branch[];
}

export class BranchPagination implements IBranchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Branch[] = [];
}