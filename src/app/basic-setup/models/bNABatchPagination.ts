import {BNABatch} from './bNABatch';

export interface IBNABatchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNABatch[];
}

export class BNABatchPagination implements IBNABatchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNABatch[] = [];


}
