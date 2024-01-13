import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITraineeAssessmentGroupPagination,TraineeAssessmentGroupPagination } from '../models/TraineeAssessmentGroupPagination';
import { TraineeAssessmentGroup } from '../models/TraineeAssessmentGroup';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TraineeAssessmentGroupService {
  baseUrl = environment.apiUrl;
  apiUrl = environment.securityUrl;
  TraineeAssessmentGroups: TraineeAssessmentGroup[] = [];
  TraineeAssessmentGroupPagination = new TraineeAssessmentGroupPagination(); 
  constructor(private http: HttpClient) { }

  getTraineeAssessmentGroups(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITraineeAssessmentGroupPagination>(this.baseUrl + '/trainee-assessment-group/get-TraineeAssessmentGroups', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeAssessmentGroups = [...this.TraineeAssessmentGroups, ...response.body.items];
        this.TraineeAssessmentGroupPagination = response.body;
        return this.TraineeAssessmentGroupPagination;
      })
    ); 
  }

  
  // ChangeAssessmentStatus(traineeAssesmentgroupId,status){
  //   return this.http.get(this.baseUrl + '/trainee-assessment-group/change-trainee-assesmentstatus?TraineeAssessmentGroupId='+traineeAssesmentgroupId+'&status='+status);
  // }

  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }

  
  getSelectedRoles(){
    return this.http.get<SelectedModel[]>(this.apiUrl + '/Role/get-selectedallroles')
  }
  
  find(id: number) {
    return this.http.get<TraineeAssessmentGroup>(this.baseUrl + '/trainee-assessment-group/get-TraineeAssessmentGroupDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-assessment-group/update-TraineeAssessmentGroup/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-assessment-group/save-TraineeAssessmentGroup', model).pipe(
      map((TraineeAssessmentGroup: PostResponse) => {
        if (TraineeAssessmentGroup) {
          console.log(TraineeAssessmentGroup);
          return TraineeAssessmentGroup;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-assessment-group/delete-TraineeAssessmentGroup/'+id);
  }

  getCourseByBaseSchoolNameId(baseSchoolNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }
  getSelectedTraineeAssessmentCreates(courseDurationId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-assessment-create/get-selectedTraineeAssessmentCreates?courseDurationId='+courseDurationId)
  }

  saveTraineeAssessmentGrouplist(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-assissment-group/save-traineeAssessmentGrouplist', model, httpOptions).pipe(
      map((BNAExamMark: PostResponse) => {
        if (BNAExamMark) {
          console.log(BNAExamMark);
          return BNAExamMark;
        }
      })
    );
  } 
}
