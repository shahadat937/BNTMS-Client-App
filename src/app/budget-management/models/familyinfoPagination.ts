import { FamilyInfo } from './familyinfo';

export interface IFamilyInfoPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FamilyInfo[]; 
}

export class FamilyInfoPagination implements IFamilyInfoPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FamilyInfo[] = []; 
}
 