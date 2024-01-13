import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpCourseDuration } from '../models/spcourseduration';
import { SpTotalTrainee } from '../models/sptotaltrainee';
import { SpOfficerDetails } from '../models/spofficerdetails';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dashboardService {
  baseUrl = environment.apiUrl;
  SpCourseDurations: SpCourseDuration[] = [];
  SpTotalTrainees: SpTotalTrainee[] = [];
  constructor(private http: HttpClient) { }


 
  // getCourseDurationsByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

  //   let params = new HttpParams(); 
    
  //   params = params.append('searchText', searchText.toString());
  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());
  //   params = params.append('courseTypeId', courseTypeId.toString());
   
  //   return this.http.get<ICourseDurationPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
  //   .pipe(
  //     map(response => {
  //       this.CourseDurations = [...this.CourseDurations, ...response.body.items];
  //       this.CourseDurationPagination = response.body;
  //       return this.CourseDurationPagination;
  //     })
  //   ); 
  // }
  
  getRoutineSoftCopyByTrainee(traineeId){
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-routineSoftcopyByTraineeSpRequest?traineeId='+traineeId+'')
  }

  getCourseDurationForEventCalendar(){
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-courseDurationForEventCalendar')
  }

  getSpCourseDurationsByType(id:number,current:string) {

    return this.http.get<SpCourseDuration[]>(this.baseUrl + '/dashboard/get-courseDurationfromprocedure?courseTypeId='+id+'&CurrentDate='+current).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  getSpForeignCourseDurationsByType(id:number,current:string) {

    return this.http.get<SpCourseDuration[]>(this.baseUrl + '/dashboard/get-foreignCourseDurationfromprocedure?courseTypeId='+id+'&CurrentDate='+current).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  getnominatedCourseListFromSpRequest(current:string) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-nominatedCourseListFromSpRequest?CurrentDate='+current).pipe(
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
  getrunningCourseTotalOfficerListfromprocedureRequest(current:string, id){
    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-runningCourseTotalOfficerListfromprocedure?TraineeStatusId='+id+'&CurrentDate='+current).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  getnominatedForeignTraineeFromSpRequestBySchoolId(current,officerTypeId) {

    return this.http.get<SpOfficerDetails[]>(this.baseUrl + '/dashboard/get-nominatedForeignTraineeFromSpRequestBySchoolId?CurrentDate='+current+'&baseSchoolNameId=0&officerTypeId='+officerTypeId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  getSpRunningCourseDurationsByType(id,current,viewStatus) {

    return this.http.get<SpCourseDuration[]>(this.baseUrl + '/dashboard/get-runningCourseDurationfromprocedure?courseTypeId='+id+'&CurrentDate='+current+'&viewStatus='+viewStatus).pipe(
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
  getUpcomingCourseListForBnaByBase(current, baseId) {//course-duration/get-upcomingCourseDurationListForBnaByBase?baseNameId=2&CurrentDate=2023-06-13'
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-upcomingCourseDurationListForBnaByBase?baseNameId='+baseId+'&CurrentDate='+current).pipe(
      map(response => {        
        return response;
      })
    );
  }
  getSpRunningForeignCourseDurationsByType(id:number,current:string) {

    return this.http.get<SpCourseDuration[]>(this.baseUrl + '/dashboard/get-runningForeignCourseDurationfromprocedure?courseTypeId='+id+'&CurrentDate='+current).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getTrainingSyllabusListByParams(baseSchoolNameId,courseNameId,bnaSubjectNameId) {

    return this.http.get<any[]>(this.baseUrl + '/training-syllabus/get-trainingSyllabusListByParamsFromSpRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  getSpTotalTraineeByTraineeStatus() {
    return this.http.get<number>(this.baseUrl + '/dashboard/get-spGetTotalTraineeList').pipe(
      map(response => {
        return response;
      })
    ); 
  }
  getSpSchoolCount() {
    return this.http.get<number>(this.baseUrl + '/dashboard/get-spGetSchoolCount').pipe(
      map(response => {
        return response;
      })
    ); 
  }
  
  getSpCourseCountBySchool() {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-spGetCourseCountBySchool').pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getSpCourseListBySchool(baseSchoolId,current) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-runningCourseDurationListBySchool?baseSchoolNameId='+baseSchoolId+'&CurrentDate='+current).pipe(
      map(response => {
        return response;
      })
    ); 
  }


  gettraineeAssessmentForStudentSpRequest(courseDurationId,traineeId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-traineeAssessmentForStudentSpRequest?courseDurationId='+courseDurationId+'&traineeId='+traineeId).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getTraineeAttendanceList(traineeId,courseDurationId,courseSectionId,attendanceStatus) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-traineeAttendanceList?traineeId='+traineeId+'&courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId+'&attendanceStatus='+attendanceStatus).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getSpCentralCourseList(courseNameId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-runningCourseDurationForCentralExamList?courseNameId='+courseNameId).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getSchoolNameById(baseSchoolNameId) {
    return this.http.get<any>(this.baseUrl + '/base-School-name/get-baseSchoolNameDetail/'+baseSchoolNameId).pipe(
      map(response => {
        return response;
      })
    ); 
  }
  
}
