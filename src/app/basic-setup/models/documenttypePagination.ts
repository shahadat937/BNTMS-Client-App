import { DocumentType } from "./documenttype";

export interface IDocumentTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: DocumentType[];
}

export class DocumentTypePagination implements IDocumentTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: DocumentType[] = [];
}