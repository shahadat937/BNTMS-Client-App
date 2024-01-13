import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpInstructorInfoByTraineeId } from '../models/spinstructorinfobytraineeid';

import { map } from 'rxjs';
import { SpOfficerDetails } from 'src/app/admin/dashboard/models/spofficerdetails';
import { ClassRoutine } from 'src/app/routine-management/models/classroutine';

@Injectable({
  providedIn: 'root'
})
export class ForeignDashboardService {
  baseUrl = environment.apiUrl;
  SpInstructorInfoByTraineeId: SpInstructorInfoByTraineeId[] = [];
  constructor(private http: HttpClient) { }


  // getSpInstructorInfoByTraineeId(id:number) {

  //   return this.http.get<SpInstructorInfoByTraineeId>(this.baseUrl + '/dashboard/get-instructorInfoByTraineeId?TraineeId='+id).pipe(
  //     map(response => {
        
  //       return response;
  //     })
  //   ); 
  // }

  // getSpInstructorRoutineByTraineeId(id:number) {

  //   return this.http.get<any>(this.baseUrl + '/dashboard/get-instructorRoutineByTraineeId?TraineeId='+id).pipe(
  //     map(response => {
        
  //       return response;
  //     })
  //   ); 
  // }

  // getSpReadingMaterialByTraineeId(id:number) {

  //   return this.http.get<any>(this.baseUrl + '/dashboard/get-readingMaterialByTraineeId?TraineeId='+id).pipe(
  //     map(response => {
        
  //       return response;
  //     })
  //   ); 
  // }


  getnominatedCourseListFromSpRequestBySchoolId(current, schoolId) {

    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-nominatedCourseListFromSpRequestBySchoolId?CurrentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getnominatedForeignTraineeFromSpRequestBySchoolId(current, schoolId,officerTypeId) {

    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-nominatedForeignTraineeFromSpRequestBySchoolId?CurrentDate='+current+'&baseSchoolNameId='+schoolId+'&officerTypeId='+officerTypeId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getrunningCourseTotalOfficerListBySchoolRequest(current, traineeStatusId, schoolId) {
    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-runningCourseTotalOfficerListBySchool?TraineeStatusId='+traineeStatusId+'&CurrentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {
        
        return response;
      })
    );
  }

  getRunningCourseTotalTraineeByCourseType(currentDate,courseTypeId,traineeStatusId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-runningCourseTotalTraineeByCourseType?currentDate='+currentDate+'&courseTypeId='+courseTypeId+'&traineeStatusId='+traineeStatusId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getBudgetCodeList(){
    return this.http.get<any[]>(this.baseUrl + '/budget-code/get-budgetCodesRequest').pipe(
      map(response => {        
        return response;
      })
    );
  }
  
  getStudentOtherDocInfoList(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-studentOtherDocInfoList?courseDurationId='+courseDurationId).pipe(
      map(response => {        
        return response;
      })
    );
  }
  
  getRemittanceNotificationList(){
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-remittanceNotification').pipe(
      map(response => {        
        return response;
      })
    );
  }

  // getrunningForeignCourseList(current, courseTypeId) {
  //   return this.http.get<any[]>(this.baseUrl + '/dashboard/get-runningCourseDurationfromprocedure?courseTypeId='+courseTypeId+'&CurrentDate='+current).pipe(
  //     map(response => {
        
  //       return response;
  //     })
  //   );
  // }
 
  getSpRunningForeignCourseDurationsByType(id:number,current:string,viewStatus:number) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-runningCourseDurationfromprocedure?courseTypeId='+id+'&CurrentDate='+current+'&viewStatus='+viewStatus).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  getSpUpcomingCourseDurationsByTypeForInterService(id:number,current:string) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-upcomingCourseDurationforInterServicefromprocedure?courseTypeId='+id+'&CurrentDate='+current).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getnominatedCourseListFromSpRequest(current:string) {

    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-nominatedCourseListFromSpRequest?CurrentDate='+current).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getUpcomingCourseListBySchool(current, courseTypeId, schoolId) {
    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-upcomingCourseDurationBySchool?courseTypeId='+courseTypeId+'&CurrentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {
        
        return response;
      })
    );
  }

  getCurrentRoutineBySchool(current, schoolId) {
    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-currentRoutineInfoBySchoolId?currentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {
        
        return response;
      })
    );
  }

  getCurrentAttendanceBySchool(current, schoolId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-currentAttendanceInfoBySchoolId?currentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCurrentRoutineDetailList(current, courseNameId, schoolId) {
    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-currentRoutineDetailsBySchoolId?currentDate='+current+'&courseNameId='+courseNameId+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {        
        return response;
      })
    );
  }

  getCurrentRoutineForDb(schoolId,courseNameId,durationId) {
    return this.http.get<any[]>(this.baseUrl + '/class-routine/get-classRoutineForSchoolDashboard?baseSchoolNameId='+schoolId+'&courseNameId='+courseNameId+'&courseDurationId='+durationId).pipe(
      map(response => {        
        return response;
      })
    );
  }

  getCurrentAttendanceDetailList(current, courseNameId, schoolId, durationId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-currentAttendanceDetailsBySchoolId?currentDate='+current+'&courseNameId='+courseNameId+'&baseSchoolNameId='+schoolId+'&courseDurationId='+durationId).pipe(
      map(response => {        
        return response;
      })
    );
  }

  getCurrentAttendanceDetailByRoutineList( courseNameId, schoolId, durationId, routineId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-currentAttendanceDetailsByRoutine?courseNameId='+courseNameId+'&baseSchoolNameId='+schoolId+'&courseDurationId='+durationId+'&classRoutineId='+routineId).pipe(
      map(response => {        
        return response;
      })
    );
  }

  getRoutineBySchoolId(courseNameId, schoolId) {

    return this.http.get<ClassRoutine[]>(this.baseUrl + '/dashboard/get-routineInfoBySchoolId?courseNameId='+courseNameId+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getRoutineByCourse(id:number) {

    return this.http.get<ClassRoutine[]>(this.baseUrl + '/dashboard/get-routineInfoByCourse?baseSchoolNameId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  getInstructorByCourse(id:number) {

    return this.http.get<ClassRoutine[]>(this.baseUrl + '/dashboard/get-instructorByCourse?baseSchoolNameId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getInstructorDetailByCourse(courseId, schoolId,durationId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-instructorDetailByCourse?baseSchoolNameId='+schoolId+'&courseNameId='+courseId+'&courseDurationId='+durationId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getPendingExamEvaluation(id:number) {
    return this.http.get<ClassRoutine[]>(this.baseUrl + '/dashboard/get-pendingExamEvaluation?baseSchoolNameId='+id).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getTraineeAbsentList(current,schoolId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-traineeAbsentList?CurrentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getTraineeAbsentDetail(id:number) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-traineeAttendanceDetails?traineeId='+id).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getReadingMetarialBySchool(id:number) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-readingMaterialBySchool?baseSchoolNameId='+id).pipe(
      map(response => {
        return response;
      })
    ); 
  }
  getReadingMetarialByCourse(CourseId,schoolId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-readingMaterialByCourse?baseSchoolNameId='+schoolId+'&courseNameId='+CourseId).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getNoticeBySchoolId(schoolId,current) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-noticeBySchoolId?BaseSchoolNameId='+schoolId+'&CurrentDate='+current).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getEventBySchoolId(schoolId,current) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-eventsBySchoolId?BaseSchoolNameId='+schoolId+'&CurrentDate='+current).pipe(
      map(response => {
        return response;
      })
    ); 
  }

}
