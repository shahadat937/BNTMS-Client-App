import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import {ProfileUpdate} from '../models/ProfileUpdate'
@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  baseUrl = environment.apiUrl;
  securityUrl = environment.securityUrl;
  constructor(private http: HttpClient) { }

  updateUserProfile(userId:string,model: any) {
    return this.http.put(this.securityUrl + '/Users/update-user-email-phone?userId='+userId, model);
  }

  // getProfileUpdates(pageNumber, pageSize, searchText) { 
   // Users/update-user-email-phone?userId=1
  // users/update-user?userId='+id
  //blood-group/update-ProfileUpdate/'+id, model
  //   let params = new HttpParams();

  //   params = params.append('searchText', searchText.toString());
  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());

    
  //   return this.http.get<IProfileUpdatePagination>(this.baseUrl + '/blood-group/get-ProfileUpdates', { observe: 'response', params })
  //   .pipe(
  //     map(response => {
  //       this.ProfileUpdates = [...this.ProfileUpdates, ...response.body.items];
  //       this.ProfileUpdatePagination = response.body;
  //       return this.ProfileUpdatePagination;
  //     })
  //   );
   
  // }

  find(id: string) {
    return this.http.get<ProfileUpdate>(this.securityUrl + '/Users/get-userDetail/' + id);
  }
   

  // update(id: number,model: any) {
  //   return this.http.put(this.baseUrl + '/blood-group/update-ProfileUpdate/'+id, model);
  // }
  // submit(model: any) {
  //   return this.http.post(this.baseUrl + '/blood-group/save-ProfileUpdate', model);
  // } 
  // delete(id:number){
  //   return this.http.delete(this.baseUrl + '/blood-group/delete-ProfileUpdate/'+id);
  // }

}
