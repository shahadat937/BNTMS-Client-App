import {Caste} from './Caste';

export interface ICastePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Caste[];
}

export class CastePagination implements ICastePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Caste[] = [];


}
