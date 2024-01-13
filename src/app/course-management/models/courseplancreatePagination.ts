import { CourseplanCreate } from "./courseplancreate";
export interface ICourseplanCreatePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseplanCreate[]; 
}

export class CourseplanCreatePagination implements ICourseplanCreatePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseplanCreate[] = []; 
}
 