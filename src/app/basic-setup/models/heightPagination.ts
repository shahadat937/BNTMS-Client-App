import { Height } from "./height";

export interface IHeightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Height[];
}

export class HeightPagination implements IHeightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Height[] = [];
}