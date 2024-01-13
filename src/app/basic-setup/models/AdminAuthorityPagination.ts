import {AdminAuthority} from './AdminAuthority';

export interface IAdminAuthorityPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AdminAuthority[];
}

export class AdminAuthorityPagination implements IAdminAuthorityPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AdminAuthority[] = [];


}
