import {AllowanceCategory} from './allowancecategory';

export interface IAllowanceCategoryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AllowanceCategory[];
}

export class AllowanceCategoryPagination implements IAllowanceCategoryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AllowanceCategory[] = [];


}
