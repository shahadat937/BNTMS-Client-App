import {CourseModule} from './CourseModule';

export interface ICourseModulePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseModule[];
}

export class CourseModulePagination implements ICourseModulePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseModule[] = [];


}
