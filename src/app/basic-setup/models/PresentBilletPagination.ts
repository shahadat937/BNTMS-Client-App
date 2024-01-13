import {PresentBillet} from './PresentBillet';

export interface IPresentBilletPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: PresentBillet[];
}

export class PresentBilletPagination implements IPresentBilletPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: PresentBillet[] = [];


}
