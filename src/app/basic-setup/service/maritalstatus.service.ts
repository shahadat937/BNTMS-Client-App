import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMaritalStatusPagination,MaritalStatusPagination } from '../models/MaritalStatusPagination';
import { MaritalStatus } from '../models/MaritalStatus';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {
  baseUrl = environment.apiUrl;
  maritalStatus: MaritalStatus[] = [];
  maritalStatusPagination = new MaritalStatusPagination();
  constructor(private http: HttpClient) { }

  getMaritalStatus(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IMaritalStatusPagination>(this.baseUrl + '/marital-status/get-maritalStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.maritalStatus = [...this.maritalStatus, ...response.body.items];
        this.maritalStatusPagination = response.body;
        return this.maritalStatusPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<MaritalStatus>(this.baseUrl + '/marital-status/get-maritalStatusDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/marital-status/update-maritalStatus/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/marital-status/save-maritalStatus', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/marital-status/delete-maritalStatus/'+id);
  }
}
