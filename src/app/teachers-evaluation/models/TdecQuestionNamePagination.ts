import {TdecQuestionName} from './TdecQuestionName';

export interface ITdecQuestionNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TdecQuestionName[]; 
}

export class TdecQuestionNamePagination implements ITdecQuestionNamePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TdecQuestionName[] = []; 
}
 