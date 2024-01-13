import { PaymentDetail } from './paymentdetail';

export interface IPaymentDetailPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: PaymentDetail[]; 
}

export class PaymentDetailPagination implements IPaymentDetailPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: PaymentDetail[] = []; 
}
 