import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamType } from '../models/examType';
import {IExamTypePagination, ExamTypePagination } from '../models/examTypePagination'

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService {

  baseUrl = environment.apiUrl;
  examTypes: ExamType[] = [];
  examTypePagination = new ExamTypePagination();
  constructor(private http: HttpClient) { }

  getExamTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IExamTypePagination>(this.baseUrl + '/exam-type/get-examTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.examTypes = [...this.examTypes, ...response.body.items];
        this.examTypePagination = response.body;
        return this.examTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<ExamType>(this.baseUrl + '/exam-type/get-examTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/exam-type/update-examType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/exam-type/save-examType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/exam-type/delete-examType/'+id);
  }
}
