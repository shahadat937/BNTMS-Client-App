import { ReadingMaterial } from './readingmaterial';

export interface IReadingMaterialPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ReadingMaterial[]; 
}

export class ReadingMaterialPagination implements IReadingMaterialPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ReadingMaterial[] = []; 
}
 