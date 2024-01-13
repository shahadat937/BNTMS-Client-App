import {AllowancePercentage} from './allowancepercentage';

export interface IAllowancePercentagePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AllowancePercentage[];
}

export class AllowancePercentagePagination implements IAllowancePercentagePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AllowancePercentage[] = [];


}
