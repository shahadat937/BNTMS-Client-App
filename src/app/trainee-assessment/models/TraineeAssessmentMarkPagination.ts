import { TraineeAssessmentMark } from './TraineeAssessmentMark';

export interface ITraineeAssessmentMarkPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number; 
    totalItemsCount:number;
    items: TraineeAssessmentMark[]; 
}

export class TraineeAssessmentMarkPagination implements ITraineeAssessmentMarkPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeAssessmentMark[] = []; 
}
 