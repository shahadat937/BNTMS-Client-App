import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITdecQuationGroupPagination,TdecQuationGroupPagination } from '../models/TdecQuationGroupPagination';
import { TdecQuationGroup } from '../models/TdecQuationGroup';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { TdecQuestionName } from '../models/TdecQuestionName';

@Injectable({
  providedIn: 'root'
})
export class TdecQuationGroupService {
  baseUrl = environment.apiUrl;
  TdecQuationGroups: TdecQuationGroup[] = [];
  tdecQuestionName:TdecQuestionName[];
  TdecQuationGroupPagination = new TdecQuationGroupPagination(); 
  constructor(private http: HttpClient) { }

 
  getTdecQuationGroupsByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseTypeId', courseTypeId.toString());
   
    return this.http.get<ITdecQuationGroupPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TdecQuationGroups = [...this.TdecQuationGroups, ...response.body.items];
        this.TdecQuationGroupPagination = response.body;
        return this.TdecQuationGroupPagination;
      })
    ); 
  }


  getTdecQuationGroups(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITdecQuationGroupPagination>(this.baseUrl + '/tdec-quation-group/get-tdecQuationGroups', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TdecQuationGroups = [...this.TdecQuationGroups, ...response.body.items];
        this.TdecQuationGroupPagination = response.body;
        return this.TdecQuationGroupPagination;
      })
    ); 
  }
  getselectedBaseScoolName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameBySchoolNameId?baseSchoolNameId='+baseSchoolNameId)
  }
  getSelectedSubjectNameBySchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameBySchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }
  getinstructorNameByParams(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId){
    return this.http.get<any[]>(this.baseUrl + '/course-instructor/get-instructorNameByParams?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }

  getTdecQuestionNameList(baseSchoolId){
    return this.http.get<TdecQuestionName[]>(this.baseUrl + '/tdec-question-name/get-tdecQuestionNameList?baseSchoolNameId='+baseSchoolId+'');
  }
  // getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
  //   return this.http.get<number>(this.baseUrl + '/course-duration/get-selectedCourseDurationIdByBaseSchoolNameAndCourseNameRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  // } tdec-question-name/get-tdecQuestionNameList?baseSchoolNameId=10

  // getselectedCourseNames(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  // }
  // getselectedSubjectNames(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  // }
  getselectedTraineePno(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-selectedTraineeByPno')
  }
  getselectedTdecQuestionName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/tdec-question-name/get-selectedTdecQuestionName')
  }
 //autocomplete for Question Group
getSelectedPno(pno){
  return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompletePnoForFamilyInfo?pno='+pno)
    
}
  find(id: number) {
    return this.http.get<TdecQuationGroup>(this.baseUrl + '/tdec-quation-group/get-TdecQuationGroupDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/tdec-quation-group/update-tdecQuationGroup/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/tdec-quation-group/save-tdecQuationGroup', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/tdec-quation-group/delete-tdecQuationGroup/'+id);
  }
}
