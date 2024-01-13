import {Document} from './document';

export interface IDocumentPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Document[];
}

export class DocumentPagination implements IDocumentPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: Document[] = [];


}
