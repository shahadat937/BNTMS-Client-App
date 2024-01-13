import {Allowance} from './allowance';

export interface IAllowancePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Allowance[];
}

export class AllowancePagination implements IAllowancePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Allowance[] = [];


}
