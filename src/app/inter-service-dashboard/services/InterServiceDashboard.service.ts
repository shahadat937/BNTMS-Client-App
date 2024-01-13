import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpInstructorInfoByTraineeId } from '../models/spinstructorinfobytraineeid';
import {SpUpcomingClassesNotification} from '../models/spupcomingclassesnotification';

import { map } from 'rxjs';
import { CourseDuration } from 'src/app/course-management/models/courseduration';
import { CourseDurationPagination, ICourseDurationPagination } from 'src/app/course-management/models/coursedurationPagination';

@Injectable({
  providedIn: 'root'
})
export class InterServiceDashboardService {
  baseUrl = environment.apiUrl;
  SpInstructorInfoByTraineeId: SpInstructorInfoByTraineeId[] = [];
  CourseDurations: CourseDuration[] = [];
  CourseDurationPagination = new CourseDurationPagination(); 
  constructor(private http: HttpClient) { }


  getSpInstructorInfoByTraineeId(id:number) {

    return this.http.get<SpInstructorInfoByTraineeId>(this.baseUrl + '/dashboard/get-instructorInfoByTraineeId?TraineeId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }
  
  getSpCurrentRoutineForStudentDashboard(id:number) {

    return this.http.get<SpUpcomingClassesNotification>(this.baseUrl + '/class-routine/get-upcommingClassesForInstructorDashboardSpRequest?traineeId='+id).pipe(
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

  getSpInstructorRoutineByTraineeId(id:number) {

    return this.http.get<any>(this.baseUrl + '/dashboard/get-instructorRoutineByTraineeId?TraineeId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getInstructorPendingExamEvaluation(id:number) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-instructorPendingExamEvaluation?traineeId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getStudentSubmittedAssignmentLists(instructorAssignmentId,baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId) {

    return this.http.get<any>(this.baseUrl + '/instructor-assignments/get-studentSubmittedAssignmentList?instructorAssignmentId='+instructorAssignmentId+'&baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&BnaSubjectNameId='+bnaSubjectNameId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  
  getCentralCourseDuration(courseTypeId,courseNameId) {

    return this.http.get<any>(this.baseUrl + '/dashboard/get-centralCourseDurationByTypeAndName?courseTypeId='+courseTypeId+'&courseNameId='+courseNameId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getSpInstructorSubject(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId) {

    return this.http.get<any>(this.baseUrl + '/bna-subject-name/get-instructorSubjectsByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getSpReadingMaterialByTraineeId(id:number) {

    return this.http.get<any>(this.baseUrl + '/dashboard/get-readingMaterialByTraineeId?baseSchoolNameId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

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

  getRunningCourseTotalTraineeByCourseType(currentDate,courseTypeId,traineeStatusId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-runningCourseTotalTraineeByCourseType?currentDate='+currentDate+'&courseTypeId='+courseTypeId+'&traineeStatusId='+traineeStatusId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getUpcomingCourseListByType(currentDate,courseTypeId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-upcomingCourseListByType?courseTypeId='+courseTypeId+'&CurrentDate='+currentDate).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  
}
