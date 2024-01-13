import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IClassPeriodPagination,ClassPeriodPagination } from '../models/classperiodPagination';
import { ClassPeriod } from '../models/classperiod';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class ClassPeriodService {
  baseUrl = environment.apiUrl;
  ClassPeriods: ClassPeriod[] = [];
  ClassPeriodPagination = new ClassPeriodPagination(); 
  constructor(private http: HttpClient) { }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedbaseschoolsByBase(baseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchoolNames?thirdLevel='+baseNameId)
  }
  getSelectedPeriodBySchoolAndCourse(baseSchoolNameId,courseNameId){
    return this.http.get<ClassPeriod[]>(this.baseUrl + '/class-period/get-selectedPeriodBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }

  getselectedbnaclassschedulestatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-class-schedule-status/get-selectedbnaClassScheduleStatuses')
  }
  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  
  getClassPeriods(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IClassPeriodPagination>(this.baseUrl + '/class-period/get-classPeriods', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ClassPeriods = [...this.ClassPeriods, ...response.body.items];
        this.ClassPeriodPagination = response.body;
        return this.ClassPeriodPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<ClassPeriod>(this.baseUrl + '/class-period/get-classPeriodDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/class-period/update-classPeriod/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/class-period/save-classPeriod', model).pipe(
      map((ClassPeriod: PostResponse) => {
        if (ClassPeriod) {
          console.log(ClassPeriod);
          return ClassPeriod;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/class-period/delete-classPeriod/'+id);
  }
}
