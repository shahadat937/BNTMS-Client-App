import { ClassType } from "./classtype";

export interface IClassTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ClassType[];
}

export class ClassTypePagination implements IClassTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ClassType[] = [];
}