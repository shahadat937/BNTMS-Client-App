export interface BnaClassSchedule {
      bnaClassScheduleId: number;
      bnaSemesterDurationId:number,
      bnaSemesterId: number,
      bnaBatchId:number,
      bnaSubjectNameId: number,
      bnaClassSectionSelectionId: number,
      classPeriodId: number,
      bnaClassScheduleStatusId: number,
      traineeId:number,
      date:Date,
      classLocation:string;
      classCompletedStatus:boolean,
      durationForm:string,
      durationTo:string,
      status:number,
      menuPosition:number,
      isActive: boolean
}
