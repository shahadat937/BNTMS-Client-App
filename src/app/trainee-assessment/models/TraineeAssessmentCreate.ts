export interface TraineeAssessmentCreate {           
      traineeAssessmentCreateId: number;
      assessmentName: string,
      courseDurationId: number;
      baseSchoolNameId: number;
      startDate: Date;
      endDate: Date;
      remarks: string,
      status: number;
      menuPosition: number;
      isActive:boolean;
}
