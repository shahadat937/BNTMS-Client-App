import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseSectionPagination,CourseSectionPagination } from '../models/CourseSectionPagination';
import { CourseSection } from '../models/CourseSection';
import { map } from 'rxjs';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class CourseSectionService {
  baseUrl = environment.apiUrl;
  CourseSection: CourseSection[] = [];
  CourseSectionPagination = new CourseSectionPagination();
  constructor(private http: HttpClient) { }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }


  
  getselectedbnacurriculamtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-curriculam-type/get-selectedBnaCurriculamTypes')
  }


  getCourseSections(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<ICourseSectionPagination>(this.baseUrl + '/course-section/get-courseSections', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseSection = [...this.CourseSection, ...response.body.items];
        this.CourseSectionPagination = response.body;
        return this.CourseSectionPagination;
      })
    );
  }
  
  find(id: number) {
    return this.http.get<CourseSection>(this.baseUrl + '/course-section/get-courseSectionDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-section/update-courseSection/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/course-section/save-courseSection', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-section/delete-courseSection/'+id);
  }
  getCourseSectionListByBaseSchoolNameIdCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<any[]>(this.baseUrl + '/course-section/get-courseSectionListByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }
}
