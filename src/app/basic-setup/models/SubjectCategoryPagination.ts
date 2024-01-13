import {SubjectCategory} from './subjectCategory';

export interface ISubjectCategoryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectCategory[];
}

export class SubjectCategoryPagination implements ISubjectCategoryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectCategory[] = [];


}