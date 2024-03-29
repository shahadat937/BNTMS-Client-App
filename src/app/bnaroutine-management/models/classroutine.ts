export interface ClassRoutine {
      classRoutineId: number;
      courseModuleId:number,
      classPeriodId: number,
      baseSchoolNameId:number,
      baseSchoolName:string,
      classCountPeriod:number,
      subjectCountPeriod:number,
      courseDurationId: number,
      courseDuration:string,
      bnaSubjectNameId: number,
      courseNameId: number,
      branchId: number,
      courseWeekId: number,
      courseWeek:string,
      courseName: string;
      classTypeId:number,
      examMarkComplete:number,
      classLocation:string,
      remarks:string,
      date:Date,
      timeDuration:string,
      isApproved:boolean,
      approvedBy:string,
      approvedDate:Date,
      status:number,
      menuPosition:number,
      editedRoutineList:ClassRoutine[],
      isActive: boolean,
      attendanceComplete:number,
}
