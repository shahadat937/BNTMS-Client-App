import { TraineeAssessmentCreate } from './TraineeAssessmentCreate';

export interface ITraineeAssessmentCreatePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number; 
    totalItemsCount:number;
    items: TraineeAssessmentCreate[]; 
}

export class TraineeAssessmentCreatePagination implements ITraineeAssessmentCreatePagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeAssessmentCreate[] = []; 
}
 