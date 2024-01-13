import {Country} from './country';

export interface ICountryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Country[];
}

export class CountryPagination implements ICountryPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Country[] = [];


}
