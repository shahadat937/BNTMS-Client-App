import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamCenter } from '../models/examcenter';
import {IExamCenterPagination, ExamCenterPagination } from '../models/examcenterPagination'

@Injectable({
  providedIn: 'root'
})
export class ExamCenterService {

  baseUrl = environment.apiUrl;
  ExamCenters: ExamCenter[] = [];
  ExamCenterPagination = new ExamCenterPagination();
  constructor(private http: HttpClient) { }

  getExamCenters(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IExamCenterPagination>(this.baseUrl + '/exam-center/get-ExamCenters', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ExamCenters = [...this.ExamCenters, ...response.body.items];
        this.ExamCenterPagination = response.body;
        return this.ExamCenterPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<ExamCenter>(this.baseUrl + '/exam-center/get-ExamCenterDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/exam-center/update-ExamCenter/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/exam-center/save-ExamCenter', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/exam-center/delete-ExamCenter/'+id);
  }
}
