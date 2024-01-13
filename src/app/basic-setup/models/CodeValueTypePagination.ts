import {CodeValueType} from './CodeValueType';

export interface ICodeValueTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CodeValueType[];
}

export class CodeValueTypePagination implements ICodeValueTypePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CodeValueType[] = [];
}
