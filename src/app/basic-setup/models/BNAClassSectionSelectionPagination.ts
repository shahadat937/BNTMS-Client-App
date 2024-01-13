import { BNAClassSectionSelection } from "./BNAClassSectionSelection";
export interface IBNAClassSectionSelectionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAClassSectionSelection[];
}

export class BNAClassSectionSelectionPagination implements IBNAClassSectionSelectionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BNAClassSectionSelection[] = [];
}