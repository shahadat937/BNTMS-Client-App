import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserManualPagination,UserManualPagination } from '../models/UserManualPagination';
import { UserManual } from '../models/UserManual';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class UserManualService {
  baseUrl = environment.apiUrl;
  apiUrl = environment.securityUrl;
  UserManuals: UserManual[] = [];
  UserManualPagination = new UserManualPagination(); 
  constructor(private http: HttpClient) { }

  getUserManuals(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IUserManualPagination>(this.baseUrl + '/user-manual/get-UserManuals', { observe: 'response', params })
    .pipe(
      map(response => {
        this.UserManuals = [...this.UserManuals, ...response.body.items];
        this.UserManualPagination = response.body;
        return this.UserManualPagination;
      })
    ); 
  }

  
  getSelectedRoles(){
    return this.http.get<SelectedModel[]>(this.apiUrl + '/Role/get-selectedallroles')
  }
  
  find(id: number) {
    return this.http.get<UserManual>(this.baseUrl + '/user-manual/get-UserManualDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/user-manual/update-UserManual/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/user-manual/save-UserManual', model).pipe(
      map((UserManual: PostResponse) => {
        if (UserManual) {
          console.log(UserManual);
          return UserManual;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/user-manual/delete-UserManual/'+id);
  }
}
