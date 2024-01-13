import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMembershipTypePagination,MembershipTypePagination} from '../models/MembershipTypePagination';
import { MembershipType } from '../models/MembershipType';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipTypeService {
  baseUrl = environment.apiUrl;
  membershipTypes: MembershipType[] = [];
  membershipTypePagination = new MembershipTypePagination();
  constructor(private http: HttpClient) { }

  getMembershipTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IMembershipTypePagination>(this.baseUrl + '/membership-type/get-membershipTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.membershipTypes = [...this.membershipTypes, ...response.body.items];
        this.membershipTypePagination = response.body;
        return this.membershipTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<MembershipType>(this.baseUrl + '/membership-type/get-membershipTypeDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/membership-type/update-membershipType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/membership-type/save-membershipType', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/membership-type/delete-membershipType/'+id);
  }
}
