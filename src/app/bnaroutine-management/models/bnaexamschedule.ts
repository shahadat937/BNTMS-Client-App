export interface BNAExamSchedule {
      bnaExamScheduleId: number;
      examDate: Date,
      bnaSemesterDurationId:number,
      //semesterSubjectLogId: number,
      //bnaSemesterSubjectAssignId: number,
      bnaSubjectNameId: number,
      bnaSemesterId:number,
      bnaBatchId: number,
      examTypeId:number,
      durationFrom:Date,
      durationTo:Date,
      examLocation:string,
      examSheduleStatus:number,
      isApproved:number,
      approvedBy:string,
      isApprovedDate:Date,
      status:number,
      menuPosition:number,
      isActive: boolean
}
