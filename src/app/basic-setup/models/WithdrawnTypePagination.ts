import { WithdrawnType } from "./WithdrawnType";

export interface IWithdrawnTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: WithdrawnType[];
}

export class WithdrawnTypePagination implements IWithdrawnTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: WithdrawnType[] = [];
}