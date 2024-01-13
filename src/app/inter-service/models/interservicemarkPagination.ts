import {InterServiceMark} from './interservicemark';

export interface IInterServiceMarkPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InterServiceMark[];
}

export class InterServiceMarkPagination implements IInterServiceMarkPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InterServiceMark[] = [];


}
