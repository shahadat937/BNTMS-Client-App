import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITdecActionStatusPagination,TdecActionStatusPagination } from '../models/TdecActionStatusPagination';
import { TdecActionStatus } from '../models/TdecActionStatus';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TdecActionStatusService {
  baseUrl = environment.apiUrl;
  TdecActionStatuses: TdecActionStatus[] = [];
  TdecActionStatusPagination = new TdecActionStatusPagination(); 
  constructor(private http: HttpClient) { }

 
  getTdecActionStatusesByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseTypeId', courseTypeId.toString());
   
    return this.http.get<ITdecActionStatusPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TdecActionStatuses = [...this.TdecActionStatuses, ...response.body.items];
        this.TdecActionStatusPagination = response.body;
        return this.TdecActionStatusPagination;
      })
    ); 
  }


  getTdecActionStatuses(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITdecActionStatusPagination>(this.baseUrl + '/tdec-action-status/get-tdecActionStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TdecActionStatuses = [...this.TdecActionStatuses, ...response.body.items];
        this.TdecActionStatusPagination = response.body;
        return this.TdecActionStatusPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<TdecActionStatus>(this.baseUrl + '/tdec-action-status/get-tdecActionStatusDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/tdec-action-status/update-tdecActionStatus/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/tdec-action-status/save-tdecActionStatus', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/tdec-action-status/delete-tdecActionStatus/'+id);
  }
}
