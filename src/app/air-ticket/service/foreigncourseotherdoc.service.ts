import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IForeignCourseOtherDocPagination,ForeignCourseOtherDocPagination } from '../models/ForeignCourseOtherDocPagination';
import { ForeignCourseOtherDoc } from '../models/ForeignCourseOtherDoc';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { TraineeListForForeignCourseOtherDoc } from '../models/traineeListforforeigncourseotherdoc';

@Injectable({
  providedIn: 'root'
})
export class ForeignCourseOtherDocService {
  baseUrl = environment.apiUrl;
  ForeignCourseOtherDocs: ForeignCourseOtherDoc[] = [];
  ForeignCourseOtherDocPagination = new ForeignCourseOtherDocPagination(); 
  constructor(private http: HttpClient) { }

  getselectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdAndCompletedStatusFromCourseDuration')
  }

  getselectedFinancialSanctions(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/financial-sanction/get-selectedFinancialSanctions')
  }
  
  getNewTraineeNominationByCourseDurationId(courseDurationId:number){
    return this.http.get<TraineeListForForeignCourseOtherDoc[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsForAttendanceByCourseDurationId?courseDurationId='+courseDurationId);
  }

  getForeignCourseOtherDocs(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IForeignCourseOtherDocPagination>(this.baseUrl + '/foreign-course-other-doc/get-ForeignCourseOtherDocs', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ForeignCourseOtherDocs = [...this.ForeignCourseOtherDocs, ...response.body.items];
        this.ForeignCourseOtherDocPagination = response.body;
        return this.ForeignCourseOtherDocPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<ForeignCourseOtherDoc>(this.baseUrl + '/foreign-course-other-doc/get-ForeignCourseOtherDocDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/foreign-course-other-doc/update-ForeignCourseOtherDoc/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/foreign-course-other-doc/save-foreignCourseOtherDocList', model).pipe(
      map((ForeignCourseOtherDoc: PostResponse) => {
        if (ForeignCourseOtherDoc) {
          console.log(ForeignCourseOtherDoc);
          return ForeignCourseOtherDoc;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/foreign-course-other-doc/delete-ForeignCourseOtherDoc/'+id);
  }
}
