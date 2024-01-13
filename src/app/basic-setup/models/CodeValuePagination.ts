import { CodeValue } from "./CodeValue";
export interface ICodeValuePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CodeValue[];
}

export class CodeValuePagination implements ICodeValuePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CodeValue[] = [];
}