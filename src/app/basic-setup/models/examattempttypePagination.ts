import { ExamAttemptType } from "./examattempttype";

export interface IExamAttemptTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamAttemptType[];
}
export class ExamAttemptTypePagination implements IExamAttemptTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamAttemptType[] = [];


}
