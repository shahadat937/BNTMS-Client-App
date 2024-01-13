import { TraineeList } from './traineeList';

export interface AttendanceList {
      attendanceId: number;
      baseSchoolNameId:number,
      courseNameId:number,
      classPeriodId: number,
      courseSectionId: number,
      attendanceDate:Date,
      classLeaderName:string,
    //  bnaAttendanceRemarksId:number,
      traineeList: TraineeList[]; 
      
}
