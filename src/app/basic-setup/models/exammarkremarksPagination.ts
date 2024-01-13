import {ExamMarkRemarks} from './exammarkremarks';

export interface IExamMarkRemarksPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamMarkRemarks[];
}

export class ExamMarkRemarksPagination implements IExamMarkRemarksPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamMarkRemarks[] = [];


}
