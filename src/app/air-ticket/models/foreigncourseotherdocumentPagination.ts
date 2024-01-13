import { ForeignCourseOtherDocument } from './ForeignCourseOtherDocument';

export interface IForeignCourseOtherDocumentPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseOtherDocument[]; 
}

export class ForeignCourseOtherDocumentPagination implements IForeignCourseOtherDocumentPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ForeignCourseOtherDocument[] = []; 
}
 