import {Religion} from './religion';

export interface IReligionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Religion[];
}

export class ReligionPagination implements IReligionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Religion[] = [];


}
