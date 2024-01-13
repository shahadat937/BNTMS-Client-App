import {SaylorBranch} from './SaylorBranch';

export interface ISaylorBranchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SaylorBranch[];
}

export class SaylorBranchPagination implements ISaylorBranchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SaylorBranch[] = [];


}