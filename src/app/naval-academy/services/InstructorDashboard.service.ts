import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpInstructorInfoByTraineeId } from '../models/spinstructorinfobytraineeid';
import {SpUpcomingClassesNotification} from '../models/spupcomingclassesnotification';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorDashboardService {
  baseUrl = environment.apiUrl;
  SpInstructorInfoByTraineeId: SpInstructorInfoByTraineeId[] = [];
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
