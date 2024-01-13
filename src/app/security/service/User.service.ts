import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserPagination,UserPagination } from '../models/UserPagination';
import { User } from '../models/User';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
import { BIODataGeneralInfoPagination, IBIODataGeneralInfoPagination } from 'src/app/trainee-biodata/models/BIODataGeneralInfoPagination';
import { BIODataGeneralInfo } from 'src/app/trainee-biodata/models/BIODataGeneralInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.securityUrl;
  dropDownUrl = environment.apiUrl;
  Users: User[] = [];
  UserPagination = new UserPagination();
  BIODataGeneralInfos: BIODataGeneralInfo[] = [];
  BIODataGeneralInfoPagination = new BIODataGeneralInfoPagination();
  constructor(private http: HttpClient) { }

  getUsers(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IUserPagination>(this.baseUrl + '/users/get-users', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Users = [...this.Users, ...response.body.items];
        this.UserPagination = response.body;
        return this.UserPagination;
      })
    );
   
  }

  
  getTraineeList(pno) {

    return this.http.get<any[]>(this.dropDownUrl + '/trainee-bio-data-general-info/get-traineeListForUserCreate?pno='+pno)
    .pipe(
      map(response => {
        
        return response;
      })
    ); 
   
  }

  getInstructors(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IUserPagination>(this.baseUrl + '/Users/get-teacher-users', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Users = [...this.Users, ...response.body.items];
        this.UserPagination = response.body;
        return this.UserPagination;
      })
    );
   
  }

  getTrainees(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IUserPagination>(this.baseUrl + '/Users/get-student-users', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Users = [...this.Users, ...response.body.items];
        this.UserPagination = response.body;
        return this.UserPagination;
      })
    );
   
  }


  getselectedbranchinfo(){
    return this.http.get<SelectedModel[]>(this.dropDownUrl + '/branch-info/get-selectedBranchInfos')
  }


  getSelectedTraineeByPno(pno){
    return this.http.get<SelectedModel[]>(this.dropDownUrl + '/trainee-bio-data-general-info/get-autocompleteTraineeByPnoForUser?pno='+pno)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }


  find(id: string) {
    return this.http.get<User>(this.baseUrl + '/users/get-userDetail/' + id);
  }

  update(id:any, model: any) {
    return this.http.put(this.baseUrl + '/users/update-user?userId='+id, model);
  }
  
  resetPassword(id:any, model: any) {
    return this.http.post(this.baseUrl + '/Users/reset-userPassword?userId='+id, model);
  } 
  submit(model: any) {
    return this.http.post(this.baseUrl + '/users/save-user', model);
  } 

  saveUserList(model: any) {
    return this.http.post(this.baseUrl + '/Users/save-userlist', model);
  }  

  delete(id:number){
    return this.http.delete(this.baseUrl + '/users/delete-user/'+id);
  }
}
