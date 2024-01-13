import {BNAPromotionStatus} from './BNAPromotionStatus';

export interface IBNAPromotionStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAPromotionStatus[];
}

export class BNAPromotionStatusPagination implements IBNAPromotionStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAPromotionStatus[] = [];


}
