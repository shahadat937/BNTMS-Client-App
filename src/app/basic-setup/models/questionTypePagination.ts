import {QuestionType} from './questionType';

export interface IQuestionTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: QuestionType[];
}

export class QuestionTypePagination implements IQuestionTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: QuestionType[] = [];


}
