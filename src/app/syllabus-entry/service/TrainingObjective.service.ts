import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITrainingObjectivePagination,TrainingObjectivePagination } from '../models/TrainingObjectivePagination';
import { TrainingObjective } from '../models/TrainingObjective';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TrainingObjectiveService {
  baseUrl = environment.apiUrl;
  TrainingObjectives: TrainingObjective[] = [];
  TrainingObjectivePagination = new TrainingObjectivePagination(); 
  constructor(private http: HttpClient) { }


  getTrainingObjectives(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITrainingObjectivePagination>(this.baseUrl + '/training-objective/get-trainingObjectives', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TrainingObjectives = [...this.TrainingObjectives, ...response.body.items];
        this.TrainingObjectivePagination = response.body;
        return this.TrainingObjectivePagination;
      })
    ); 
  }
  getselectedBaseScoolName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedCourseName(courseName){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-autocompleteCourseByName?courseName='+courseName)
  }
  
  // getselectedSubjectBySchoolAndCourse(baseSchoolNameId,courseNameId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNamesBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  // }
  getselectedSubjectFromCourseTaskBySchoolAndCourse(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-task/get-subjectNameFromCourseTaskBySchoolIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }
  getselectedCourseTask(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-task/get-selectedCourseTask')
  }
  getSelectedSubjectShowTrainingObjectivelist(baseSchoolNameId:number,courseNameId:number, bnaSubjectNameId:number){
    return this.http.get<TrainingObjective[]>(this.baseUrl + '/training-objective/get-trainingObjectiveListBySchoolIdCourseNameIdAndSubjectNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }
  
  find(id: number) {
    return this.http.get<TrainingObjective>(this.baseUrl + '/training-objective/get-trainingObjectiveDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/training-objective/update-trainingObjective/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/training-objective/save-trainingObjective', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/training-objective/delete-trainingObjective/'+id);
  }
}
