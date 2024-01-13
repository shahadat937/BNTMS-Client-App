import { Event } from './event';

export interface IEventPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Event[]; 
}

export class EventPagination implements IEventPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Event[] = []; 
}
 