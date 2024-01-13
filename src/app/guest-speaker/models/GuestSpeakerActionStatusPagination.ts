import {GuestSpeakerActionStatus} from './GuestSpeakerActionStatus';

export interface IGuestSpeakerActionStatusPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GuestSpeakerActionStatus[]; 
}

export class GuestSpeakerActionStatusPagination implements IGuestSpeakerActionStatusPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GuestSpeakerActionStatus[] = []; 
}
 