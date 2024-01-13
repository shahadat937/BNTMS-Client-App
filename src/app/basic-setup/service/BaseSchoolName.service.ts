import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBaseSchoolNamePagination,BaseSchoolNamePagination } from '../models/BaseSchoolNamePagination'
import { BaseSchoolName } from '../models/BaseSchoolName';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class BaseSchoolNameService {
  baseUrl = environment.apiUrl;
  BaseSchoolNames: BaseSchoolName[] = [];
  BaseSchoolNamePagination = new BaseSchoolNamePagination();
  constructor(private http: HttpClient) { }

  getBaseSchoolNames(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IBaseSchoolNamePagination>(this.baseUrl + '/base-School-name/get-baseSchoolNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BaseSchoolNames = [...this.BaseSchoolNames, ...response.body.items];
        this.BaseSchoolNamePagination = response.body;
        return this.BaseSchoolNamePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BaseSchoolName>(this.baseUrl + '/base-School-name/get-baseSchoolNameDetail/' + id);
  }
  
  getUserManualByRole(roleName) {
    return this.http.get<any>(this.baseUrl + '/user-manual/get-UserManualByRole?UserRoleName=' + roleName);
  }

  getselectedbasename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-name/get-selectedBases')
  }

  
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/base-School-name/update-baseSchoolName/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/base-School-name/save-baseSchoolName', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/base-School-name/delete-baseSchoolName/'+id);
  }

}
