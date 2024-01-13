import { CourseWeek } from "./courseweek";
export interface ICourseWeekPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseWeek[]; 
}

export class CourseWeekPagination implements ICourseWeekPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseWeek[] = []; 
}
 