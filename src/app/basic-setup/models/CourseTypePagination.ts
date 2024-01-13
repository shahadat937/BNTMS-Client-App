import { CourseType } from "./CourseType";

export interface ICourseTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseType[];
}
export class CourseTypePagination implements ICourseTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseType[] = [];


}
