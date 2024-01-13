import {BNAAttendanceRemarks} from './BNAAttendanceRemarks';

export interface IBNAAttendanceRemarksPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAAttendanceRemarks[];
}

export class BNAAttendanceRemarksPagination implements IBNAAttendanceRemarksPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAAttendanceRemarks[] = [];


}
