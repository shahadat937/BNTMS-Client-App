import {DefenseType} from './defenseType';

export interface IDefenseTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: DefenseType[];
}

export class DefenseTypePagination implements IDefenseTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: DefenseType[] = [];


}
