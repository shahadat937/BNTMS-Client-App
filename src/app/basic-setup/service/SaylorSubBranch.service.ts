import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaylorSubBranch } from '../models/SaylorSubBranch';
import {ISaylorSubBranchPagination, SaylorSubBranchPagination } from '../models/SaylorSubBranchPagination'
import { SelectedModel } from '../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class SaylorSubBranchService {

  baseUrl = environment.apiUrl;
  SaylorSubBranchs: SaylorSubBranch[] = [];
  SaylorSubBranchPagination = new SaylorSubBranchPagination();
  constructor(private http: HttpClient) { }

  getSaylorSubBranchs(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<ISaylorSubBranchPagination>(this.baseUrl + '/saylor-sub-branch/get-SaylorSubBranchs', { observe: 'response', params })
    .pipe(
      map(response => {
        this.SaylorSubBranchs = [...this.SaylorSubBranchs, ...response.body.items];
        this.SaylorSubBranchPagination = response.body;
        return this.SaylorSubBranchPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<SaylorSubBranch>(this.baseUrl + '/saylor-sub-branch/get-SaylorSubBranchDetail/' + id);
  }
  getselectedSaylorBranch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/saylor-branch/get-selectedSaylorBranchs')
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/saylor-sub-branch/update-SaylorSubBranch/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/saylor-sub-branch/save-SaylorSubBranch', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/saylor-sub-branch/delete-SaylorSubBranch/'+id);
  }
}
