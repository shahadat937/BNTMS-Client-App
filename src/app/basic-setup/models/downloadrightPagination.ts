import { DownloadRight } from "./downloadright";

export interface IDownloadRightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: DownloadRight[];
}

export class DownloadRightPagination implements IDownloadRightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: DownloadRight[] = [];
}