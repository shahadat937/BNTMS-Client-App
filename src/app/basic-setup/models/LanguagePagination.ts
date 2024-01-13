import { Language } from "./Language";
export interface ILanguagePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Language[];
}

export class LanguagePagination implements ILanguagePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Language[] = [];
}