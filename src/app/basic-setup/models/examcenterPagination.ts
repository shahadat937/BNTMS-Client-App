import { ExamCenter } from "./examcenter";

export interface IExamCenterPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamCenter[];
}
export class ExamCenterPagination implements IExamCenterPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamCenter[] = [];


}
