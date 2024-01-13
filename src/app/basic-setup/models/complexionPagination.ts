import { Complexion } from "./complexion";
export interface IComplexionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Complexion[];
}

export class ComplexionPagination implements IComplexionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Complexion[] = [];
}