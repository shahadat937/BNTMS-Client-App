import { KindOfSubject } from "./KindOfSubject";
 
export interface IKindOfSubjectPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: KindOfSubject[];
} 

export class KindOfSubjectPagination implements IKindOfSubjectPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: KindOfSubject[] = [];
}