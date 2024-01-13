import {Occupation} from './occupation';

export interface IOccupationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Occupation[];
}

export class OccupationPagination implements IOccupationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Occupation[] = [];


}
