import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseDurationPagination,CourseDurationPagination } from '../models/coursedurationPagination';
import { CourseDuration } from '../models/courseduration';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseDurationService {
  baseUrl = environment.apiUrl;
  CourseDurations: CourseDuration[] = [];
  CourseDurationPagination = new CourseDurationPagination(); 
  constructor(private http: HttpClient) { }

getSelectedBaseName(){
  return this.http.get<SelectedModel[]>(this.baseUrl + '/base-name/get-selectedBases');
}

getselectedBaseNamesForCourse(branchLevel){
  return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedBaseNamesForCourse?branchLevel='+branchLevel);
}

deactiveCourseDuration(id: number) {
  return this.http.get<CourseDuration>(this.baseUrl + '/course-duration/deactive-courseDuration/' + id);
}

activeCoursePlan(id : number){
  return this.http.get<CourseDuration>(this.baseUrl + '/course-plan/active-coursePlan/' + id);
}

  getSchoolByBaseId(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedBaseSchoolByBase?baseNameId=' + id);
  }
  
  getSelectedSchoolsForCourse(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchoolNames?thirdLevel=' + id);
  }

  getCourseByType(id:string){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByType?courseTypeId=' + id);
  }

  getSelectedCourseDurationByCourseTypeId(courseTypeId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationByCourseTypeId?courseTypeId='+courseTypeId+'');
  }

  getNominatedTraineeCountByDurationId(courseDurationId){
    return this.http.get<any>(this.baseUrl + '/course-duration/get-nominatedTraineeCountByDurationId?courseDurationId='+courseDurationId);
  }

  getNbcdSchoolByCourseDurationId(courseDurationId){
    return this.http.get<any>(this.baseUrl + '/course-duration/get-nbcdSchoolNameByBaseSchoolNameId?courseDurationId='+courseDurationId);
  }

  getSelectedCourseSectionsBySchoolIdAndCourseId(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-section/get-selectedCourseSectionsByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedcountry(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountries')
  }

  getselectedcoursetype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-type/get-selectedCourseTypes')
  }

  //course-duration/get-courseDurationByCourseTypeFilter?viewStatus=0&courseTypeId=3
  getCourseListBySchool(schoolId){
    return this.http.get<CourseDuration[]>(this.baseUrl + '/course-duration/get-courseDurationListBySchoolId?baseSchoolNameId='+schoolId)
  }
 
  getCourseDurationFilter(viewStatus,courseTypeId){
    return this.http.get<CourseDuration[]>(this.baseUrl + '/course-duration/get-courseDurationByCourseTypeFilter?viewStatus='+viewStatus+'&courseTypeId='+courseTypeId+'')
  }
  getCourseDurationFilterForBna(viewStatus,courseTypeId){ //course-duration/get-courseDurationListForBnaByCourseTypeFilter?viewStatus=1&courseTypeId=3
    return this.http.get<CourseDuration[]>(this.baseUrl + '/course-duration/get-courseDurationListForBnaByCourseTypeFilter?viewStatus='+viewStatus+'&courseTypeId='+courseTypeId+'')
  }
  getCourseDurationsByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseTypeId', courseTypeId.toString());
   
    return this.http.get<ICourseDurationPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseDurations = [...this.CourseDurations, ...response.body.items];
        this.CourseDurationPagination = response.body;
        return this.CourseDurationPagination;
      })
    ); 
  }


  getCourseDurations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ICourseDurationPagination>(this.baseUrl + '/course-duration/get-courseDurations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseDurations = [...this.CourseDurations, ...response.body.items];
        this.CourseDurationPagination = response.body;
        return this.CourseDurationPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<CourseDuration>(this.baseUrl + '/course-duration/get-courseDurationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-duration/update-courseDuration/'+id, model);
  }
  // course-duration/update-nbcdCourseDuration/13364
  updateNbcdCourseDuration(id: number,model: any){
    return this.http.put(this.baseUrl + '/course-duration/update-nbcdCourseDuration/'+id, model);
  }

  getCourseDurationList(baseSchoolNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-nbcdCourseDurationByBaseSchoolNameId?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId);
  }
  getCourseDurationListForNbcdSchool(schoolNameId){
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-nbcdCourseDurationByNbcdSchoolId?nbcdSchoolId='+schoolNameId);
  }
  getRunningCourseDurationListForNbcdSchool(courseTypeId,currentDate,baseSchoolNameId,viewStatus){
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-runningCourseByNbcdSchoolNomination?courseTypeId='+courseTypeId+'&currentDate='+currentDate+'&baseSchoolNameId='+baseSchoolNameId+'&viewStatus='+viewStatus);
  }
  saveCourseDurationNbcd(model: any,branchId) {  
    return this.http.post<PostResponse>(this.baseUrl + '/course-duration/save-courseDuration-fornbcd?baseSchoolNameId='+branchId+'', model).pipe(
      map((CourseDuration: PostResponse) => {
        if (CourseDuration) {
          console.log(CourseDuration);
          return CourseDuration;
        }
      })
    );
  } 
  
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/course-duration/save-courseDuration', model).pipe(
      map((CourseDuration: PostResponse) => {
        if (CourseDuration) {
          console.log(CourseDuration);
          return CourseDuration;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-duration/delete-courseDuration/'+id);
  }
}
