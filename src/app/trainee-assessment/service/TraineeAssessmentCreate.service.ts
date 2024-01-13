import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITraineeAssessmentMarkPagination,TraineeAssessmentMarkPagination } from '../models/TraineeAssessmentMarkPagination';
import { TraineeAssessmentMark } from '../models/TraineeAssessmentMark';
import { ITraineeAssessmentCreatePagination,TraineeAssessmentCreatePagination } from '../models/TraineeAssessmentCreatePagination';
import { TraineeAssessmentCreate } from '../models/TraineeAssessmentCreate';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TraineeAssessmentCreateService {
  baseUrl = environment.apiUrl;
  apiUrl = environment.securityUrl;
  TraineeAssessmentCreates: TraineeAssessmentCreate[] = [];
  TraineeAssessmentCreatePagination = new TraineeAssessmentCreatePagination(); 
  constructor(private http: HttpClient) { }

  getTraineeAssessmentCreates(pageNumber, pageSize,searchText,baseSchoolNameId, courseDurationId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('baseSchoolNameId', baseSchoolNameId.toString());
    params = params.append('courseDurationId', courseDurationId.toString());
   
    return this.http.get<ITraineeAssessmentCreatePagination>(this.baseUrl + '/trainee-assessment-create/get-TraineeAssessmentCreates', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeAssessmentCreates = [...this.TraineeAssessmentCreates, ...response.body.items];
        this.TraineeAssessmentCreatePagination = response.body;
        return this.TraineeAssessmentCreatePagination;
      })
    ); 
  }

  
  ChangeAssessmentStatus(traineeAssesmentCreateId,status){
    return this.http.get(this.baseUrl + '/trainee-assessment-create/change-trainee-assesmentstatus?traineeAssessmentCreateId='+traineeAssesmentCreateId+'&status='+status);
  }
  getTraineeAssessmentGroupListByAssessment(courseDurationId,TraineeAssessmentCreateId,searchText){
    return this.http.get<any[]>(this.baseUrl + '/trainee-assissment-group/get-traineeAssessmentGroupListByAssessmentCreateSpRequest?courseDurationId='+courseDurationId+'&TraineeAssessmentCreateId='+TraineeAssessmentCreateId+'&searchText='+searchText);
  }
  getTraineeAssessmentMarkListByAssessmentTrainee(courseDurationId,TraineeAssessmentCreateId,assessmentTraineeId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-assessment-mark/get-traineeAssessmentMarkListByAssessmentTrainee?courseDurationId='+courseDurationId+'&TraineeAssessmentCreateId='+TraineeAssessmentCreateId+'&assessmentTraineeId='+assessmentTraineeId);
  }

  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }

  
  getSelectedRoles(){
    return this.http.get<SelectedModel[]>(this.apiUrl + '/Role/get-selectedallroles')
  }
  
  find(id: number) {
    return this.http.get<TraineeAssessmentCreate>(this.baseUrl + '/trainee-assessment-create/get-TraineeAssessmentCreateDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-assessment-create/update-TraineeAssessmentCreate/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-assessment-create/save-TraineeAssessmentCreate', model).pipe(
      map((TraineeAssessmentCreate: PostResponse) => {
        if (TraineeAssessmentCreate) {
          console.log(TraineeAssessmentCreate);
          return TraineeAssessmentCreate;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-assessment-create/delete-TraineeAssessmentCreate/'+id);
  }
}
