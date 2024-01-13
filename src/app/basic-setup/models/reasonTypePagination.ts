import {ReasonType} from './reasonType';

export interface IReasonTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ReasonType[];
}

export class ReasonTypePagination implements IReasonTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ReasonType[] = [];


}
