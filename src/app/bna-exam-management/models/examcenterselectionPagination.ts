import { ExamCenterSelection } from './examcenterselection';

export interface IExamCenterSelectionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamCenterSelection[]; 
}

export class ExamCenterSelectionPagination implements IExamCenterSelectionPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ExamCenterSelection[] = []; 
}
 