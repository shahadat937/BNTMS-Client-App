import {ColorOfEye} from './colorOfEye';

export interface IColorOfEyePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ColorOfEye[];
}

export class ColorOfEyePagination implements IColorOfEyePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: ColorOfEye[] = [];


}
