import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ICourseNamePagination,CourseNamePagination } from '../models/CourseNamePagination'
import { CourseName } from '../models/CourseName';
import { map } from 'rxjs';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CourseSection } from '../models/CourseSection';
@Injectable({
  providedIn: 'root'
})
export class CourseNameService {
  baseUrl = environment.apiUrl;
  CourseNames: CourseName[] = [];
  CourseNamePagination = new CourseNamePagination();
  constructor(private http: HttpClient) { }

  getCourseNames(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<ICourseNamePagination>(this.baseUrl + '/course-name/get-courseNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseNames = [...this.CourseNames, ...response.body.items];
        this.CourseNamePagination = response.body;
        return this.CourseNamePagination;
      })
    );

  } 

  getCourseModuleListByBaseSchoolNameIdCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<any[]>(this.baseUrl + '/course-module/get-CourseModuleListByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }

  //autocomplete for Course
    getSelectedCourseByName(courseName){
      return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-autocompleteCourseByName?courseName='+courseName)
        .pipe(
          map((response:[]) => response.map(item => item))
        )
    }

    getSelectedCourseByNameAndType(courseTypeId,courseName){
      return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-autocompleteCourseByNameAndType?courseTypeId='+courseTypeId+'&courseName='+courseName)
        .pipe(
          map((response:[]) => response.map(item => item))
        )
    }

    getSelectedCourseByType(courseTypeId){
      // course-name/get-selectedCourseByType?courseTypeId=1021
      return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByType?courseTypeId='+courseTypeId);
    }

  getSelectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-type/get-selectedCourseTypes');
}

  find(id: number) {
    return this.http.get<CourseName>(this.baseUrl + '/course-name/get-courseNameDetail/' + id);
  }
   
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-name/update-courseName/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/course-name/save-courseName', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-name/delete-courseName/'+id);
  }

}
