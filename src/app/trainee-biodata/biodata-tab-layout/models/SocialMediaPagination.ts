import { SocialMedia } from "./SocialMedia";
export interface ISocialMediaPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SocialMedia[];
}

export class SocialMediaPagination implements ISocialMediaPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SocialMedia[] = [];
}