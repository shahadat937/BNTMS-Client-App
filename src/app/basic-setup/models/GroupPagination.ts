import { Group } from "./Group";

export interface IGroupPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Group[];
}

export class GroupPagination implements IGroupPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Group[] = [];
}