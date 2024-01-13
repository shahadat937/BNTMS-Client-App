import { PaymentType } from "./PaymentType";

export interface IPaymentTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: PaymentType[];
}
export class PaymentTypePagination implements IPaymentTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: PaymentType[] = [];


}
