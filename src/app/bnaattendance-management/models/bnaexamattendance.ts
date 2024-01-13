export interface BNAExamAttendance {
      bnaExamAttendanceId: number;
      bnaSemesterDurationId: number,
      bnaSemesterId: number,
      bnaBatchId: number,
      bnaExamScheduleId: number,
      bnaSubjectNameId:number,
      traineeId:number,
      examTypeId:number,
      examDate:Date,
      isApproved:boolean,
      aprovedUser: string,
      approvedDate:Date,
      status:number,
      menuPosition:number,
      isActive: boolean,

      baseSchoolNameId:number,
      courseNameId:number,
      classPeriodId:number, 
}
