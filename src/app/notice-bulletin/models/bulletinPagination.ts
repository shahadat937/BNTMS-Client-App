import { Bulletin } from './bulletin';

export interface IBulletinPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Bulletin[]; 
}

export class BulletinPagination implements IBulletinPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Bulletin[] = []; 
}
 