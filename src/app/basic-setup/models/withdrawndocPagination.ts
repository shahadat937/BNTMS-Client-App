import { WithdrawnDoc } from "./withdrawndoc";

export interface IWithdrawnDocPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: WithdrawnDoc[];
}

export class WithdrawnDocPagination implements IWithdrawnDocPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: WithdrawnDoc[] = [];
}