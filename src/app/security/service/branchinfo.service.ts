import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IBranchInfoPagination, BranchInfoPagination } from '../models/BranchInfoPagination'
import { BranchInfo } from '../models/BranchInfo';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class BranchInfoService {
  baseUrl = environment.securityUrl;
  BranchInfos: BranchInfo[] = [];
  BranchInfoPagination = new BranchInfoPagination();
  constructor(private http: HttpClient) { }

  getFirstLevelBranchInfos(pageNumber, pageSize, searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IBranchInfoPagination>(this.baseUrl + '/branch-info/get-firstlevelbranchInfos', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BranchInfos = [...this.BranchInfos, ...response.body.items];
        this.BranchInfoPagination = response.body;
        return this.BranchInfoPagination;
      })
    );
   
  }

  getSecondLevelBranchInfos(pageNumber, pageSize, searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IBranchInfoPagination>(this.baseUrl + '/branch-info/get-secoundlevelbranchInfos', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BranchInfos = [...this.BranchInfos, ...response.body.items];
        this.BranchInfoPagination = response.body;
        return this.BranchInfoPagination;
      })
    );
   
  }

  getThirdLevelBranchInfos(pageNumber, pageSize, searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IBranchInfoPagination>(this.baseUrl + '/branch-info/get-thirdlevelbranchInfos', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BranchInfos = [...this.BranchInfos, ...response.body.items];
        this.BranchInfoPagination = response.body;
        return this.BranchInfoPagination;
      })
    );
   
  }

  getFourthLevelBranchInfos(pageNumber, pageSize, searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IBranchInfoPagination>(this.baseUrl + '/branch-info/get-fourthlevelbranchInfos', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BranchInfos = [...this.BranchInfos, ...response.body.items];
        this.BranchInfoPagination = response.body;
        return this.BranchInfoPagination;
      })
    );
   
  }

  getselectedmodule(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/module/get-selectedModules') 
  }

  find(id: number) {
    return this.http.get<BranchInfo>(this.baseUrl + '/branch-info/get-branchInfosDetail/' + id);
  }
   
  getselectedfirstlevelbranchinfo(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/branchinfo/get-selectedfirstlevelbranchinfos')
  }

  update(id: number,model: any) { 
    return this.http.put(this.baseUrl + '/branch-info/update-BranchInfo/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/branch-info/save-BranchInfo', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/branch-info/delete-BranchInfo/'+id);
  }
}
