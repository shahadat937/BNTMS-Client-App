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

// getSelectedBaseName(){
//   return this.http.get<SelectedModel[]>(this.baseUrl + '/base-name/get-selectedBases');
// }
  // getSchoolByBaseId(id:number){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedBaseSchoolByBase?baseNameId=' + id);
  // }

  // getCourseByType(id:string){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByType?courseTypeId=' + id);
  // }

  // getselectedcoursename(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  // }

  // getselectedbaseschools(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  // }

  // getselectedcountry(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountries')
  // }

  // getselectedexamtype(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-type/get-selectedExamType')
  // }

  // getselectedcoursetype(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-type/get-selectedCourseTypes')
  // }

  getselectedFiscalYear(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/fiscal-year/get-selectedFiscalYear')
  }
  stopCentralExam(courseDurationId){
    return this.http.get<CourseDuration[]>(this.baseUrl + '/course-duration/stop-interService/'+courseDurationId)
  }
  // stopNotices(noticeId){
  //   return this.http.get<Notice[]>(this.baseUrl + '/notice/stop-notices/'+noticeId)
  // }
  getCourseDurationsByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseTypeId', courseTypeId.toString());
   
    return this.http.get<ICourseDurationPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseNameId', { observe: 'response', params })
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
