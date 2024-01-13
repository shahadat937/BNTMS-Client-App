import {BNACurriculamType} from './bNACurriculamType';

export interface IBNACurriculamTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNACurriculamType[];
}

export class BNACurriculamTypePagination implements IBNACurriculamTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNACurriculamType[] = [];
}
