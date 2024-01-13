import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBranchPagination,BranchPagination } from '../models/branchPagination';
import { Branch } from '../models/branch';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  baseUrl = environment.apiUrl;
  branchs: Branch[] = [];
  branchPagination = new BranchPagination();
  constructor(private http: HttpClient) { }

  getBranchs(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IBranchPagination>(this.baseUrl + '/branch/get-branchs', { observe: 'response', params })
    .pipe(
      map(response => {
        this.branchs = [...this.branchs, ...response.body.items];
        this.branchPagination = response.body;
        return this.branchPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Branch>(this.baseUrl + '/branch/get-branchDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/branch/update-branch/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/branch/save-branch', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/branch/delete-branch/'+id);
  }
}
