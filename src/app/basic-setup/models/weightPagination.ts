import { Weight } from "./weight";

export interface IWeightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Weight[];
}

export class WeightPagination implements IWeightPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Weight[] = [];
}