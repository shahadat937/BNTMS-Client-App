import { MarkType } from "./MarkType";

export interface IMarkTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MarkType[];
}

export class MarkTypePagination implements IMarkTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MarkType[] = [];
}