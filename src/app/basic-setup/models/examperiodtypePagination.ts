import { ExamPeriodType } from "./examperiodtype";

export interface IExamPeriodTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamPeriodType[];
}

export class ExamPeriodTypePagination implements IExamPeriodTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamPeriodType[] = [];
}