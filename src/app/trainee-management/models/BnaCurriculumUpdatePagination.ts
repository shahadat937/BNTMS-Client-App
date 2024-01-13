import { BnaCurriculumUpdate } from './BnaCurriculumUpdate';

export interface IBnaCurriculumUpdatePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaCurriculumUpdate[]; 
}

export class BnaCurriculumUpdatePagination implements IBnaCurriculumUpdatePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BnaCurriculumUpdate[] = []; 
}
 