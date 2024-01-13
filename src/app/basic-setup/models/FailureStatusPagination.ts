import {FailureStatus} from './FailureStatus';

export interface IFailureStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FailureStatus[];
}

export class FailureStatusPagination implements IFailureStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FailureStatus[] = [];


}
