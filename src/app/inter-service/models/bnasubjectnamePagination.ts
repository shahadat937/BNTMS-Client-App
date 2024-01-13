import { BnaSubjectName } from "./bnasubjectname";
export interface IBnaSubjectNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaSubjectName[];
}

export class BnaSubjectNamePagination implements IBnaSubjectNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaSubjectName[] = [];


}
