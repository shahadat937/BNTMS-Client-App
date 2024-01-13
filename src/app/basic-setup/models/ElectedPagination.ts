import { Elected } from "./Elected";
export interface IElectedPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Elected[];
}

export class ElectedPagination implements IElectedPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Elected[] = [];
}