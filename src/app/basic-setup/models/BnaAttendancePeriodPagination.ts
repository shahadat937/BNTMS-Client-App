import {BnaAttendancePeriod} from './BnaAttendancePeriod';

export interface IBnaAttendancePeriodPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaAttendancePeriod[];
}

export class BnaAttendancePeriodPagination implements IBnaAttendancePeriodPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaAttendancePeriod[] = [];


}
