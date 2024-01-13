import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaylorBranch } from '../models/SaylorBranch';
import {ISaylorBranchPagination, SaylorBranchPagination } from '../models/SaylorBranchPagination'

@Injectable({
  providedIn: 'root'
})
export class SaylorBranchService {

  baseUrl = environment.apiUrl;
  SaylorBranchs: SaylorBranch[] = [];
  SaylorBranchPagination = new SaylorBranchPagination();
  constructor(private http: HttpClient) { }

  getSaylorBranchs(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<ISaylorBranchPagination>(this.baseUrl + '/saylor-branch/get-SaylorBranchs', { observe: 'response', params })
    .pipe(
      map(response => {
        this.SaylorBranchs = [...this.SaylorBranchs, ...response.body.items];
        this.SaylorBranchPagination = response.body;
        return this.SaylorBranchPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<SaylorBranch>(this.baseUrl + '/saylor-branch/get-SaylorBranchDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/saylor-branch/update-SaylorBranch/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/saylor-branch/save-SaylorBranch', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/saylor-branch/delete-SaylorBranch/'+id);
  }
}
