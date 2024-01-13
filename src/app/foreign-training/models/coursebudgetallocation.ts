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
    presentBalance: number,
    menuPosition: number,
    isActive: boolean
}
