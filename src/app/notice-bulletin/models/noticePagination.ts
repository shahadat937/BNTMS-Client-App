import { Notice } from './notice';

export interface INoticePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Notice[]; 
}

export class NoticePagination implements INoticePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Notice[] = []; 
}
 