import {ForceType} from './ForceType';

export interface IForceTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForceType[];
}

export class ForceTypePagination implements IForceTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForceType[] = [];


}
