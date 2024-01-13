import { MilitaryTraining } from "./MilitaryTraining";
export interface IMilitaryTrainingPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MilitaryTraining[];
}

export class MilitaryTrainingPagination implements IMilitaryTrainingPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: MilitaryTraining[] = [];
}