import {SubjectType} from './subjectType';

export interface ISubjectTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectType[];
}

export class SubjectTypePagination implements ISubjectTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectType[] = [];


}