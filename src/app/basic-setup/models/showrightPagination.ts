import { ShowRight } from "./showright";

export interface IShowRightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ShowRight[];
}

export class ShowRightPagination implements IShowRightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ShowRight[] = [];
}