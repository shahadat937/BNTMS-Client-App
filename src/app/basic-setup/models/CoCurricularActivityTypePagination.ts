import {CoCurricularActivityType} from './CoCurricularActivityType';

export interface ICoCurricularActivityTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CoCurricularActivityType[];
}

export class CoCurricularActivityTypePagination implements ICoCurricularActivityTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CoCurricularActivityType[] = [];


}
