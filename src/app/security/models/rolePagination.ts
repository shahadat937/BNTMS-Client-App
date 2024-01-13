import {Role} from './role';

export interface IRolePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Role[];
}

export class RolePagination implements IRolePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Role[] = [];


}
