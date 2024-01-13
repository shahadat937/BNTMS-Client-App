import { CovidVaccine } from "./CovidVaccine";
export interface ICovidVaccinePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CovidVaccine[];
}

export class CovidVaccinePagination implements ICovidVaccinePagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: CovidVaccine[] = [];
} 