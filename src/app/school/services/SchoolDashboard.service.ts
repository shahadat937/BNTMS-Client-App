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
export class SchoolDashboardService {
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
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-nominatedCourseListFromSpRequestBySchoolId?CurrentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {        
        return response;
      })
    ); 
  }

  getNominatedTotalTraineeByBaseFromSp(schoolId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-nominatedTotalTraineeByBaseFromSp?baseNameId='+schoolId).pipe(
      map(response => {        
        return response;
      })
    ); 
  }

  getRunningCourseDurationByBase(current, baseNameId,viewStatus) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-runningCourseDurationByBase?baseNameId='+baseNameId+'&currentDate='+current+'&viewStatus='+viewStatus).pipe(
      map(response => {        
        return response;
      })
    ); 
  }

  getNotificationReminderForDashboard(userRole,receiverId) {
    return this.http.get<any>(this.baseUrl + '/dashboard/get-notificationReminderForDashboard?userRole='+userRole+'&receiverId='+receiverId).pipe(
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

  getNominatedForeignTraineeByTypeAndBase(current, schoolId,officerTypeId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-nominatedTraineeByTypeAndBase?CurrentDate='+current+'&baseNameId='+schoolId+'&officerTypeId='+officerTypeId).pipe(
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

  getCourseTotalOfficerListByBase(current, traineeStatusId, schoolId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-courseTotalOfficerListByBase?TraineeStatusId='+traineeStatusId+'&CurrentDate='+current+'&baseNameId='+schoolId).pipe(
      map(response => {        
        return response;
      })
    );
  }

  getrunningCourseListBySchool(current, courseTypeId, schoolId,viewStatus) {
    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-runningCourseDurationBySchool?courseTypeId='+courseTypeId+'&CurrentDate='+current+'&baseSchoolNameId='+schoolId+'&viewStatus='+viewStatus).pipe(
      map(response => {
        
        return response;
      })
    );
  }

  getCourseWeekListByCourseDuration(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/course-week/get-courseWeekByDuration?courseDurationId='+courseDurationId)
  }
  
  getUpcomingCourseListBySchool(current, courseTypeId, schoolId) {
    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-upcomingCourseDurationBySchool?courseTypeId='+courseTypeId+'&CurrentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {        
        return response;
      })
    );
  }

  getUpcomingCourseListByNbcdSchool(current, courseTypeId, schoolId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-upcomingCourseDurationByNbcdSchool?courseTypeId='+courseTypeId+'&CurrentDate='+current+'&baseSchoolNameId='+schoolId).pipe(
      map(response => {        
        return response;
      })
    );
  }

  getUpcomingCourseListByBase(current, baseId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-upcomingCourseDurationByBase?baseNameId='+baseId+'&CurrentDate='+current).pipe(
      map(response => {        
        return response;
      })
    );
  }

  genarateCourseWeek(courseDurationId) {
    return this.http.get<any>(this.baseUrl + '/course-week/genarate-autoWeek?courseDurationId='+courseDurationId);
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

  getCurrentRoutineForDb(schoolId,courseNameId,durationId,sectionId) {
    return this.http.get<any[]>(this.baseUrl + '/class-routine/get-classRoutineForSchoolDashboard?baseSchoolNameId='+schoolId+'&courseNameId='+courseNameId+'&courseDurationId='+durationId+'&courseSectionId='+sectionId).pipe(
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
      map(response => { return response;})
    ); 
  }
  getInstructorBySchoolForBase(id:number) {
    return this.http.get<ClassRoutine[]>(this.baseUrl + '/dashboard/get-instructorBySchoolForCO?baseNameId='+id).pipe(
      map(response => { return response;})
    ); 
  }

  getInstructorDetailByCourse(courseId, schoolId,durationId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-instructorDetailByCourse?baseSchoolNameId='+schoolId+'&courseNameId='+courseId+'&courseDurationId='+durationId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getExamStatusBySubjectList(durationId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-examStatusBySubjectList?courseDurationId='+durationId).pipe(
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

  getReadingMetarialByBase(id:number) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-readingMaterialByBase?baseNameId='+id).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getCourseNamesBySchool(id) {
    return this.http.get<any[]>(this.baseUrl + '/course-name/get-courseNamesBySchool?baseSchoolNameId='+id).pipe(
      map(response => {
        return response;
      })
    ); 
  }
  
  getCourseNamesByBase(id) {
    return this.http.get<any[]>(this.baseUrl + '/course-name/get-courseNamesByBase?baseNameId='+id).pipe(
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
