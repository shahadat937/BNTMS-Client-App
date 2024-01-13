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

  getOrganizationList(){
    return this.http.get<BaseSchoolName[]>(this.baseUrl + '/base-School-name/get-organizationsList')
  }

  getSelectedOrganization(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedOrganizations')
  }

  getCommendingAreaList(organizationId){
    return this.http.get<BaseSchoolName[]>(this.baseUrl + '/base-School-name/get-commendingAreaByOrganization?firstLevel='+organizationId)
  }

  getSelectedCommendingArea(organizationId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedCommendingAreas?firstLevel='+organizationId)
  }

  getBaseNameList(commandingAreaId){
    return this.http.get<BaseSchoolName[]>(this.baseUrl + '/base-School-name/get-baseNameByCommendingArea?secondLevel='+commandingAreaId)
  }

  getSelectedBaseName(commandingAreaId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedBaseNames?secondLevel='+commandingAreaId)
  }

  getBaseSchoolList(baseNameId){
    return this.http.get<BaseSchoolName[]>(this.baseUrl + '/base-School-name/get-baseSchoolByBaseName?thirdLevel='+baseNameId)
  }

  getSelectedSchoolName(baseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchoolNames?thirdLevel='+baseNameId)
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
