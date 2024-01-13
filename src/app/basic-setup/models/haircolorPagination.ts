import {HairColor} from './haircolor';

export interface IHairColorPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: HairColor[];
}

export class HairColorPagination implements IHairColorPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: HairColor[] = [];


}
