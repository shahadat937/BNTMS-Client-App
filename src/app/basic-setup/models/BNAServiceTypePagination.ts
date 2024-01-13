import {BNAServiceType} from './BNAServiceType';

export interface IBNAServiceTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAServiceType[];
}

export class BNAServiceTypePagination implements IBNAServiceTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAServiceType[] = [];


}
