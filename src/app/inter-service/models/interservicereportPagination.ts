import {InterserviceReport} from './interservicereport';

export interface IInterserviceReportPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InterserviceReport[];
}

export class InterserviceReportPagination implements IInterserviceReportPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InterserviceReport[] = [];


}
