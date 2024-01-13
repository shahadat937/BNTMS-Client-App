import {GuestSpeakerQuationGroup} from './GuestSpeakerQuationGroup';

export interface IGuestSpeakerQuationGroupPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GuestSpeakerQuationGroup[]; 
}

export class GuestSpeakerQuationGroupPagination implements IGuestSpeakerQuationGroupPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GuestSpeakerQuationGroup[] = []; 
}
 