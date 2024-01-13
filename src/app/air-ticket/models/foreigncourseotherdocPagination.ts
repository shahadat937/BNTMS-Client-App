import { ForeignCourseOtherDoc } from './ForeignCourseOtherDoc';

export interface IForeignCourseOtherDocPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseOtherDoc[]; 
}

export class ForeignCourseOtherDocPagination implements IForeignCourseOtherDocPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseOtherDoc[] = []; 
}
 