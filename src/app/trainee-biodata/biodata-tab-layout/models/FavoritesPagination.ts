import { Favorites } from "./Favorites";
export interface IFavoritesPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Favorites[];
}

export class FavoritesPagination implements IFavoritesPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Favorites[] = [];
}