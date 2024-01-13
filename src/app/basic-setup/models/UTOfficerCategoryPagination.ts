import {UTOfficerCategory} from './UTOfficerCategory';

export interface IUTOfficerCategoryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: UTOfficerCategory[];
}

export class UTOfficerCategoryPagination implements IUTOfficerCategoryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: UTOfficerCategory[] = [];


}
