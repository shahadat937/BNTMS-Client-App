import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBnaClassSchedulePagination,BnaClassSchedulePagination } from '../models/bnaclassschedulePagination';
import { BnaClassSchedule } from '../models/bnaclassschedule';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BnaClassScheduleService {
  baseUrl = environment.apiUrl;
  BnaClassSchedules: BnaClassSchedule[] = [];
  BnaClassSchedulePagination = new BnaClassSchedulePagination(); 
  constructor(private http: HttpClient) { }

  getselectedBnaSemesters(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getselectedClassPeriod(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/class-period/get-selectedClassPeriod')
  }
  getselectedBnaSubjectNames(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  }
  getselectedBnaClassSectionSelections(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-class-section-selection/get-selectedBnaClassSectionSelections')
  }


  // getselectedcoursename(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  // }
  getBnaClassSchedules(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IBnaClassSchedulePagination>(this.baseUrl + '/bna-class-schedule/get-bnaClassSchedules', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BnaClassSchedules = [...this.BnaClassSchedules, ...response.body.items];
        this.BnaClassSchedulePagination = response.body;
        return this.BnaClassSchedulePagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BnaClassSchedule>(this.baseUrl + '/bna-class-schedule/get-bnaClassScheduleDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-class-schedule/update-bnaClassSchedule/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/bna-class-schedule/save-bnaClassSchedule', model).pipe(
      map((BnaClassSchedule: PostResponse) => {
        if (BnaClassSchedule) {
          console.log(BnaClassSchedule);
          return BnaClassSchedule;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-class-schedule/delete-bnaClassSchedule/'+id);
  }
}
