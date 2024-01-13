import {AccountType} from './AccountType';

export interface IAccountTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AccountType[];
}

export class AccountTypePagination implements IAccountTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: AccountType[] = [];


}
