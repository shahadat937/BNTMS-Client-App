import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNAExamSchedulePagination,BNAExamSchedulePagination } from '../models/bnaexamschedulePagination';
import { BNAExamSchedule } from '../models/bnaexamschedule';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BNAExamScheduleService {
  baseUrl = environment.apiUrl;
  BNAExamSchedules: BNAExamSchedule[] = [];
  BNAExamSchedulePagination = new BNAExamSchedulePagination(); 
  constructor(private http: HttpClient) { }

  getselectedcourseduration(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurations')
  }

  getselectedbnasemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getselectedbnabatch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-batch/get-selectedBnaBatchs')
  }

  getselectedexamtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-type/get-selectedExamType')
  }

  getselectedbnasubjectname(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  }
 

  getBNAExamSchedules(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IBNAExamSchedulePagination>(this.baseUrl + '/bna-exam-schedule/get-bnaExamSchedules', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAExamSchedules = [...this.BNAExamSchedules, ...response.body.items];
        this.BNAExamSchedulePagination = response.body;
        return this.BNAExamSchedulePagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BNAExamSchedule>(this.baseUrl + '/bna-exam-schedule/get-bnaExamScheduleDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-exam-schedule/update-bnaExamSchedule/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/bna-exam-schedule/save-bnaExamSchedule', model).pipe(
      map((BNAExamSchedule: PostResponse) => {
        if (BNAExamSchedule) {
          console.log(BNAExamSchedule);
          return BNAExamSchedule;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-exam-schedule/delete-bnaExamSchedule/'+id);
  }
}
