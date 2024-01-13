import { MigrationDocument } from './migrationdocument';

export interface IMigrationDocumentPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MigrationDocument[]; 
}

export class MigrationDocumentPagination implements IMigrationDocumentPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MigrationDocument[] = []; 
}
 