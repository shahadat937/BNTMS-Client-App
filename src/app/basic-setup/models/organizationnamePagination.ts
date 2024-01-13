import {OrganizationName} from './organizationname';

export interface IOrganizationNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: OrganizationName[];
}

export class OrganizationNamePagination implements IOrganizationNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: OrganizationName[] = [];


}
