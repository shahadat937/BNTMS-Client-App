import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectCategory } from '../models/subjectcategory';
import {ISubjectCategoryPagination, SubjectCategoryPagination } from '../models/SubjectCategoryPagination'

@Injectable({
  providedIn: 'root'
})
export class SubjectCategoryService {

  baseUrl = environment.apiUrl;
  SubjectCategorys: SubjectCategory[] = [];
  SubjectCategoryPagination = new SubjectCategoryPagination();
  constructor(private http: HttpClient) { }

  getSubjectCategorys(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<ISubjectCategoryPagination>(this.baseUrl + '/subject-category/get-subjectCategories', { observe: 'response', params })
    .pipe(
      map(response => {
        this.SubjectCategorys = [...this.SubjectCategorys, ...response.body.items];
        this.SubjectCategoryPagination = response.body;
        return this.SubjectCategoryPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<SubjectCategory>(this.baseUrl + '/subject-category/get-subjectCategoryDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/subject-category/update-subjectCategory/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/subject-category/save-subjectCategory', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/subject-category/delete-subjectCategory/'+id);
  }
}
