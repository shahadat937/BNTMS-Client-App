import {Board} from './Board';

export interface IBoardPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Board[];
}

export class BoardPagination implements IBoardPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Board[] = [];


}
