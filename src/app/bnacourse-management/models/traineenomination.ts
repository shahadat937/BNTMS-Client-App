import { NumberSymbol } from "@angular/common";

export interface TraineeNomination {
      traineeNominationId: number;
      courseDurationId: number,
      courseNameId:number,
      traineeId: number,
      indexNo:string,
      familyAllowId:string,
      traineeCourseStatusId: number,
      withdrawnDocId: number,
      withdrawnRemarks:string,
      withdrawnDate: Date,
      status:number,
      menuPosition:number,
      isActive: boolean

      schoolNameId:number,
      //courseNameId:number,
      classPeriodId:number,

      // bnaAttendanceRemarksId:number,
      // AttendanceStatus:boolean
}
