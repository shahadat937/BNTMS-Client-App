import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IBNASubjectCurriculamPagination, BNASubjectCurriculamPagination } from '../models/BNASubjectCurriculamPagination'
import { BNASubjectCurriculam } from '../models/BNASubjectCurriculam';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BNASubjectCurriculamService {
  baseUrl = environment.apiUrl;
  BNASubjectCurriculams: BNASubjectCurriculam[] = [];
  BNASubjectCurriculamPagination = new BNASubjectCurriculamPagination();
  constructor(private http: HttpClient) { }

  getBNASubjectCurriculams(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IBNASubjectCurriculamPagination>(this.baseUrl + '/bna-subject-curriculum/get-bnaSubjectCurriculums', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNASubjectCurriculams = [...this.BNASubjectCurriculams, ...response.body.items];
        this.BNASubjectCurriculamPagination = response.body;
        return this.BNASubjectCurriculamPagination;
      })
    );  
  }
  find(id: number) {
    return this.http.get<BNASubjectCurriculam>(this.baseUrl + '/bna-subject-curriculum/get-bnaSubjectCurriculumDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-subject-curriculum/update-bnaSubjectCurriculum/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-subject-curriculum/save-bnaSubjectCurriculum', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-subject-curriculum/delete-bnaSubjectCurriculum/'+id);
  }
}
