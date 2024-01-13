import { JoiningReason } from "./JoiningReason";
export interface IJoiningReasonPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: JoiningReason[];
}

export class JoiningReasonPagination implements IJoiningReasonPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: JoiningReason[] = [];
}