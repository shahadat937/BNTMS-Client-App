import { FamilyNomination } from './familynomination';

export interface IFamilyNominationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FamilyNomination[]; 
}

export class FamilyNominationPagination implements IFamilyNominationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FamilyNomination[] = []; 
}
 