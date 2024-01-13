import { TraineeAssessmentGroup } from './TraineeAssessmentGroup';

export interface ITraineeAssessmentGroupPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number; 
    totalItemsCount:number;
    items: TraineeAssessmentGroup[]; 
}

export class TraineeAssessmentGroupPagination implements ITraineeAssessmentGroupPagination { 
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeAssessmentGroup[] = []; 
}
 