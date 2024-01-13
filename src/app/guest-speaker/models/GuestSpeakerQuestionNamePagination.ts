import {GuestSpeakerQuestionName} from './GuestSpeakerQuestionName';

export interface IGuestSpeakerQuestionNamePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GuestSpeakerQuestionName[]; 
}

export class GuestSpeakerQuestionNamePagination implements IGuestSpeakerQuestionNamePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: GuestSpeakerQuestionName[] = []; 
}
 