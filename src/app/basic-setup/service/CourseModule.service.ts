import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseModulePagination,CourseModulePagination } from '../models/CourseModulePagination';
import { CourseModule } from '../models/CourseModule';
import { map } from 'rxjs';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class CourseModuleService {
  baseUrl = environment.apiUrl;
  CourseModule: CourseModule[] = [];
  CourseModulePagination = new CourseModulePagination();
  constructor(private http: HttpClient) { }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getCourseModules(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<ICourseModulePagination>(this.baseUrl + '/course-module/get-courseModules', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseModule = [...this.CourseModule, ...response.body.items];
        this.CourseModulePagination = response.body;
        return this.CourseModulePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<CourseModule>(this.baseUrl + '/course-module/get-courseModuleDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-module/update-courseModule/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/course-module/save-courseModule', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-module/delete-courseModule/'+id);
  }
}
