import { SocialMediaType } from "./SocialMediaType";

export interface ISocialMediaTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SocialMediaType[];
}
export class SocialMediaTypePagination implements ISocialMediaTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SocialMediaType[] = [];
}