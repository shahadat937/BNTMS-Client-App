import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IFailureStatusPagination,FailureStatusPagination } from '../models/FailureStatusPagination'
import { FailureStatus } from '../models/FailureStatus';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FailureStatusService {
  baseUrl = environment.apiUrl;
  FailureStatuss: FailureStatus[] = [];
  FailureStatusPagination = new FailureStatusPagination();
  constructor(private http: HttpClient) { }

  getFailureStatuss(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IFailureStatusPagination>(this.baseUrl + '/failure-status/get-failureStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.FailureStatuss = [...this.FailureStatuss, ...response.body.items];
        this.FailureStatusPagination = response.body;
        return this.FailureStatusPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<FailureStatus>(this.baseUrl + '/failure-status/get-failureStatusDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/failure-status/update-failureStatus/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/failure-status/save-failureStatus', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/failure-status/delete-failureStatus/'+id);
  }

}
