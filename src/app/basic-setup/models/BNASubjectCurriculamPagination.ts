import {BNASubjectCurriculam} from './BNASubjectCurriculam'
export interface IBNASubjectCurriculamPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASubjectCurriculam[];
}

export class BNASubjectCurriculamPagination implements IBNASubjectCurriculamPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASubjectCurriculam[] = [];


}
