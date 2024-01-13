import { TraineeNomination } from './traineenomination';

export interface ITraineeNominationPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeNomination[]; 
}

export class TraineeNominationPagination implements ITraineeNominationPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeNomination[] = []; 
}
 