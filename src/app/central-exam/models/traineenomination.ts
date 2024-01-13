import { NumberSymbol } from "@angular/common";

export interface TraineeNomination {
      traineeNominationId: number;
      courseDurationId: number,
      courseNameId:number,
      traineeId: number,
      examCenterId:number,
      newAtemptId:number,
      indexNo:string,
      familyAllowId:string,
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
      isActive: boolean,
      schoolNameId:number,
      //courseNameId:number,
      classPeriodId:number,
    
      trainee:string,
      createdBy:string,
      dateCreated:Date,
      presentBillet:string,
      // bnaAttendanceRemarksId:number,createdBy
      // AttendanceStatus:boolean
}
