import { MembershipType } from "./MembershipType";
export interface IMembershipTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MembershipType[];
}

export class MembershipTypePagination implements IMembershipTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MembershipType[] = [];
}