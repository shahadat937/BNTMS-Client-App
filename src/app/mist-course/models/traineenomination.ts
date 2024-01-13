import { NumberSymbol } from "@angular/common";

export interface TraineeNomination {
      traineeNominationId: number;
      courseDurationId: number,
      courseNameId:number,
      traineeId: number,
      indexNo:string,
      familyAllowId:string,
      courseAttendState:number,
      courseAttendStateRemark:string,
      traineeCourseStatusId: number,
      saylorRankId: number,
      rankId: number,
      saylorBranchId: number,
      saylorSubBranchId: number,
      branchId: number,
      withdrawnDocId: number,
      withdrawnRemarks:string,
      withdrawnDate: Date,
      status:number,
      menuPosition:number,
      isActive: boolean

      schoolNameId:number,
      courseName:string,
      schoolName:string,
      courseDuration:string,
      classPeriodId:number,
      traineeName:string,
      traineePNo:string
      // bnaAttendanceRemarksId:number,
      // AttendanceStatus:boolean
}
