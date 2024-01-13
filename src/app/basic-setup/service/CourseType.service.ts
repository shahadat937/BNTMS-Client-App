import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseType } from '../models/CourseType';
import {ICourseTypePagination, CourseTypePagination } from '../models/CourseTypePagination'

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  baseUrl = environment.apiUrl;
  CourseTypes: CourseType[] = [];
  CourseTypePagination = new CourseTypePagination();
  constructor(private http: HttpClient) { }

  getCourseTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<ICourseTypePagination>(this.baseUrl + '/course-type/get-courseTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseTypes = [...this.CourseTypes, ...response.body.items];
        this.CourseTypePagination = response.body;
        return this.CourseTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<CourseType>(this.baseUrl + '/course-type/get-courseTypeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-type/update-courseType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/course-type/save-courseType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/course-type/delete-courseType/'+id);
  }
}
