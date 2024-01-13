import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNASemesterDurationPagination,BNASemesterDurationPagination } from '../models/BNASemesterDurationPagination';
import { BNASemesterDuration } from '../models/BNASemesterDuration';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BNASemesterDurationService {
  baseUrl = environment.apiUrl;
  BNASemesterDurations: BNASemesterDuration[] = [];
  BNASemesterDurationPagination = new BNASemesterDurationPagination(); 
  constructor(private http: HttpClient) { }

  getSelectedCourseDuration(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationForBna')
  }
  getSelectedBnaSemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getSelectedBnaBatch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-batch/get-selectedBnaBatchs')
  }

  getSelectedRank(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/ranks/get-selectedRanks')
  }
 
  getBNASemesterDurations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IBNASemesterDurationPagination>(this.baseUrl + '/bna-semester-duration/get-bnaSemesterDurations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNASemesterDurations = [...this.BNASemesterDurations, ...response.body.items];
        this.BNASemesterDurationPagination = response.body;
        return this.BNASemesterDurationPagination;
      })
    ); 
  }
  genarateCourseWeekForBna(bnaSemesterDurationId) {  
    return this.http.get<any>(this.baseUrl + '/course-week/genarate-autoWeekForBna?bnaSemesterDurationId='+bnaSemesterDurationId);
  }
 
  
  find(id: number) {
    return this.http.get<BNASemesterDuration>(this.baseUrl + '/bna-semester-duration/get-bnaSemesterDurationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-semester-duration/update-bnaSemesterDuration/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/bna-semester-duration/save-bnaSemesterDuration', model).pipe(
      map((BNASemesterDuration: PostResponse) => {
        if (BNASemesterDuration) {
          console.log(BNASemesterDuration);
          return BNASemesterDuration;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-semester-duration/delete-bnaSemesterDuration/'+id);
  }
}
