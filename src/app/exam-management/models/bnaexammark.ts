import { TraineeListForExamMark } from "./traineeListforexammark";

export interface BNAExamMark {
      bnaExamMarkId: number;
      bnaExamScheduleId: number,
      bnaSemesterId: number,
      bnaBatchId: number,
      baseSchoolNameId:number,
      courseNameId:number,
      examTypeId:number,
      classTypeId:number;
      bnaCurriculamTypeId:number,
      bnaSubjectNameId:number,
      branchId:number,
      courseDurationId:number,
      traineeNominationId:number,
      totalMark:string,
      passMark:string,
      isApproved:boolean,
      isApprovedBy: string,
      isApprovedDate:Date,
      remarks:string,
      status:number,
      menuPosition:number,
      courseSectionId:number,
      traineeList:TraineeListForExamMark[];
      isActive: boolean;
      reExamStatus:number;
      isAbsent:boolean;
}
