import {UTOfficerType} from './UTOfficerType';

export interface IUTOfficerTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: UTOfficerType[];
}

export class UTOfficerTypePagination implements IUTOfficerTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: UTOfficerType[] = [];


}
