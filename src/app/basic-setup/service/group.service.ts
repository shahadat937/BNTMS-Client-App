import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGroupPagination, GroupPagination } from '../models/GroupPagination';
import { Group } from '../models/Group';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.apiUrl;
  groups: Group[] = [];
  groupPagination = new GroupPagination();
  constructor(private http: HttpClient) { }

  getGroups(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IGroupPagination>(this.baseUrl + '/group/get-groups', { observe: 'response', params })
    .pipe(
      map(response => {
        this.groups = [...this.groups, ...response.body.items];
        this.groupPagination = response.body;
        return this.groupPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Group>(this.baseUrl + '/group/get-groupDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/group/update-group/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/group/save-group', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/group/delete-group/'+id);
  }
}
