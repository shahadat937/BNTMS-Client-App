import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseInstructorPagination,CourseInstructorPagination } from '../models/courseinstructorPagination';
import { CourseInstructor } from '../models/courseinstructor';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseInstructorService {
  baseUrl = environment.apiUrl;
  CourseInstructors: CourseInstructor[] = [];
  CourseInstructorPagination = new CourseInstructorPagination(); 
  constructor(private http: HttpClient) { }

  getSelectedModule(){
     return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModules')
  }

  getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId:number,courseNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModulesByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
   }

  getCourseByBaseSchoolId(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-courseDurationByBaseSchool?baseSchoolNameId=' + id);
  }

  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }

  getSelectedTraineeByPno(pno){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo='+pno)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }
 
  getselectedschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedbnasubjectname(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  }

  getselectedbnasubjectnamebyparameters(baseSchoolNameId:number,courseNameId:number, courseModuleId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNamesByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId)
  }

  getselectedcourseduration(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurations')
  }

  getCourseInstructors(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ICourseInstructorPagination>(this.baseUrl + '/course-instructor/get-courseInstructors', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseInstructors = [...this.CourseInstructors, ...response.body.items];
        this.CourseInstructorPagination = response.body;
        return this.CourseInstructorPagination;
      })
    ); 
  }
  stopCourseInstructor(courseInstructorId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/stop-courseinstructor/'+courseInstructorId)
  }
  RunningCourseInstructor(courseInstructorId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/running-courseinstructor/'+courseInstructorId)
  }
  getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId,courseModuleId,courseNameId, courseDurationId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/get-courseInstructorByParameters?baseSchoolNameId='+baseSchoolNameId+'&bnaSubjectNameId='+bnaSubjectNameId+'&courseModuleId='+courseModuleId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId)
  }
  // course-instructor/get-courseInstructorByCourseDurationIdandSubjectNameId?bnaSubjectNameId=3426&courseNameId=1251&courseDurationId=3138
  
  getCourseInstructorByCourseDurationIdANdSubjectNameId(subjectNameId,courseDurationId,courseNameId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/get-courseInstructorByCourseDurationIdandSubjectNameId?bnaSubjectNameId='+subjectNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  }
  
  getInstructorBySchoolAndCourse(baseSchoolNameId,courseDurationId,courseNameId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/get-instructorByCourseAndSchool?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&courseNameId='+courseNameId)
  }
  getInstructorListBySchoolAndCourse(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/course-instructor/get-instructorListByCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId)
  }
  find(id: number) {
    return this.http.get<CourseInstructor>(this.baseUrl + '/course-instructor/get-courseInstructorDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-instructor/update-courseInstructor/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/course-instructor/save-courseInstructor', model).pipe(
      map((CourseInstructor: PostResponse) => {
        if (CourseInstructor) {
          console.log(CourseInstructor);
          return CourseInstructor;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-instructor/delete-courseInstructor/'+id);
  }
}
