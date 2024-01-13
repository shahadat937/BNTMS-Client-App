import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpInstructorInfoByTraineeId } from '../models/spinstructorinfobytraineeid';
import {SpUpcomingClassesNotification} from '../models/spupcomingclassesnotification';

import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { StudentAssignmentSubmit } from 'src/app/student/models/StudentAssignmentSubmit';

@Injectable({
  providedIn: 'root'
})
export class InstructorDashboardService {
  baseUrl = environment.apiUrl;
  SpInstructorInfoByTraineeId: SpInstructorInfoByTraineeId[] = [];
  constructor(private http: HttpClient) { }


  getSpInstructorInfoByTraineeId(id:number) {

    return this.http.get<any>(this.baseUrl + '/dashboard/get-instructorInfoByTraineeId?TraineeId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getSpInstructorInfoForCentralExam(traineId,courseTypeId,courseNameId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-instructorInfoForCentralExam?traineeId='+traineId+'&courseNameId='+courseNameId+'&courseTypeId='+courseTypeId).pipe(
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

  getSpInstructorRoutineByTraineeId(id:number) {

    return this.http.get<any>(this.baseUrl + '/dashboard/get-instructorRoutineByTraineeId?TraineeId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getInstructorPendingExamEvaluation(traindeeId,courseDurationId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-instructorPendingExamEvaluation?traineeId='+traindeeId+'&courseDurationId='+courseDurationId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getInstructorAssignedCourseList(traindeeId) {

    return this.http.get<any[]>(this.baseUrl + '/course-instructor/get-todayClassScheduleByCourseInstructorId?traineeId='+traindeeId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getInstructorRoutineByCourseList(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId,traindeeId) {

    return this.http.get<any[]>(this.baseUrl + '/class-routine/get-upcomingTodayClassByCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId+'&traineeId='+traindeeId).pipe(
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

  find(id: number) {
    return this.http.get<StudentAssignmentSubmit>(this.baseUrl + '/trainee-assignment-submit/get-traineeAssignmentSubmitDetail/' + id);
  }
  
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/assignment-mark-entry/save-AssignmentMarkEntry', model);
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

  
}
