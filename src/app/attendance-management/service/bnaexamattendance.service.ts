import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNAExamAttendancePagination,BNAExamAttendancePagination } from '../models/bnaexamattendancePagination';
import { BNAExamAttendance } from '../models/bnaexamattendance';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BNAExamAttendanceService {
  baseUrl = environment.apiUrl;
  BNAExamAttendances: BNAExamAttendance[] = [];
  BNAExamAttendancePagination = new BNAExamAttendancePagination(); 
  constructor(private http: HttpClient) { }

  getselectedbnasemesterduration(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester-duration/get-selectedBnaSemesterDurations')
  }

  getselectedbnasemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getselectedbnabatch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-batch/get-selectedBnaBatchs')
  }

  getselectebnaexamschedule(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-exam-schedule/get-selectedBnaExamSchedules')
  }
  getselectedbnasubjectname(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  }

  getselectedexamtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-type/get-selectedExamType')
  }
 

  getBNAExamAttendances(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IBNAExamAttendancePagination>(this.baseUrl + '/bna-exam-attendance/get-bnaExamAttendances', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAExamAttendances = [...this.BNAExamAttendances, ...response.body.items];
        this.BNAExamAttendancePagination = response.body;
        return this.BNAExamAttendancePagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BNAExamAttendance>(this.baseUrl + '/bna-exam-attendance/get-bnaExamAttendanceDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-exam-attendance/update-bnaExamAttendance/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/bna-exam-attendance/save-bnaExamAttendance', model).pipe(
      map((BNAExamAttendance: PostResponse) => {
        if (BNAExamAttendance) {
          console.log(BNAExamAttendance);
          return BNAExamAttendance;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-exam-attendance/delete-bnaExamAttendance/'+id);
  }
}
