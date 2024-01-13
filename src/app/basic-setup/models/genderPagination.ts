import {Gender} from './gender';

export interface IGenderPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Gender[];
}

export class GenderPagination implements IGenderPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Gender[] = [];


}
