import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrganizationName } from '../models/organizationname';
import {IOrganizationNamePagination, OrganizationNamePagination } from '../models/organizationnamePagination'
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class OrganizationNameService {

  baseUrl = environment.apiUrl;
  OrganizationNames: OrganizationName[] = [];
  OrganizationNamePagination = new OrganizationNamePagination();
  constructor(private http: HttpClient) { }

  

  getOrganizationNames(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IOrganizationNamePagination>(this.baseUrl + '/organization-name/get-OrganizationNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.OrganizationNames = [...this.OrganizationNames, ...response.body.items];
        this.OrganizationNamePagination = response.body;
        return this.OrganizationNamePagination;
      })
    );
  }

  //autocomplete for Course
    getSelectedOrganizationName(name){
      return this.http.get<SelectedModel[]>(this.baseUrl + '/organization-name/get-autocompleteOrganizationName?name='+name)
        .pipe(
          map((response:[]) => response.map(item => item))
        )
    }
  find(id: number) {
    return this.http.get<OrganizationName>(this.baseUrl + '/organization-name/get-OrganizationNameDetail/' + id);
  }
  getselectedForceType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/force-type/get-selectedForceType')
  }
  
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/organization-name/update-OrganizationName/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/organization-name/save-OrganizationName', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/organization-name/delete-OrganizationName/'+id);
  }
}
