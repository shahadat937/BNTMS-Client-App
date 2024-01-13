import {Nationality} from './nationality';

export interface INationalityPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Nationality[];
}

export class NationalityPagination implements INationalityPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Nationality[] = [];


}
