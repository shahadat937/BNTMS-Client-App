import {BaseName} from './BaseName';

export interface IBaseNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BaseName[];
}

export class BaseNamePagination implements IBaseNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BaseName[] = [];


}
