import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INewEntryEvaluationPagination,NewEntryEvaluationPagination } from '../models/NewEntryEvaluationPagination';
import { NewEntryEvaluation } from '../models/NewEntryEvaluation';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class NewEntryEvaluationService {
  baseUrl = environment.apiUrl;
  NewEntryEvaluations: NewEntryEvaluation[] = [];
  NewEntryEvaluationPagination = new NewEntryEvaluationPagination(); 
  constructor(private http: HttpClient) { }
  
  
  // getfamilyInfoListByPno(traineeId){
  //   return this.http.get<FamilyInfo[]>(this.baseUrl + '/family-info/get-familyInfoListByPno?traineeId='+traineeId);
  // }
  getselectedSchool(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedCourseNameBySchool(baseSchoolNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByBaseNameId?baseSchoolNameId='+baseSchoolNameId)
  }

  getselectedCourseModulesBySchoolAndCourse(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModulesByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }

  getselectedCourseWeek(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-week/get-selectedCourseWeekForEvaluation')
  }

  getselectedPno(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-selectedTraineeByPno')
  }
  getSelectedCourseDurationByParameterRequestFromNewEntryEvaluation(baseSchoolNameId,courseNameId){
    return this.http.get<number>(this.baseUrl + '/course-duration/get-selectedCourseDurationByParameterRequestFromEntryEvaluation?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }
  getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<number>(this.baseUrl + '/course-duration/get-selectedCourseDurationIdByBaseSchoolNameAndCourseNameRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }

  getNewEntryEvaluations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<INewEntryEvaluationPagination>(this.baseUrl + '/new-entry-evaluation/get-NewEntryEvaluations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.NewEntryEvaluations = [...this.NewEntryEvaluations, ...response.body.items];
        this.NewEntryEvaluationPagination = response.body;
        return this.NewEntryEvaluationPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<NewEntryEvaluation>(this.baseUrl + '/new-entry-evaluation/get-NewEntryEvaluationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/new-entry-evaluation/update-NewEntryEvaluation/'+id, model);
  }
  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/new-entry-evaluation/save-NewEntryEvaluation', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/new-entry-evaluation/delete-NewEntryEvaluation/'+id);
  }
}
