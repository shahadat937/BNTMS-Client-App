import { SubjectMark } from "./SubjectMark";
export interface ISubjectMarkPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectMark[];
}

export class SubjectMarkPagination implements ISubjectMarkPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectMark[] = [];


}
