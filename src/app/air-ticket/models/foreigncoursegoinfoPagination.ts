import { ForeignCourseGOInfo } from './ForeignCourseGOInfo';

export interface IForeignCourseGOInfoPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseGOInfo[]; 
}

export class ForeignCourseGOInfoPagination implements IForeignCourseGOInfoPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseGOInfo[] = []; 
}
 