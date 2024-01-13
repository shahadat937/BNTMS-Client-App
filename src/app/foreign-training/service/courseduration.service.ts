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

  getrunningCourseListForForeingTrainee(currentDate, viewStatus) {
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-runningCourseListForForeingTrainee?CurrentDate='+currentDate+'&viewStatus='+viewStatus).pipe(
      map(response => {
        
        return response;
      })
    );
  }
  getrunningCourseListForForeingTraineeDetails(currentDate, viewStatus) {
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-runningCourseListForForeingTraineeDetails?CurrentDate='+currentDate+'&viewStatus='+viewStatus).pipe(
      map(response => {
        
        return response;
      })
    );
  }
  getrunningCourseListForForeingTraineeCountry(currentDate, viewStatus) {
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-runningCourseListForForeingTraineeCountry?CurrentDate='+currentDate+'&viewStatus='+viewStatus).pipe(
      map(response => {
        
        return response;
      })
    );
  }
  getrunningCourseListForForeingTraineeDesignation(currentDate, viewStatus) {
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-runningCourseListForForeingTraineeDesignation?CurrentDate='+currentDate+'&viewStatus='+viewStatus).pipe(
      map(response => {
        
        return response;
      })
    );
  }
  getrunningCourseListForForeingTraineeUpcoming(currentDate) {
    return this.http.get<any[]>(this.baseUrl + '/course-duration/get-runningCourseListForForeingTraineeUpcoming?CurrentDate='+currentDate).pipe(
      map(response => {
        
        return response;
      })
    );
  }
getSelectedBaseName(){
  return this.http.get<SelectedModel[]>(this.baseUrl + '/base-name/get-selectedBases');
}

deactiveCourseDuration(id: number) {
  return this.http.get<CourseDuration>(this.baseUrl + '/course-duration/deactive-courseDuration/' + id);
}

getForeignCoursesByCountryId(countryId) {
  return this.http.get<CourseDuration[]>(this.baseUrl + '/course-duration/get-foreignCourseListByCountryId?countryId='+countryId);
}

ChangeCourseCompleteStatus(courseDurationId,isCompletedStatus) {
  return this.http.get<any>(this.baseUrl + '/course-duration/change-courseCompleteStatus?courseDurationId='+courseDurationId+'&isCompleteStatus='+isCompletedStatus);
}

activeCoursePlan(id : number){
  return this.http.get<CourseDuration>(this.baseUrl + '/course-plan/active-coursePlan/' + id);
}

  getSchoolByBaseId(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedBaseSchoolByBase?baseNameId=' + id);
  }

  getCourseByType(id:string){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByType?courseTypeId=' + id);
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
