import {BIODataGeneralInfo} from './BIODataGeneralInfo';

export interface IBIODataGeneralInfoPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BIODataGeneralInfo[];
}

export class BIODataGeneralInfoPagination implements IBIODataGeneralInfoPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: BIODataGeneralInfo[] = [];


}
