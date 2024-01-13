import {Division} from './Division';

export interface IDivisionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Division[];
}

export class DivisionPagination implements IDivisionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Division[] = [];


}
