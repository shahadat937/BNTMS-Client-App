import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InterServiceCourseDocType } from '../models/InterServiceCourseDocType';
import {IInterServiceCourseDocTypePagination, InterServiceCourseDocTypePagination } from '../models/InterServiceCourseDocTypePagination'
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class InterServiceCourseDocTypeService {

  baseUrl = environment.apiUrl;
  InterServiceCourseDocTypes: InterServiceCourseDocType[] = [];
  InterServiceCourseDocTypePagination = new InterServiceCourseDocTypePagination();
  constructor(private http: HttpClient) { }

  

  getInterServiceCourseDocTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IInterServiceCourseDocTypePagination>(this.baseUrl + '/inter-service-course-doc-type/get-InterServiceCourseDocTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.InterServiceCourseDocTypes = [...this.InterServiceCourseDocTypes, ...response.body.items];
        this.InterServiceCourseDocTypePagination = response.body;
        return this.InterServiceCourseDocTypePagination;
      })
    );
  }

  //autocomplete for Course
    // getSelectedOrganizationName(name){
    //   return this.http.get<SelectedModel[]>(this.baseUrl + '/organization-name/get-autocompleteOrganizationName?name='+name)
    //     .pipe(
    //       map((response:[]) => response.map(item => item))
    //     )
    // }
  find(id: number) {
    return this.http.get<InterServiceCourseDocType>(this.baseUrl + '/inter-service-course-doc-type/get-InterServiceCourseDocTypeDetail/' + id);
  }
 
  
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/inter-service-course-doc-type/update-InterServiceCourseDocType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/inter-service-course-doc-type/save-InterServiceCourseDocType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/inter-service-course-doc-type/delete-InterServiceCourseDocType/'+id);
  }
}
