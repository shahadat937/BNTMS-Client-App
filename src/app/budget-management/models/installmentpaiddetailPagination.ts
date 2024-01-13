import { InstallmentPaidDetail } from './installmentpaiddetail';

export interface IInstallmentPaidDetailPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InstallmentPaidDetail[]; 
}

export class InstallmentPaidDetailPagination implements IInstallmentPaidDetailPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InstallmentPaidDetail[] = []; 
}
 