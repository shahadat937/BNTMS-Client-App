import {InterServiceCourseDocType} from './InterServiceCourseDocType';

export interface IInterServiceCourseDocTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InterServiceCourseDocType[];
}

export class InterServiceCourseDocTypePagination implements IInterServiceCourseDocTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InterServiceCourseDocType[] = [];


}
