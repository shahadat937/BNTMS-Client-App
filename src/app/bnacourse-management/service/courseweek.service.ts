import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseWeekPagination,CourseWeekPagination } from '../models/CourseWeekPagination';
import { CourseWeek } from '../models/courseweek';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseWeekService {
  baseUrl = environment.apiUrl;
  CourseWeeks: CourseWeek[] = [];
  CourseWeekPagination = new CourseWeekPagination(); 
  constructor(private http: HttpClient) { }

  // getselectedcourseduration(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurations')
  // }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }
 
  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
 

  getCourseWeeks(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ICourseWeekPagination>(this.baseUrl + '/course-week/get-courseWeeks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseWeeks = [...this.CourseWeeks, ...response.body.items];
        this.CourseWeekPagination = response.body;
        return this.CourseWeekPagination;
      })
    ); 
  }
  
  // deactiveCoursePlan(id: number) {
  //   return this.http.get<CourseWeek>(this.baseUrl + '/course-plan/deactive-coursePlan/' + id);
  // }

  // activeCoursePlan(id : number){
  //   return this.http.get<CourseWeek>(this.baseUrl + '/course-plan/active-coursePlan/' + id);
  // }
  
  find(id: number) {
    return this.http.get<CourseWeek>(this.baseUrl + '/course-week/get-courseWeekDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-week/update-courseWeek/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/course-week/save-courseWeek', model).pipe(
      map((CourseWeek: PostResponse) => {
        if (CourseWeek) {
          console.log(CourseWeek);
          return CourseWeek;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-week/delete-courseWeek/'+id);
  }
}
