import { TraineeSectionSelection } from './TraineeSectionSelection';

export interface ITraineeSectionSelectionPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeSectionSelection[]; 
}

export class TraineeSectionSelectionPagination implements ITraineeSectionSelectionPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeSectionSelection[] = []; 
}
 