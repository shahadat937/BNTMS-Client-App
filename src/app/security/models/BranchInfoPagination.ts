import { BranchInfo } from "./BranchInfo";
export interface IBranchInfoPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BranchInfo[];
}

export class BranchInfoPagination implements IBranchInfoPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BranchInfo[] = [];


}
