import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IUTOfficerTypePagination, UTOfficerTypePagination } from '../models/UTOfficerTypePagination'
import { UTOfficerType } from '../models/UTOfficerType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UTOfficerTypeService {
  baseUrl = environment.apiUrl;
  UTOfficerTypes: UTOfficerType[] = [];
  UTOfficerTypePagination = new UTOfficerTypePagination();
  constructor(private http: HttpClient) { }

  getUTOfficerTypes(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IUTOfficerTypePagination>(this.baseUrl + '/ut-officer-type/get-utOfficerTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.UTOfficerTypes = [...this.UTOfficerTypes, ...response.body.items];
        this.UTOfficerTypePagination = response.body;
        return this.UTOfficerTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<UTOfficerType>(this.baseUrl + '/ut-officer-type/get-utOfficerTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/ut-officer-type/update-utOfficerType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/ut-officer-type/save-utOfficerType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/ut-officer-type/delete-utOfficerType/'+id);
  }

}
