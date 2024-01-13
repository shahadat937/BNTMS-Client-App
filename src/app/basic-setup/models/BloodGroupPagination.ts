import {BloodGroup} from './BloodGroup';

export interface IBloodGroupPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BloodGroup[];
}

export class BloodGroupPagination implements IBloodGroupPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BloodGroup[] = [];


}
