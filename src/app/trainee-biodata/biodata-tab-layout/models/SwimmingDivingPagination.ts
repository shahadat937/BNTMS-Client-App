import { SwimmingDiving } from "./SwimmingDiving";
export interface ISwimmingDivingPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SwimmingDiving[];
}

export class SwimmingDivingPagination implements ISwimmingDivingPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SwimmingDiving[] = [];
}