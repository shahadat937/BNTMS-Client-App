import { ForeignCourseDocType } from './ForeignCourseDocType'

export interface IForeignCourseDocTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseDocType[]; 
}

export class ForeignCourseDocTypePagination implements IForeignCourseDocTypePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseDocType[] = []; 
}
 