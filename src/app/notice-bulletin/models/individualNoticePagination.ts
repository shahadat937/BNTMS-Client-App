import { IndividualNotice } from "./individualNotice";
export interface IIndividualNoticePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: IndividualNotice[]; 
}

export class NoticePagination implements IIndividualNoticePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: IndividualNotice[] = []; 
}
 