import {TdecActionStatus} from './TdecActionStatus';

export interface ITdecActionStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TdecActionStatus[]; 
}

export class TdecActionStatusPagination implements ITdecActionStatusPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TdecActionStatus[] = []; 
}
 