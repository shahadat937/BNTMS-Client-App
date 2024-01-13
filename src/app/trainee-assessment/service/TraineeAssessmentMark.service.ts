import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITraineeAssessmentMarkPagination,TraineeAssessmentMarkPagination } from '../models/TraineeAssessmentMarkPagination';
import { TraineeAssessmentMark } from '../models/TraineeAssessmentMark';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TraineeAssessmentMarkService {
  baseUrl = environment.apiUrl;
  apiUrl = environment.securityUrl;
  TraineeAssessmentMarks: TraineeAssessmentMark[] = [];
  TraineeAssessmentMarkPagination = new TraineeAssessmentMarkPagination(); 
  constructor(private http: HttpClient) { }

  getTraineeAssessmentMarks(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITraineeAssessmentMarkPagination>(this.baseUrl + '/trainee-assessment-mark/get-TraineeAssessmentMarks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeAssessmentMarks = [...this.TraineeAssessmentMarks, ...response.body.items];
        this.TraineeAssessmentMarkPagination = response.body;
        return this.TraineeAssessmentMarkPagination;
      })
    ); 
  }

  
  getSelectedRoles(){
    return this.http.get<SelectedModel[]>(this.apiUrl + '/Role/get-selectedallroles')
  }
  
  find(id: number) {
    return this.http.get<TraineeAssessmentMark>(this.baseUrl + '/trainee-assessment-mark/get-TraineeAssessmentMarkDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-assessment-mark/update-TraineeAssessmentMark/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-assessment-mark/save-TraineeAssessmentMark', model).pipe(
      map((TraineeAssessmentMark: PostResponse) => {
        if (TraineeAssessmentMark) {
          console.log(TraineeAssessmentMark);
          return TraineeAssessmentMark;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-assessment-mark/delete-TraineeAssessmentMark/'+id);
  }
}
