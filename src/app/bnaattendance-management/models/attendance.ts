export interface Attendance {
      attendanceId: number;
      classRoutineId: number,
      baseSchoolNameId:number,
      courseNameId:number,
      bnaSubjectNameId: number,
      classPeriodId: number,
      bnaAttendanceRemarksId: number,
      attendanceDate:Date,
      classLeaderName:string,
      attendanceStatus:boolean,
      isApproved:boolean,
      approvedUser: string,
      approvedDate:Date,
      status:number,
      menuPosition:number,
      isActive: boolean
}
