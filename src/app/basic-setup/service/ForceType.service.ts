import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IForceTypePagination, ForceTypePagination } from '../models/ForceTypePagination'
import { ForceType } from '../models/ForceType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForceTypeService {
  baseUrl = environment.apiUrl;
  ForceTypes: ForceType[] = [];
  ForceTypePagination = new ForceTypePagination();
  constructor(private http: HttpClient) { }

  getForceTypes(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IForceTypePagination>(this.baseUrl + '/force-type/get-forceTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ForceTypes = [...this.ForceTypes, ...response.body.items];
        this.ForceTypePagination = response.body;
        return this.ForceTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<ForceType>(this.baseUrl + '/force-type/get-forceTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/force-type/update-forceType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/force-type/save-forceType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/force-type/delete-forceType/'+id);
  }

}
