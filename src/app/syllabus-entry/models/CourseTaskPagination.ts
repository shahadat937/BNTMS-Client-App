import {CourseTask} from './CourseTask';

export interface ICourseTaskPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseTask[]; 
}

export class CourseTaskPagination implements ICourseTaskPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseTask[] = []; 
}
 