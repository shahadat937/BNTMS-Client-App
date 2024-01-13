export interface CourseDuration {
      courseDurationId: number;
      courseNameId: number,
      courseName: string;
      courseTypeId: number,
      baseNameId:number,
      fiscalYearId:number,
      countryId:number,
      courseTitle:string,
      baseSchoolNameId: number,
      durationFrom: Date,
      durationTo: Date,
      professional:string,
      nbcd:string,
      remark:string,
      
      isCompletedStatus:number,
      isApproved:number,
      approvedBy:string,
      approvedDate:Date,
      status:number,
      menuPosition:number,
      isActive: boolean
}
