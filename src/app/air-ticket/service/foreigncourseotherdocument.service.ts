import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IForeignCourseOtherDocumentPagination,ForeignCourseOtherDocumentPagination } from '../models/ForeignCourseOtherDocumentPagination';
import { ForeignCourseOtherDocument } from '../models/ForeignCourseOtherDocument';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class ForeignCourseOtherDocumentService {
  baseUrl = environment.apiUrl;
  ForeignCourseOtherDocuments: ForeignCourseOtherDocument[] = [];
  ForeignCourseOtherDocumentPagination = new ForeignCourseOtherDocumentPagination(); 
  constructor(private http: HttpClient) { }

  // getselectedCourseName(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdAndCompletedStatusFromCourseDuration')
  // }foreign-course-doctype/get-selectedForeignCourseDocTypes


  getselectedDocType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/foreign-course-doctype/get-selectedForeignCourseDocTypes')
  }

  getselectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdAndCompletedStatusFromCourseDuration')
  }
  
  // getNewTraineeNominationByCourseDurationId(courseDurationId:number){
  //   return this.http.get<TraineeListForForeignCourseOtherDocument[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsForAttendanceByCourseDurationId?courseDurationId='+courseDurationId);
  // }

  getForeignCourseOtherDocuments(pageNumber, pageSize,searchText,courseDurationId,traineeId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
    params = params.append('courseDurationId', courseDurationId.toString());
    params = params.append('traineeId', traineeId.toString());
   
    return this.http.get<IForeignCourseOtherDocumentPagination>(this.baseUrl + '/foreign-course-others-document/get-foreignCourseOthersDocuments', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ForeignCourseOtherDocuments = [...this.ForeignCourseOtherDocuments, ...response.body.items];
        this.ForeignCourseOtherDocumentPagination = response.body;
        return this.ForeignCourseOtherDocumentPagination;
      })
    ); 
  }
  
  //foreign-course-others-document/get-foreignCourseOthersDocuments
getForeignCourseOtherDocumentByCourseDurationIdandTraineId(courseNameId,courseDurationId){
 // return this.http.get<ForeignCourseOtherDocument>(this.baseUrl + '/foreign-course-others-document/get-foreignCourseOthersDocuments/' + id);
}

  find(id: number) {
    return this.http.get<ForeignCourseOtherDocument>(this.baseUrl + '/foreign-course-others-document/get-foreignCourseOthersDocumentDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/foreign-course-others-document/update-foreignCourseOthersDocument/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/foreign-course-others-document/save-foreignCourseOthersDocument', model).pipe(
      map((ForeignCourseOtherDocument: PostResponse) => {
        if (ForeignCourseOtherDocument) {
          console.log(ForeignCourseOtherDocument);
          return ForeignCourseOtherDocument;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/foreign-course-others-document/delete-foreignCourseOthersDocument/'+id);
  }
}
