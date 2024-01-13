import { Question } from "./Question";
export interface IQuestionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Question[];
}

export class QuestionPagination implements IQuestionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Question[] = [];
}