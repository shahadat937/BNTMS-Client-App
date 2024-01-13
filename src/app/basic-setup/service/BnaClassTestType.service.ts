import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBnaClassTestTypePagination, BnaClassTestTypePagination } from '../models/BnaClassTestTypePagination'
import { BnaClassTestType } from '../models/BnaClassTestType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BnaClassTestTypeService {
  baseUrl = environment.apiUrl;
  BnaClassTestTypes: BnaClassTestType[] = [];
  BnaClassTestTypePagination = new BnaClassTestTypePagination();
  constructor(private http: HttpClient) { }

  getBnaClassTestTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IBnaClassTestTypePagination>(this.baseUrl + '/bna-class-test-type/get-bnaClassTestTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BnaClassTestTypes = [...this.BnaClassTestTypes, ...response.body.items];
        this.BnaClassTestTypePagination = response.body;
        return this.BnaClassTestTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BnaClassTestType>(this.baseUrl + '/bna-class-test-type/get-bnaClassTestTypeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-class-test-type/update-bnaClassTestType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-class-test-type/save-bnaClassTestType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-class-test-type/delete-bnaClassTestType/'+id);
  }

}
