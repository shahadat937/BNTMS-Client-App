import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IStudentAssignmentSubmitPagination,StudentAssignmentSubmitPagination } from '../models/StudentAssignmentSubmitPagination'
import { StudentAssignmentSubmit } from '../models/StudentAssignmentSubmit';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TraineeAssignmentSubmitService {
  baseUrl = environment.apiUrl;
  StudentAssignmentSubmits: StudentAssignmentSubmit[] = [];
  StudentAssignmentSubmitPagination = new StudentAssignmentSubmitPagination();
  constructor(private http: HttpClient) { }

  getStudentAssignmentSubmits(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IStudentAssignmentSubmitPagination>(this.baseUrl + '/board/get-boards', { observe: 'response', params })
    .pipe(
      map(response => {
        this.StudentAssignmentSubmits = [...this.StudentAssignmentSubmits, ...response.body.items];
        this.StudentAssignmentSubmitPagination = response.body;
        return this.StudentAssignmentSubmitPagination;
      })
    );  
  }
  find(id: number) {
    return this.http.get<StudentAssignmentSubmit>(this.baseUrl + '/trainee-assignment-submit/get-traineeAssignmentSubmitDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/board/update-board/'+id, model);
  }

  getCourseInstructorIdForStudentAssignmentSubmitSave(instructorId,bnaSubjectNameId,baseSchoolNameId,courseDurationId){
    return this.http.get<any>(this.baseUrl + '/course-instructor/get-selectedCourseInstructorIdByParameterRequest?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId+'&traineeId='+instructorId);
  }

  stopStudentAssignmentSubmits(courseInstructorId){
    return this.http.get<any[]>(this.baseUrl + '/instructor-assignments/stop-instructorAssignments/'+courseInstructorId)
  }

  getStudentAssignmentSubmitListByInstructorId(baseSchoolNameId,courseDurationId,bnaSubjectNameId,instructorId){
    return this.http.get<any>(this.baseUrl + '/instructor-assignments/get-instructorAssignmentListByInstructorId?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId+'&instructorId='+instructorId);
  }
  
  getTraineeAssignmentSubmitListByParameter(traineeId,instructorId,bnaSubjectNameId,baseSchoolNameId,courseNameId,courseDurationId,courseInstructorId,instructorAssignmentId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-assignment-submit/get-traineeAssignmentSubmitListByInstructorId?traineeId='+traineeId+'&instructorId='+instructorId+'&bnaSubjectNameId='+bnaSubjectNameId+'&baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&courseInstructorId='+courseInstructorId+'&instructorAssignmentId='+instructorAssignmentId);
  }

  submit(model: any) {
    return this.http.post(this.baseUrl + '/trainee-assignment-submit/save-traineeAssignmentSubmit', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-assignment-submit/delete-traineeAssignmentSubmit/'+id);
  }

}
