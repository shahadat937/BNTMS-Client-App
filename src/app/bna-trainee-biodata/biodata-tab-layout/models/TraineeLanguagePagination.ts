import { TraineeLanguage } from "./TraineeLanguage";
export interface ITraineeLanguagePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeLanguage[];
}

export class TraineeLanguagePagination implements ITraineeLanguagePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: TraineeLanguage[] = [];
}