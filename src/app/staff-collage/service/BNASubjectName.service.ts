import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IBNASubjectNamePagination, BNASubjectNamePagination } from '../models/BNASubjectNamePagination'
import { BNASubjectName } from '../models/BNASubjectName';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class BNASubjectNameService {
  baseUrl = environment.apiUrl;
  BNASubjectNames: BNASubjectName[] = [];
  status:number;
  BNASubjectNamePagination = new BNASubjectNamePagination();
  constructor(private http: HttpClient) { }

  getSubjectNameByFromCourseNameIdAndBranchId(courseNameId,branchId){
    return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByFromCourseNameIdAndBranchId?courseNameId='+courseNameId+'&branchId='+branchId);
  }

  getSelectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByCourseTypeId')
  }
  getselectedSubjectNameByBranchId(){
    return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNameListByCourseNameId')
  }
  // getselectedSubjectName(){
  //   return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNameListByCourseNameId')
  // }
  getSelectedBranch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/branch/get-selectedBranchs')
  }
  getBNASubjectNames(pageNumber, pageSize,searchText,status) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('status', status.toString());

    return this.http.get<IBNASubjectNamePagination>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNASubjectNames = [...this.BNASubjectNames, ...response.body.items];
        this.BNASubjectNamePagination = response.body;
        return this.BNASubjectNamePagination;
      })
    );
  }

  find(id: number) {
    return this.http.get<BNASubjectName>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNameDetail/' + id);
  }
  update(id: number,model: any) { 
    return this.http.put(this.baseUrl + '/bna-subject-name/update-bnaSubjectName/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-subject-name/save-bnaSubjectName', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-subject-name/delete-bnaSubjectName/'+id);
  }
}
