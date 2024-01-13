import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReasonType } from '../models/reasonType';
import {IReasonTypePagination, ReasonTypePagination } from '../models/reasonTypePagination'

@Injectable({
  providedIn: 'root'
})
export class ReasonTypeService {

  baseUrl = environment.apiUrl;
  reasonTypes: ReasonType[] = [];
  reasonTypePagination = new ReasonTypePagination();
  constructor(private http: HttpClient) { }

  getReasonTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IReasonTypePagination>(this.baseUrl + '/reason-type/get-reasonTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.reasonTypes = [...this.reasonTypes, ...response.body.items];
        this.reasonTypePagination = response.body;
        return this.reasonTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<ReasonType>(this.baseUrl + '/reason-type/get-reasonTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/reason-type/update-reasonType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/reason-type/save-reasonType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/reason-type/delete-reasonType/'+id);
  }
}
