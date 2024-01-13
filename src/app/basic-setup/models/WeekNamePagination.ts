import { WeekName } from "./WeekName";

export interface IWeekNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: WeekName[];
}
export class WeekNamePagination implements IWeekNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: WeekName[] = [];


}
