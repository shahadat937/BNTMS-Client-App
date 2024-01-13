import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNAExamInstructorAssignPagination,BNAExamInstructorAssignPagination } from '../models/bnaexaminstructorassignPagination';
import { BNAExamInstructorAssign } from '../models/bnaexaminstructorassign';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BNAExamInstructorAssignService {
  baseUrl = environment.apiUrl;
  BNAExamInstructorAssigns: BNAExamInstructorAssign[] = [];
  BNAExamInstructorAssignPagination = new BNAExamInstructorAssignPagination(); 
  constructor(private http: HttpClient) { }

  getselectedbnasubjectname(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  }
  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }
  getselectedschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedbasename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-name/get-selectedBases')
  }

  getSelectedInstructorByParameters(baseSchoolNameId,courseNameId,courseModuleId,bnaSubjectNameId){
    return this.http.get<BNAExamInstructorAssign[]>(this.baseUrl + '/bna-exam-instructor-assign/get-instructorByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }

  getInstructorBySchoolAndCourse(baseSchoolNameId,courseNameId){
    return this.http.get<BNAExamInstructorAssign[]>(this.baseUrl + '/bna-exam-instructor-assign/get-instructorBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }

  getselectedclassroutinebyparameters(baseSchoolNameId,courseNameId, courseModuleId,bnaSubjectNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/class-routine/get-selectedClassRoutineByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }

  getselectedbnainstructortype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-instructor-type/get-selectedBnaInstructorTypes')
  }

  getselectedbnaclasssectionselection(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-class-section-selection/get-selectedBnaClassSectionSelections')
  }

  getBNAExamInstructorAssigns(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IBNAExamInstructorAssignPagination>(this.baseUrl + '/bna-exam-instructor-assign/get-bnaExamInstructorAssigns', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAExamInstructorAssigns = [...this.BNAExamInstructorAssigns, ...response.body.items];
        this.BNAExamInstructorAssignPagination = response.body;
        return this.BNAExamInstructorAssignPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BNAExamInstructorAssign>(this.baseUrl + '/bna-exam-instructor-assign/get-bnaExamInstructorAssignDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-exam-instructor-assign/update-bnaExamInstructorAssign/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/bna-exam-instructor-assign/save-bnaExamInstructorAssign', model).pipe(
      map((BNAExamInstructorAssign: PostResponse) => {
        if (BNAExamInstructorAssign) {
          console.log(BNAExamInstructorAssign);
          return BNAExamInstructorAssign;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-exam-instructor-assign/delete-bnaExamInstructorAssign/'+id);
  }
}
