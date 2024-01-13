export interface InstallmentPaidDetail {
      installmentPaidDetailId: number;
      courseDurationId: number,
      traineeId: number,
      totalUsd: string,
      totalBdt: string,
      scheduleDate: Date,
      paymentCompletedStatus: number,
      remarks:string,
      status:number,
      menuPosition:number,
      isActive: boolean
}
