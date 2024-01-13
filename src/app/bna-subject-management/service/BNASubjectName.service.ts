import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IBNASubjectNamePagination, BNASubjectNamePagination } from '../models/BNASubjectNamePagination'
import { BNASubjectName } from '../models/BNASubjectName';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class BNASubjectNameService {
  baseUrl = environment.apiUrl;
  BNASubjectNames: BNASubjectName[] = [];
  status:number;
  BNASubjectNamePagination = new BNASubjectNamePagination();
  constructor(private http: HttpClient) { }

  getSelectedBnaSemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getSelectedCourseModule(){
   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModules')
  }

  getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId:number,courseNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModulesByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }

  getSelectedCourseByParameters(baseSchoolNameId:number,courseNameId:number, courseModuleId:number, status:number){
    return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-celectedCourseByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId+'&status='+status)
  }

  getSelectedsubjectsBySchoolAndCourse(baseSchoolNameId:number,courseNameId:number){
    return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }

  getbnaSubjectListForStudentDashboard(baseSchoolNameId,courseNameId,courseModuleId){
    return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-bnaSubjectListForStudentDashboard?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId)
  }

  getSelectedSchoolName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getSelectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
 
  getSelectedSubjectCategory(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-category/get-selectedSubjectCategories')
  }
 
  getSelectedSubjectCurriculum(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-curriculum/get-selectedBnaSubjectCurriculums')
  } 

  getSelectedSubjectType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-type/get-getSelectedSubjectType')
  }
 
  getSelectedKindOfSubject(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/kind-of-subject/get-selectedKindOfSubject')
  }

  getSelectedSubjectClassification(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-classification/get-selectedSubjectClassification')
  }

  // getCourseDurationsByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

  //   let params = new HttpParams(); 
    
  //   params = params.append('searchText', searchText.toString());
  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());
  //   params = params.append('courseTypeId', courseTypeId.toString());
   
  //   return this.http.get<ICourseDurationPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
  //   .pipe(
  //     map(response => {
  //       this.CourseDurations = [...this.CourseDurations, ...response.body.items];
  //       this.CourseDurationPagination = response.body;
  //       return this.CourseDurationPagination;
  //     })
  //   ); 
  // }
  // getBNASubjectNames(pageNumber, pageSize,searchText) {

  //   let params = new HttpParams();
    
  //   params = params.append('searchText', searchText.toString());
  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());

  //   return this.http.get<IBNASubjectNamePagination>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNames', { observe: 'response', params })
  //   .pipe(
  //     map(response => {
  //       this.BNASubjectNames = [...this.BNASubjectNames, ...response.body.items];
  //       this.BNASubjectNamePagination = response.body;
  //       return this.BNASubjectNamePagination;
  //     })
  //   );
  // }


  getBNASubjectNames(pageNumber, pageSize,searchText,status) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('status', status.toString());

    return this.http.get<IBNASubjectNamePagination>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNASubjectNames = [...this.BNASubjectNames, ...response.body.items];
        this.BNASubjectNamePagination = response.body;
        return this.BNASubjectNamePagination;
      })
    );
  }

  find(id: number) {
    return this.http.get<BNASubjectName>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNameDetail/' + id);
  }
  update(id: number,model: any) { 
    return this.http.put(this.baseUrl + '/bna-subject-name/update-bnaSubjectName/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-subject-name/save-bnaSubjectName', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-subject-name/delete-bnaSubjectName/'+id);
  }
}
