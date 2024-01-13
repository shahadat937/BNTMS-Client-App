import {FavoritesType} from './favoritesType';

export interface IFavoritesTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FavoritesType[];
}

export class FavoritesTypePagination implements IFavoritesTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: FavoritesType[] = [];


}
