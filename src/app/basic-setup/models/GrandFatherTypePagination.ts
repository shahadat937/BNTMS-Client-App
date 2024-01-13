import {GrandFatherType} from './GrandFatherType';

export interface IGrandFatherTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GrandFatherType[];
}

export class GrandFatherTypePagination implements IGrandFatherTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GrandFatherType[] = [];


}
