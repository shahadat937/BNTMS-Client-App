import { MaritalStatus } from "./MaritalStatus";

export interface IMaritalStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MaritalStatus[];
}

export class MaritalStatusPagination implements IMaritalStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MaritalStatus[] = [];
}