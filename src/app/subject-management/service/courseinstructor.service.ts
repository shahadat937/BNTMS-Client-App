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
  getSelectedBnaSemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }
  getSelectedDepartment(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/eepartment/get-selectedDepartments')
   }
  getSelectedSubjectCurriculum(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-curriculum/get-selectedBnaSubjectCurriculums')
  } 
  getselectedbnasubjectnamebybnaSemesterId( bnaSemesterId:number){//bna-subject-name/get-selectedSubjectByBnaSemesterId?bnaSemesterId=1'
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectByBnaSemesterId?bnaSemesterId='+bnaSemesterId)
  }
  getselectedbnasubjectnamebybnaSemesterIdAndSubjectCurriculumId( bnaSemesterId:number,bnaSubjectCurriculumId:number){//bna-subject-name/get-selectedSubjectByBnaSemesterIdAndSubjectCurriculumId?bnaSemesterId=9&bnaSubjectCurriculumId=1019'
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectByBnaSemesterIdAndSubjectCurriculumId?bnaSemesterId='+bnaSemesterId+'&bnaSubjectCurriculumId='+bnaSubjectCurriculumId)
  }
  getselectedcoursedurationForBna(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-section/get-selectedCourseSectionForBna')
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
  getInstructorByParameters(baseSchoolNameId,bnaSubjectNameId,courseModuleId,courseNameId, courseDurationId,courseSectionId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/get-courseInstructorByParameters?baseSchoolNameId='+baseSchoolNameId+'&bnaSubjectNameId='+bnaSubjectNameId+'&courseModuleId='+courseModuleId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId)
  }
  getInstructorListForBnaByParameters(baseSchoolNameId,bnaSubjectNameId,bnaSemesterId,courseNameId, courseDurationId,courseSectionId){//course-instructor/get-courseInstructorListForBnaByParameters?baseSchoolNameId=2&bnaSubjectNameId=33818&bnaSemesterId=1&courseNameId=4422&courseDurationId=14422&courseSectionId=8119'
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/get-courseInstructorListForBnaByParameters?baseSchoolNameId='+baseSchoolNameId+'&bnaSubjectNameId='+bnaSubjectNameId+'&bnaSemesterId='+bnaSemesterId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId)
  }
  // course-instructor/get-courseInstructorByCourseDurationIdandSubjectNameId?bnaSubjectNameId=3426&courseNameId=1251&courseDurationId=3138
  
  getCourseInstructorByCourseDurationIdANdSubjectNameId(subjectNameId,courseDurationId,courseNameId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/course-instructor/get-courseInstructorByCourseDurationIdandSubjectNameId?bnaSubjectNameId='+subjectNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  }
  
  getsubjectInstructorListByCourseDuration(courseDurationId){
    return this.http.get<CourseInstructor[]>(this.baseUrl + '/bna-subject-name/get-subjectInstructorListByCourseDuration?courseDurationId='+courseDurationId)
  }
  getCourseWeekListByCourseDuration(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/course-week/get-courseWeekByDuration?courseDurationId='+courseDurationId)
  }
  getInstructorListBySchoolAndCourse(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/course-instructor/get-instructorListByCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId)
  }
  getSubjectTotalByCourseId(baseSchoolNameId,courseNameId){
    return this.http.get<any[]>(this.baseUrl + '/course-name/get-subjectTotalByCourseId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }
  getCourseInfobySchoolAndCourse(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-courseInfoBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId)
  }
  getJstiTraineeBasicInfoDetails(traineeId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-jstiTraineeBasicInfoDetails?traineeId='+traineeId)
  }
  getParentRelativeListType(traineeId,groupType){
    return this.http.get<any[]>(this.baseUrl + '/parent-relative/get-parentRelativeListType?traineeId='+traineeId+'&groupType='+groupType)
  }
  getTraineeEducationalQualification(traineeId){
    return this.http.get<any[]>(this.baseUrl + '/educational-qualification/get-listByTrainee?Traineeid='+traineeId)
  }
  getTraineeMilitaryTrainings(traineeId){
    return this.http.get<any[]>(this.baseUrl + '/military-training/get-listByTrainee?Traineeid='+traineeId)
  }
  getTraineeRecordOfServices(traineeId){
    return this.http.get<any[]>(this.baseUrl + '/record-of-service/get-listByTrainee?Traineeid='+traineeId)
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
