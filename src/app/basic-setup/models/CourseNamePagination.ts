import {CourseName} from './CourseName';

export interface ICourseNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseName[];
}

export class CourseNamePagination implements ICourseNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseName[] = [];


}
