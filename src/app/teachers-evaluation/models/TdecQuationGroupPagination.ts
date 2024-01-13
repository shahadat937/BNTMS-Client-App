import {TdecQuationGroup} from './TdecQuationGroup';

export interface ITdecQuationGroupPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TdecQuationGroup[]; 
}

export class TdecQuationGroupPagination implements ITdecQuationGroupPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TdecQuationGroup[] = []; 
}
 