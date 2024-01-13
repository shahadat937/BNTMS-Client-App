import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../../../src/environments/environment';
import {ISubjectMarkPagination,SubjectMarkPagination } from '../models/SubjectMarkPagination'
import { SubjectMark } from '../models/SubjectMark';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class SubjectMarkService {
  baseUrl = environment.apiUrl;
  SubjectMarks: SubjectMark[] = [];
  SubjectMarkPagination = new SubjectMarkPagination();
  constructor(private http: HttpClient) { }

  getSubjectMarks(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<ISubjectMarkPagination>(this.baseUrl + '/subject-mark/get-subjectmarks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.SubjectMarks = [...this.SubjectMarks, ...response.body.items];
        this.SubjectMarkPagination = response.body;
        return this.SubjectMarkPagination;
      })
    );  
  }
  find(id: number) {
    return this.http.get<SubjectMark>(this.baseUrl + '/subject-mark/get-subjectmarkdetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/subject-mark/update-subjectmark/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/subject-mark/save-subjectmark', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/subject-mark/delete-subjectmark/'+id);
  }
  getSelectedBranch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/branch/get-selectedBranchs')
  }
  getSelectedSubjectNameByBranchId(branchId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByBranchId?branchId='+branchId)
  }
  getselectedmarktypes(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/mark-type/get-selectedmarktypes')
  }

  getSelectedSubjectNameByCourseNameId(courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByCourseNameId?courseNameId='+courseNameId)
  }

  getSelectedSchoolName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedbnasubjectnamebyparameters(baseSchoolNameId:number,courseNameId:number, courseModuleId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNamesByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId)
  }

  getselectedsubjectmarkbyparameters(baseSchoolNameId:number,courseNameId:number, courseModuleId:number, bnaSubjectNameId:number){
    return this.http.get<SubjectMark[]>(this.baseUrl + '/subject-mark/get-selectedSubjectMarkByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }
getSelectedSubjectMarkByCourseNameIdAndBnaSubjectNameId(courseNameId,bnaSubjectNameId){
  return this.http.get<SubjectMark[]>(this.baseUrl + '/subject-mark/get-selectedSubjectMarkByCourseNameIdAndBnaSubjectNameId?courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId);
}
  // subject-mark/get-selectedSubjectMarkByCourseNameIdAndBnaSubjectNameId?courseNameId=1252&bnaSubjectNameId=3420
  getSelectedsubjectMarksBySubject(baseSchoolNameId:number,courseNameId:number, bnaSubjectNameId:number){
    return this.http.get<SubjectMark[]>(this.baseUrl + '/subject-mark/get-selectedSubjectMarkBySubject?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }
 

  //autocomplete
  //trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo=345&courseDurationId=3026&courseNameId=1023&traineeId=1032
  getSelectedCourseByName(courseName){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-autocompleteCourseByName?courseName='+courseName)
    .pipe(
      map((response:[]) => response.map(item => item))
    )
  }

  getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId:number,courseNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModulesByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }

}
