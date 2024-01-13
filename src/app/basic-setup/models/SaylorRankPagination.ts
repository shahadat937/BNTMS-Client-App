import {SaylorRank} from './SaylorRank';

export interface ISaylorRankPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SaylorRank[];
}

export class SaylorRankPagination implements ISaylorRankPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SaylorRank[] = [];


}