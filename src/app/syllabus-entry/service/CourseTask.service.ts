import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseTaskPagination,CourseTaskPagination } from '../models/CourseTaskPagination';
import { CourseTask } from '../models/CourseTask';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseTaskService {
  baseUrl = environment.apiUrl;
  CourseTasks: CourseTask[] = [];
  CourseTaskPagination = new CourseTaskPagination(); 
  constructor(private http: HttpClient) { }


  getCourseTasks(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ICourseTaskPagination>(this.baseUrl + '/course-task/get-courseTasks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseTasks = [...this.CourseTasks, ...response.body.items];
        this.CourseTaskPagination = response.body;
        return this.CourseTaskPagination;
      })
    ); 
  }
  getselectedBaseScoolName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedCourseName(courseName){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-autocompleteCourseByName?courseName='+courseName)
  }
  // getSelectedSubjectName(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames');
  // }
  getselectedSubjectBySchoolAndCourse(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNamesBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }
  getSelectedSubjectShowCourseTasklist(baseSchoolNameId:number,courseNameId:number, bnaSubjectNameId:number){
    return this.http.get<CourseTask[]>(this.baseUrl + '/course-task/get-courseTaskListBySchoolIdCourseNameIdAndSubjectNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }
  find(id: number) {
    return this.http.get<CourseTask>(this.baseUrl + '/course-task/get-courseTaskDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-task/update-courseTask/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/course-task/save-courseTask', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-task/delete-courseTask/'+id);
  }
}
