import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITraineeNominationPagination,TraineeNominationPagination } from '../models/traineenominationPagination';
import { TraineeNomination } from '../models/traineenomination';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { TraineeList} from '../../attendance-management/models/traineeList'
import { TraineeListforInterService } from '../models/traineeListforinterservice';

@Injectable({
  providedIn: 'root'
})
export class TraineeNominationService {
  baseUrl = environment.apiUrl;
  TraineeNominations: TraineeNomination[] = [];
  TraineeNominationPagination = new TraineeNominationPagination(); 
  constructor(private http: HttpClient) { }

  //autocomplete
    //trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo=345&courseDurationId=3026&courseNameId=1023&traineeId=1032
  getSelectedTraineeByparameterRequest(pno,courseDurationId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo='+pno+'&courseDurationId='+courseDurationId+'&courseNameId='+courseNameId)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }

  
  getSelectedTraineeByPno(pno){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo='+pno)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }


  getTraineeNominationByCourseDurationId(courseDurationId:number){
    return this.http.get<TraineeListforInterService[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationListForInterServiceByCourseDurationId?courseDurationId='+courseDurationId);
  }


  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getSelectedTrainee(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-selectedTraineeByPno')
  }

  getselectedcourseduration(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurations')
  }

  getselectedTraineeCourseStatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-course-status/get-selectedTraineeCourseStatuses')
  }

  getselectedWithdrawnDoc(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/withdrawn-docs/get-selectedWithDrawnDocs')
  }
 
  getTraineeNominationsByCourseDurationId(pageNumber, pageSize,searchText,courseDurationId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseDurationId', courseDurationId.toString());
    
    return this.http.get<ITraineeNominationPagination>(this.baseUrl + '/trainee-nomination/get-traineeNominationsByCourseDurationId', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeNominations = [...this.TraineeNominations, ...response.body.items];
        this.TraineeNominationPagination = response.body;
        return this.TraineeNominationPagination;
      })
    ); 
  }


  getTraineeNominations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<ITraineeNominationPagination>(this.baseUrl + '/trainee-nomination/get-traineeNominations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeNominations = [...this.TraineeNominations, ...response.body.items];
        this.TraineeNominationPagination = response.body;
        return this.TraineeNominationPagination;
      })
    ); 
  }
  findByCourseDuration(courseDurationId: number){
    return this.http.get<TraineeNomination>(this.baseUrl + '/trainee-nomination/get-traineeNominationDetailByCourseDurationId?courseDurationId=' + courseDurationId);
  }

  find(id: number) {
    return this.http.get<TraineeNomination>(this.baseUrl + '/trainee-nomination/get-traineeNominationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-nomination/update-traineeNomination/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-nomination/save-traineeNomination', model).pipe(
      map((TraineeNomination: PostResponse) => {
        if (TraineeNomination) {
          console.log(TraineeNomination);
          return TraineeNomination;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-nomination/delete-traineeNomination/'+id);
  }
}
