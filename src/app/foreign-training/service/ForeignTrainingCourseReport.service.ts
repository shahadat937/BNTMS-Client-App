import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForeignTrainingCourseReport } from '../models/ForeignTrainingCourseReport';
import { SelectedModel } from '../../core/models/selectedModel';
import {IForeignTrainingCourseReportPagination, ForeignTrainingCourseReportPagination } from '../models/ForeignTrainingCourseReportPagination'

@Injectable({
  providedIn: 'root'
})
export class ForeignTrainingCourseReportService {

  baseUrl = environment.apiUrl;
  ForeignTrainingCourseReports: ForeignTrainingCourseReport[] = [];
  ForeignTrainingCourseReportPagination = new ForeignTrainingCourseReportPagination();
  constructor(private http: HttpClient) { }

  // getSelectedInterServiceCourseDocType(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/inter-service-course-doc-type/get-selectedInterServiceCourseDocType')
  // }
  
  // getselectedCourseNameByCourseTypeIdFromDuration(courseTypeId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdFromDuration?courseTypeId=' + courseTypeId);
  // }
  // getCourseByType(courseTypeId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByType?courseTypeId=' + courseTypeId);
  // }
  getForeignTrainingCourseReportsList(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IForeignTrainingCourseReportPagination>(this.baseUrl + '/foreign-training-course-report/get-ForeignTrainingCourseReports', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ForeignTrainingCourseReports = [...this.ForeignTrainingCourseReports, ...response.body.items];
        this.ForeignTrainingCourseReportPagination = response.body;
        return this.ForeignTrainingCourseReportPagination;
      })
    ); 
  }


  getStudentForeignTrainingCourseReports(pageNumber, pageSize,searchText,traineeId,courseDurationId) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
    params = params.append('courseDurationId', courseDurationId.toString());
    params = params.append('traineeId', traineeId.toString());

    return this.http.get<IForeignTrainingCourseReportPagination>(this.baseUrl + '/foreign-training-course-report/get-ForeignTrainingCourseReportsByStudent', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ForeignTrainingCourseReports = [...this.ForeignTrainingCourseReports, ...response.body.items];
        this.ForeignTrainingCourseReportPagination = response.body;
        return this.ForeignTrainingCourseReportPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<ForeignTrainingCourseReport>(this.baseUrl + '/foreign-training-course-report/get-ForeignTrainingCourseReportDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/foreign-training-course-report/update-ForeignTrainingCourseReport/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/foreign-training-course-report/save-ForeignTrainingCourseReport', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/foreign-training-course-report/delete-ForeignTrainingCourseReport/'+id);
  }
}
