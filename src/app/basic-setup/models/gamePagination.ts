import {Game} from './game';

export interface IGamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Game[];
}

export class GamePagination implements IGamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Game[] = [];


}
