import { CourseDuration } from './courseduration';

export interface ICourseDurationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseDuration[]; 
}

export class CourseDurationPagination implements ICourseDurationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseDuration[] = []; 
}
 