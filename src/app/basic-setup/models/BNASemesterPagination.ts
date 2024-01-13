import {BNASemester} from './BNASemester';

export interface IBNASemesterPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASemester[];
}

export class BNASemesterPagination implements IBNASemesterPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNASemester[] = [];


}
