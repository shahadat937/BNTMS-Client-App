import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseplanCreatePagination,CourseplanCreatePagination } from '../models/CourseplanCreatePagination';
import { CourseplanCreate } from '../models/courseplancreate';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseplanCreateService {
  baseUrl = environment.apiUrl;
  CourseplanCreates: CourseplanCreate[] = [];
  CourseplanCreatePagination = new CourseplanCreatePagination(); 
  constructor(private http: HttpClient) { }

  getselectedcourseduration(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurations')
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
 
  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
 

  getCourseplanCreates(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ICourseplanCreatePagination>(this.baseUrl + '/course-plan/get-coursePlans', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseplanCreates = [...this.CourseplanCreates, ...response.body.items];
        this.CourseplanCreatePagination = response.body;
        return this.CourseplanCreatePagination;
      })
    ); 
  }
  
  deactiveCoursePlan(id: number) {
    return this.http.get<CourseplanCreate>(this.baseUrl + '/course-plan/deactive-coursePlan/' + id);
  }

  activeCoursePlan(id : number){
    return this.http.get<CourseplanCreate>(this.baseUrl + '/course-plan/active-coursePlan/' + id);
  }
  
  find(id: number) {
    return this.http.get<CourseplanCreate>(this.baseUrl + '/course-plan/get-coursePlanDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-plan/update-coursePlan/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/course-plan/save-coursePlan', model).pipe(
      map((CourseplanCreate: PostResponse) => {
        if (CourseplanCreate) {
          console.log(CourseplanCreate);
          return CourseplanCreate;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-plan/delete-coursePlan/'+id);
  }
}
