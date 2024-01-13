import {CourseSection} from './CourseSection';

export interface ICourseSectionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseSection[];
}

export class CourseSectionPagination implements ICourseSectionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseSection[] = [];


}
