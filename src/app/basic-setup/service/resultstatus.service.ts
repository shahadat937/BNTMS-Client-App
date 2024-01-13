import { Injectable } from '@angular/core';
import { IResultStatusPagination, ResultStatusPagination} from '../models/resultstatusPagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ResultStatus } from '../models/resultstatus';

@Injectable({
  providedIn: 'root'
})
export class ResultStatusService {
  baseUrl = environment.apiUrl;
  ResultStatus: ResultStatus[] = [];
  ResultStatusPagination = new ResultStatusPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getResultStatus(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IResultStatusPagination>(this.baseUrl + '/result-status/get-resultStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ResultStatus = [...this.ResultStatus, ...response.body.items];
        this.ResultStatusPagination = response.body;
        return this.ResultStatusPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<ResultStatus>(this.baseUrl + '/result-status/get-resultStatusDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/result-status/update-resultStatus/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/result-status/save-resultStatus', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/result-status/delete-resultStatus/'+id);
  }
}
