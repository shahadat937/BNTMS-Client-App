import { TraineeCourseStatus } from "./traineecoursestatus";

export interface ItraineecoursestatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeCourseStatus[];
}

export class traineecoursestatusPagination implements ItraineecoursestatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeCourseStatus[] = [];
}