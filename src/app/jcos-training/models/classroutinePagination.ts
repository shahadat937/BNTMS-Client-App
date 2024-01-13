import { ClassRoutine } from './classroutine';

export interface IClassRoutinePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ClassRoutine[]; 
}

export class ClassRoutinePagination implements IClassRoutinePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ClassRoutine[] = []; 
}
 