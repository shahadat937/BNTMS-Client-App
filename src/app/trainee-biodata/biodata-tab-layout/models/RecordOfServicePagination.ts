import { RecordOfService } from "./RecordOfService";
export interface IRecordOfServicePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RecordOfService[];
}

export class RecordOfServicePagination implements IRecordOfServicePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RecordOfService[] = [];
}