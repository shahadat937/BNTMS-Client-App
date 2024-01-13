import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IBnaSubjectNamePagination, BnaSubjectNamePagination } from '../models/bnasubjectnamePagination'
import { BnaSubjectName } from '../models/bnasubjectname';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class BnaSubjectNameService {
  baseUrl = environment.apiUrl;
  BnaSubjectNames: BnaSubjectName[] = [];
  status:number;
  BnaSubjectNamePagination = new BnaSubjectNamePagination();
  constructor(private http: HttpClient) { }

 

  getSelectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
 
  
  


  getBnaSubjectNames(pageNumber, pageSize,searchText,status) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('status', status.toString());

    return this.http.get<IBnaSubjectNamePagination>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BnaSubjectNames = [...this.BnaSubjectNames, ...response.body.items];
        this.BnaSubjectNamePagination = response.body;
        return this.BnaSubjectNamePagination;
      })
    );
  }

  find(id: number) {
    return this.http.get<BnaSubjectName>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNameDetail/' + id);
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
