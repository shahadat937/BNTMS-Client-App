import { BNAClassScheduleStatus } from "./bnaclassschedulestatus";

export interface IBNAClassScheduleStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAClassScheduleStatus[];
}

export class BNAClassScheduleStatusPagination implements IBNAClassScheduleStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAClassScheduleStatus[] = [];
}