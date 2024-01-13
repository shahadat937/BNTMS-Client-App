import {BnaClassTestType} from './BnaClassTestType';

export interface IBnaClassTestTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaClassTestType[];
}

export class BnaClassTestTypePagination implements IBnaClassTestTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaClassTestType[] = [];


}
