import { Injectable } from '@angular/core';
import { ICourseGradingEntryPagination, CourseGradingEntryPagination} from '../models/CourseGradingEntryPagination';
import { PostResponse } from '../../core/models/PostResponse';
import { SelectedModel } from '../../core/models/selectedModel';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { CourseGradingEntry } from '../models/CourseGradingEntry';

@Injectable({
  providedIn: 'root'
})
export class CourseGradingEntryService {
  baseUrl = environment.apiUrl;
  CourseGradingEntry: CourseGradingEntry[] = [];
  CourseGradingEntryPagination = new CourseGradingEntryPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getCourseGradingEntry(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<ICourseGradingEntryPagination>(this.baseUrl + '/course-grading-entry/get-CourseGradingEntries', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseGradingEntry = [...this.CourseGradingEntry, ...response.body.items];
        this.CourseGradingEntryPagination = response.body;
        return this.CourseGradingEntryPagination;
      })
    );
   
  }
  getselectedSchools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  // getCourseByBaseSchoolNameId(baseSchoolNameId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByBaseNameId?baseSchoolNameId='+baseSchoolNameId)
  // }
  getselectedCourseNames(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
  getselectedAssessment(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/assessment/get-selectedAssessment')
  }
  getCourseGradingEntryListBySchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<CourseGradingEntry[]>(this.baseUrl + '/course-grading-entry/get-CourseGradingEntryListBySchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }

  find(id: number) {
    return this.http.get<CourseGradingEntry>(this.baseUrl + '/course-grading-entry/get-CourseGradingEntryDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-grading-entry/update-CourseGradingEntry/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/course-grading-entry/save-CourseGradingEntry', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-grading-entry/delete-CourseGradingEntry/'+id);
  }
}
