import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ISubjectClassificationPagination, SubjectClassificationPagination } from '../models/SubjectClassificationPagination'
import { SubjectClassification } from '../models/SubjectClassification';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubjectClassificationService {
  baseUrl = environment.apiUrl;
  SubjectClassifications: SubjectClassification[] = [];
  SubjectClassificationPagination = new SubjectClassificationPagination();
  constructor(private http: HttpClient) { }

  getSubjectClassifications(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<ISubjectClassificationPagination>(this.baseUrl + '/subject-classification/get-subjectClassifications', { observe: 'response', params })
    .pipe(
      map(response => {
        this.SubjectClassifications = [...this.SubjectClassifications, ...response.body.items];
        this.SubjectClassificationPagination = response.body;
        return this.SubjectClassificationPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<SubjectClassification>(this.baseUrl + '/subject-classification/get-subjectClassificationDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/subject-classification/update-subjectClassification/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/subject-classification/save-subjectClassification', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/subject-classification/delete-subjectClassification/'+id);
  }

}
