import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InterServiceMark } from '../models/interservicemark';
import { SelectedModel } from '../../core/models/selectedModel';
import { IInterServiceMarkPagination, InterServiceMarkPagination } from '../models/interservicemarkPagination'
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class InterServiceMarkService {

  baseUrl = environment.apiUrl;
  countries: InterServiceMark[] = [];
  InterServiceMarkPagination = new InterServiceMarkPagination();
  constructor(private http: HttpClient) { }

  //   //autocomplete for InterServiceMark
  // getSelectedPnoOfInterService(pno){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompletePnoForFamilyInfo?pno='+pno)
  //     .pipe(
  //       map((response:[]) => response.map(item => item))
  //     )
  // }
  // getInterServiceMarkListByPno(traineeId){
  //   return this.http.get<InterServiceMark[]>(this.baseUrl + '/inter-service-mark/get-InterServiceMarkListByPno?traineeId='+traineeId);
  // }
  getCourseNameByCountryId(id: number) {
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCountryId?country=' + id);
  }
  getSelectedCountry() {
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountries')
  }
  getSelectedDocument() {
    return this.http.get<SelectedModel[]>(this.baseUrl + '/document/get-selectedDocuments')
  }
  // getSelectedPno(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-selectedTraineeByPno')
  // }
  // getselectedCourseNameByCourseTypeIdFromDuration(courseTypeId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdFromDuration?courseTypeId=' + courseTypeId);
  // }
  getInterServiceMarks(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IInterServiceMarkPagination>(this.baseUrl + '/inter-service-mark/get-InterServiceMarks', { observe: 'response', params })
      .pipe(
        map(response => {
          this.countries = [...this.countries, ...response.body.items];
          this.InterServiceMarkPagination = response.body;
          return this.InterServiceMarkPagination;
        })
      );
  }
  find(id: number) {
    return this.http.get<InterServiceMark>(this.baseUrl + '/inter-service-mark/get-InterServiceMarkDetail/' + id);
  }


  update(id: number, model: any) {
    return this.http.put(this.baseUrl + '/inter-service-mark/update-InterServiceMark/' + id, model);
  }
  // submit(model: any) {
  //   return this.http.post(this.baseUrl + '/inter-service-mark/save-InterServiceMark', model);
  // }
  submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<PostResponse>(this.baseUrl + '/inter-service-mark/save-interServiceMarklist', model, httpOptions).pipe(
      map((InterServiceMark: PostResponse) => {
        if (InterServiceMark) {
          console.log(InterServiceMark);
          return InterServiceMark;
        }
      })
    );
  }
  delete(id) {
    return this.http.delete(this.baseUrl + '/inter-service-mark/delete-InterServiceMark/' + id);
  }
}
