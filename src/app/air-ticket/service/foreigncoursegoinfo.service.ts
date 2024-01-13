import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IForeignCourseGOInfoPagination,ForeignCourseGOInfoPagination } from '../models/ForeignCourseGOInfoPagination';
import { ForeignCourseGOInfo } from '../models/ForeignCourseGOInfo';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class ForeignCourseGOInfoService {
  baseUrl = environment.apiUrl;
  ForeignCourseGOInfos: ForeignCourseGOInfo[] = [];
  ForeignCourseGOInfoPagination = new ForeignCourseGOInfoPagination(); 
  constructor(private http: HttpClient) { }


  getselectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdAndCompletedStatusFromCourseDuration')
  }

  // getselectedBudgetType(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/budget-type/get-selectedBudgetTypes')
  // }

  // getselectedFiscalYear(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/fiscal-year/get-selectedFiscalYear')
  // }

  
  getForeignCourseGOInfos(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IForeignCourseGOInfoPagination>(this.baseUrl + '/foreign-course-go-info/get-ForeignCourseGOInfos', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ForeignCourseGOInfos = [...this.ForeignCourseGOInfos, ...response.body.items];
        this.ForeignCourseGOInfoPagination = response.body;
        return this.ForeignCourseGOInfoPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<ForeignCourseGOInfo>(this.baseUrl + '/foreign-course-go-info/get-ForeignCourseGOInfoDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/foreign-course-go-info/update-ForeignCourseGOInfo/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/foreign-course-go-info/save-ForeignCourseGOInfo', model).pipe(
      map((ForeignCourseGOInfo: PostResponse) => {
        if (ForeignCourseGOInfo) {
          console.log(ForeignCourseGOInfo);
          return ForeignCourseGOInfo;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/foreign-course-go-info/delete-ForeignCourseGOInfo/'+id);
  }
}
