import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectType } from '../models/subjecttype';
import {ISubjectTypePagination, SubjectTypePagination } from '../models/SubjectTypePagination'

@Injectable({
  providedIn: 'root'
})
export class SubjectTypeService {

  baseUrl = environment.apiUrl;
  SubjectTypes: SubjectType[] = [];
  SubjectTypePagination = new SubjectTypePagination();
  constructor(private http: HttpClient) { }

  getSubjectTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<ISubjectTypePagination>(this.baseUrl + '/subject-type/get-subjectTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.SubjectTypes = [...this.SubjectTypes, ...response.body.items];
        this.SubjectTypePagination = response.body;
        return this.SubjectTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<SubjectType>(this.baseUrl + '/subject-type/get-subjectTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/subject-type/update-subjectType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/subject-type/save-subjectType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/subject-type/delete-subjectType/'+id);
  }
}
