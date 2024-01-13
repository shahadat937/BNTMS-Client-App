import { CourseInstructor } from './courseinstructor';

export interface ICourseInstructorPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseInstructor[]; 
}

export class CourseInstructorPagination implements ICourseInstructorPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseInstructor[] = []; 
}
 