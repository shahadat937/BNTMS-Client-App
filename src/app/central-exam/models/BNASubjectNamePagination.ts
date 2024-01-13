import { BNASubjectName } from "./BNASubjectName";
export interface IBNASubjectNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASubjectName[];
}

export class BNASubjectNamePagination implements IBNASubjectNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASubjectName[] = [];


}
