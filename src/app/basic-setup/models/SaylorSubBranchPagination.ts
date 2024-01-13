import {SaylorSubBranch} from './SaylorSubBranch';

export interface ISaylorSubBranchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SaylorSubBranch[];
}

export class SaylorSubBranchPagination implements ISaylorSubBranchPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: SaylorSubBranch[] = [];


}