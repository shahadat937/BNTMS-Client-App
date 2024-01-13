import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IInstructorAssignmentPagination,InstructorAssignmentPagination } from '../models/InstructorAssignmentPagination'
import { InstructorAssignment } from '../models/InstructorAssignment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InstructorAssignmentService {
  baseUrl = environment.apiUrl;
  InstructorAssignments: InstructorAssignment[] = [];
  InstructorAssignmentPagination = new InstructorAssignmentPagination();
  constructor(private http: HttpClient) { }

  getInstructorAssignments(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IInstructorAssignmentPagination>(this.baseUrl + '/board/get-boards', { observe: 'response', params })
    .pipe(
      map(response => {
        this.InstructorAssignments = [...this.InstructorAssignments, ...response.body.items];
        this.InstructorAssignmentPagination = response.body;
        return this.InstructorAssignmentPagination;
      })
    );  
  }
  find(id: number) {
    return this.http.get<InstructorAssignment>(this.baseUrl + '/board/get-boardDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/board/update-board/'+id, model);
  }

  getCourseInstructorIdForInstructorAssignmentSave(instructorId,bnaSubjectNameId,baseSchoolNameId,courseDurationId){
    return this.http.get<any>(this.baseUrl + '/course-instructor/get-selectedCourseInstructorIdByParameterRequest?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId+'&traineeId='+instructorId);
  }

  stopInstructorAssignments(courseInstructorId){
    return this.http.get<any[]>(this.baseUrl + '/instructor-assignments/stop-instructorAssignments/'+courseInstructorId)
  }

  getInstructorAssignmentListByInstructorId(baseSchoolNameId,courseDurationId,bnaSubjectNameId,instructorId){
    return this.http.get<any>(this.baseUrl + '/instructor-assignments/get-instructorAssignmentListByInstructorId?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId+'&instructorId='+instructorId);
  }
  
  submit(model: any) {
    return this.http.post(this.baseUrl + '/instructor-assignments/save-instructorAssignment', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/board/delete-board/'+id);
  }

}
