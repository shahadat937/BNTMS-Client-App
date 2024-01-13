import { Notification } from './notification';

export interface INotificationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Notification[]; 
}

export class NotificationPagination implements INotificationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Notification[] = []; 
}
 