import { RoleFeature } from "./rolefeature";
export interface IRoleFeaturePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RoleFeature[];
}

export class RoleFeaturePagination implements IRoleFeaturePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: RoleFeature[] = [];


}
