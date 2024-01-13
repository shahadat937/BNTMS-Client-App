import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBaseNamePagination,BaseNamePagination } from '../models/BaseNamePagination'
import { BaseName } from '../models/BaseName';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class BaseNameService {
  baseUrl = environment.apiUrl;
  BaseNames: BaseName[] = [];
  BaseNamePagination = new BaseNamePagination();
  constructor(private http: HttpClient) { }

  getBaseNames(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IBaseNamePagination>(this.baseUrl + '/base-name/get-baseNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BaseNames = [...this.BaseNames, ...response.body.items];
        this.BaseNamePagination = response.body;
        return this.BaseNamePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BaseName>(this.baseUrl + '/base-name/get-baseNameDetail/' + id);
  }

  getSelectedDistrictByDivision(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/district/get-selectedDistrictByDivisions?divisionId=' + id);
  }
  
  getSelectedDistrict(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/district/get-selectedDistricts')
  }

  getselecteddivision(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/division/get-selectedDivisions')
  }

  // getselectedadminauthority(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/admin-authority/get-selectedAdminAuthorities')
  // }
  getselectedforcetype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/force-type/get-selectedForceType')
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/base-name/update-baseName/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/base-name/save-baseName', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/base-name/delete-baseName/'+id);
  }

}
