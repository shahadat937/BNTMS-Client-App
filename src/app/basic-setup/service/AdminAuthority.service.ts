import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IAdminAuthorityPagination, AdminAuthorityPagination } from '../models/AdminAuthorityPagination'
import { AdminAuthority } from '../models/AdminAuthority';
import { map } from 'rxjs';
import { SelectedModel } from 'src/app/core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthorityService {
  baseUrl = environment.apiUrl;
  AdminAuthoritys: AdminAuthority[] = [];
  AdminAuthorityPagination = new AdminAuthorityPagination();
  constructor(private http: HttpClient) { }

  getAdminAuthorities(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IAdminAuthorityPagination>(this.baseUrl + '/admin-authority/get-adminAuthorities', { observe: 'response', params })
    .pipe(
      map(response => {
        this.AdminAuthoritys = [...this.AdminAuthoritys, ...response.body.items];
        this.AdminAuthorityPagination = response.body;
        return this.AdminAuthorityPagination;
      })
    );
   
  }

  getselectedAdminAuthorities(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/admin-authority/get-selectedAdminAuthorities')
  }

  find(id: number) {
    return this.http.get<AdminAuthority>(this.baseUrl + '/admin-authority/get-AdminAuthorityDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/admin-authority/update-adminAuthority/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/admin-authority/save-adminAuthority', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/admin-authority/delete-adminAuthority/'+id);
  }

}
