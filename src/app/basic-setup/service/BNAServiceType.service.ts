import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBNAServiceTypePagination, BNAServiceTypePagination } from '../models/BNAServiceTypePagination'
import { BNAServiceType } from '../models/BNAServiceType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BNAServiceTypeService {
  baseUrl = environment.apiUrl;
  BNAServiceTypes: BNAServiceType[] = [];
  BNAServiceTypePagination = new BNAServiceTypePagination();
  constructor(private http: HttpClient) { }

  getBNAServiceTypes(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IBNAServiceTypePagination>(this.baseUrl + '/bna-service-type/get-bnaServiceTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAServiceTypes = [...this.BNAServiceTypes, ...response.body.items];
        this.BNAServiceTypePagination = response.body;
        return this.BNAServiceTypePagination;
      })
    ); 
  }
  find(id: number) {
    return this.http.get<BNAServiceType>(this.baseUrl + '/bna-service-type/get-bnaServiceTypeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-service-type/update-bnaServiceType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-service-type/save-bnaServiceType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-service-type/delete-bnaServiceType/'+id);
  }

}
