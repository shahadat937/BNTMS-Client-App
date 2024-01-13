import { ResultStatus } from "./resultstatus";

export interface IResultStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ResultStatus[];
}

export class ResultStatusPagination implements IResultStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ResultStatus[] = [];
}