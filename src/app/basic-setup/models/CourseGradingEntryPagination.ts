import { CourseGradingEntry } from "./CourseGradingEntry";

export interface ICourseGradingEntryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseGradingEntry[];
}

export class CourseGradingEntryPagination implements ICourseGradingEntryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CourseGradingEntry[] = [];
}