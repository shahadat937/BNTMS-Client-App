import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITdecQuestionNamePagination,TdecQuestionNamePagination } from '../models/TdecQuestionNamePagination';
import { TdecQuestionName } from '../models/TdecQuestionName';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TdecQuestionNameService {
  baseUrl = environment.apiUrl;
  TdecQuestionNames: TdecQuestionName[] = [];
  TdecQuestionNamePagination = new TdecQuestionNamePagination(); 
  constructor(private http: HttpClient) { }

 
  getTdecQuestionNamesByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseTypeId', courseTypeId.toString());
   
    return this.http.get<ITdecQuestionNamePagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TdecQuestionNames = [...this.TdecQuestionNames, ...response.body.items];
        this.TdecQuestionNamePagination = response.body;
        return this.TdecQuestionNamePagination;
      })
    ); 
  }

  // tdec-question-name/get-tdecQuestionNameFilteredList?PageSize=5&PageNumber=1&baseSchoolNameId=20

  getTdecQuestionNameFiltered(pageNumber, pageSize,searchText,baseschoolNameId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('baseschoolNameId', baseschoolNameId.toString());
   
    return this.http.get<ITdecQuestionNamePagination>(this.baseUrl + '/tdec-question-name/get-tdecQuestionNameFilteredList', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TdecQuestionNames = [...this.TdecQuestionNames, ...response.body.items];
        this.TdecQuestionNamePagination = response.body;
        return this.TdecQuestionNamePagination;
      })
    ); 
  }

  getTdecQuestionNames(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITdecQuestionNamePagination>(this.baseUrl + '/tdec-question-name/get-tdecQuestionNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TdecQuestionNames = [...this.TdecQuestionNames, ...response.body.items];
        this.TdecQuestionNamePagination = response.body;
        return this.TdecQuestionNamePagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<TdecQuestionName>(this.baseUrl + '/tdec-question-name/get-tdecQuestionNameDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/tdec-question-name/update-tdecQuestionName/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/tdec-question-name/save-tdecQuestionName', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/tdec-question-name/delete-tdecQuestionName/'+id);
  }
}
