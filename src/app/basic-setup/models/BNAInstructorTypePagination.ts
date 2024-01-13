import {BNAInstructorType} from './BNAInstructorType';

export interface IBNAInstructorTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAInstructorType[];
}

export class BNAInstructorTypePagination implements IBNAInstructorTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAInstructorType[] = [];


}
