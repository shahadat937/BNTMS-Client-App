import {ExamType} from './examType';

export interface IExamTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamType[];
}

export class ExamTypePagination implements IExamTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamType[] = [];


}
