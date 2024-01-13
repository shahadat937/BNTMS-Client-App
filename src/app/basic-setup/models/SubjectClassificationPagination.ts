import {SubjectClassification} from './SubjectClassification';

export interface ISubjectClassificationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectClassification[];
}

export class SubjectClassificationPagination implements ISubjectClassificationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SubjectClassification[] = [];


}
