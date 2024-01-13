import { RoutineSoftCopyUpload } from './RoutineSoftCopyUpload';

export interface IRoutineSoftCopyUploadPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RoutineSoftCopyUpload[]; 
}

export class RoutineSoftCopyUploadPagination implements IRoutineSoftCopyUploadPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RoutineSoftCopyUpload[] = []; 
}
 