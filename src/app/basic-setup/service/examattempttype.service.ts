import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamAttemptType } from '../models/examattempttype';
import {IExamAttemptTypePagination, ExamAttemptTypePagination } from '../models/examattempttypePagination'

@Injectable({
  providedIn: 'root'
})
export class ExamAttemptTypeService {

  baseUrl = environment.apiUrl;
  ExamAttemptTypes: ExamAttemptType[] = [];
  ExamAttemptTypePagination = new ExamAttemptTypePagination();
  constructor(private http: HttpClient) { }

  getExamAttemptTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IExamAttemptTypePagination>(this.baseUrl + '/exam-attempt-type/get-ExamAttemptTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ExamAttemptTypes = [...this.ExamAttemptTypes, ...response.body.items];
        this.ExamAttemptTypePagination = response.body;
        return this.ExamAttemptTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<ExamAttemptType>(this.baseUrl + '/exam-attempt-type/get-ExamAttemptTypeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/exam-attempt-type/update-ExamAttemptType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/exam-attempt-type/save-ExamAttemptType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/exam-attempt-type/delete-ExamAttemptType/'+id);
  }
}
