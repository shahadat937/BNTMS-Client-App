export interface Allowance {
    allowanceId: number;
    courseNameId: number;
    countryId: number;
    fromRankId: number;
    toRankId: number;
    durationFrom:Date;
    durationTo:Date;
    vacancy: string;
    provideByAuthority: string;
    tarminal:number;
    transit:number;
    bankCommission:number;
    allowanceCategory:string;
    allowanceCategoryId:number;
    allowancePercentageId:number;
    //menuPosition: string;
    isActive: boolean;
   
}