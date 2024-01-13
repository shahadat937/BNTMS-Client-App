import {ForeignTrainingCourseReport} from './ForeignTrainingCourseReport';

export interface IForeignTrainingCourseReportPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignTrainingCourseReport[];
}

export class ForeignTrainingCourseReportPagination implements IForeignTrainingCourseReportPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignTrainingCourseReport[] = [];


}
