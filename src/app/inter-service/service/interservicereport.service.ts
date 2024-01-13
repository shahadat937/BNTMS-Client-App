import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InterserviceReport } from '../models/interservicereport';
import { SelectedModel } from '../../core/models/selectedModel';
import {IInterserviceReportPagination, InterserviceReportPagination } from '../models/interservicereportPagination'

@Injectable({
  providedIn: 'root'
})
export class InterserviceReportService {

  baseUrl = environment.apiUrl;
  InterserviceReports: InterserviceReport[] = [];
  InterserviceReportPagination = new InterserviceReportPagination();
  constructor(private http: HttpClient) { }

  getSelectedInterServiceCourseDocType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/inter-service-course-doc-type/get-selectedInterServiceCourseDocType')
  }
  
  // getselectedCourseNameByCourseTypeIdFromDuration(courseTypeId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdFromDuration?courseTypeId=' + courseTypeId);
  // }
  getCourseByType(courseTypeId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByType?courseTypeId=' + courseTypeId);
  }


  getStudentInterServiceCourseReports(pageNumber, pageSize,searchText,traineeId,courseDurationId) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
    params = params.append('courseDurationId', courseDurationId.toString());
    params = params.append('traineeId', traineeId.toString());

    return this.http.get<IInterserviceReportPagination>(this.baseUrl + '/inter-service-course-report/get-InterServiceCourseReportsByStudent', { observe: 'response', params })
    .pipe(
      map(response => {
        this.InterserviceReports = [...this.InterserviceReports, ...response.body.items];
        this.InterserviceReportPagination = response.body;
        return this.InterserviceReportPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<InterserviceReport>(this.baseUrl + '/inter-service-course-report/get-InterServiceCourseReportDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/inter-service-course-report/update-InterServiceCourseReport/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/inter-service-course-report/save-InterServiceCourseReport', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/inter-service-course-report/delete-InterServiceCourseReport/'+id);
  }
}
