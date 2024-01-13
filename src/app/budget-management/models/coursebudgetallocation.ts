export interface CourseBudgetAllocation {
    courseBudgetAllocationId: number,
    courseTypeId: number,
    courseNameId: number,
    courseDurationId: number,
    traineeId: number,
    budgetCodeId: number,
    paymentTypeId: number,
    installmentAmount: number,
    installmentDate: Date,
    nextInstallmentDate:Date,
    traineeName:string,
    presentBalance: number,
    paymentConfirmStatus: number,
    receivedStatus: number,
    menuPosition: number,
    status:number,
    isActive: boolean
}
