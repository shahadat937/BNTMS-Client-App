import {RelationType} from './RelationType';

export interface IRelationTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RelationType[];
}

export class RelationTypePagination implements IRelationTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RelationType[] = [];


}
