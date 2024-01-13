import { EmploymentBeforeJoinBNA } from "./EmploymentBeforeJoinBNA";
export interface IEmploymentBeforeJoinBNAPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: EmploymentBeforeJoinBNA[];
}

export class EmploymentBeforeJoinBNAPagination implements IEmploymentBeforeJoinBNAPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: EmploymentBeforeJoinBNA[] = [];
}