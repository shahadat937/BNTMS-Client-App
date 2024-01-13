import { TraineeListForExamMark } from "../../exam-management/models/traineeListforexammark";
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
      traineeList:TraineeListForExamMark[];
      isActive: boolean
}
