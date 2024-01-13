import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGuestSpeakerQuationGroupPagination,GuestSpeakerQuationGroupPagination } from '../models/GuestSpeakerGroupPagination';
import { GuestSpeakerQuationGroup } from '../models/GuestSpeakerQuationGroup';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { GuestSpeakerQuestionName } from '../models/GuestSpeakerQuestionName';
import { BaseNamePagination } from 'src/app/basic-setup/models/BaseNamePagination';

@Injectable({
  providedIn: 'root'
})
export class GuestSpeakerQuationGroupService {
  baseUrl = environment.apiUrl;
  GuestSpeakerQuationGroups: GuestSpeakerQuationGroup[] = [];
 // GuestSpeakerQuestionName:GuestSpeakerQuestionName[];
  GuestSpeakerQuationGroupPagination = new GuestSpeakerQuationGroupPagination(); 
  constructor(private http: HttpClient) { }

 
  getGuestSpeakerQuationGroupsByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseTypeId', courseTypeId.toString());
   
    return this.http.get<IGuestSpeakerQuationGroupPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
    .pipe(
      map(response => {
        this.GuestSpeakerQuationGroups = [...this.GuestSpeakerQuationGroups, ...response.body.items];
        this.GuestSpeakerQuationGroupPagination = response.body;
        return this.GuestSpeakerQuationGroupPagination;
      })
    ); 
  }


  getGuestSpeakerQuationGroups(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IGuestSpeakerQuationGroupPagination>(this.baseUrl + '/GuestSpeaker-quation-group/get-GuestSpeakerQuationGroups', { observe: 'response', params })
    .pipe(
      map(response => {
        this.GuestSpeakerQuationGroups = [...this.GuestSpeakerQuationGroups, ...response.body.items];
        this.GuestSpeakerQuationGroupPagination = response.body;
        return this.GuestSpeakerQuationGroupPagination;
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
  getGuestSpeakerQuationGroupByParamsSp(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId){
    return this.http.get<any[]>(this.baseUrl + '/guestspeaker-quationgroup/get-GuestSpeakerQuationGroupByParamsSp?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }

  getGuestSpeakerQuestionNameList(baseSchoolId){
    return this.http.get<GuestSpeakerQuestionName[]>(this.baseUrl + '/guest-speaker-question-name/get-guestSpeakerQuestionNameList?baseSchoolNameId='+baseSchoolId);
  }

  // getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
  //   return this.http.get<number>(this.baseUrl + '/course-duration/get-selectedCourseDurationIdByBaseSchoolNameAndCourseNameRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  // } GuestSpeaker-question-name/get-GuestSpeakerQuestionNameList?baseSchoolNameId=10

  // getselectedCourseNames(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  // }
  // getselectedSubjectNames(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  // }
  getselectedTraineePno(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-selectedTraineeByPno')
  }
  getselectedGuestSpeakerQuestionName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/guest-speaker-question-name/get-selectedGuestSpeakerQuestionName')
  }
 //autocomplete for Question Group
getSelectedPno(pno){
  return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompletePnoForFamilyInfo?pno='+pno)
    
}
  find(id: number) {
    return this.http.get<GuestSpeakerQuationGroup>(this.baseUrl + '/GuestSpeaker-quation-group/get-GuestSpeakerQuationGroupDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/GuestSpeaker-quation-group/update-GuestSpeakerQuationGroup/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/guestspeaker-quationgroup/save-GuestSpeakerQuationGroup', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/GuestSpeaker-quation-group/delete-GuestSpeakerQuationGroup/'+id);
  }
}
