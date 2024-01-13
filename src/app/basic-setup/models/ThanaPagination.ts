import {Thana} from './Thana';

export interface IThanaPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Thana[];
}

export class ThanaPagination implements IThanaPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Thana[] = [];


}
