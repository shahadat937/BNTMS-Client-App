import { Feature } from "./feature";
export interface IFeaturePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Feature[];
}

export class FeaturePagination implements IFeaturePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Feature[] = [];


}
