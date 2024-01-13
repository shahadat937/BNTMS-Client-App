import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITrainingSyllabusPagination,TrainingSyllabusPagination } from '../models/TrainingSyllabusPagination';
import { TrainingSyllabus } from '../models/TrainingSyllabus';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TrainingSyllabusService {
  baseUrl = environment.apiUrl;
  TrainingSyllabuses: TrainingSyllabus[] = [];
  TrainingSyllabusPagination = new TrainingSyllabusPagination(); 
  constructor(private http: HttpClient) { }


  getTrainingSyllabuses(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITrainingSyllabusPagination>(this.baseUrl + '/training-syllabus/get-trainingSyllabuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TrainingSyllabuses = [...this.TrainingSyllabuses, ...response.body.items];
        this.TrainingSyllabusPagination = response.body;
        return this.TrainingSyllabusPagination;
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
  getselectedSubjectFromObjectiveBySchoolAndCourse(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/training-objective/get-subjectNameFromTrainingObjectiveBySchoolIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }
  getselectedCourseTask(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-task/get-selectedCourseTask')
  }
  getselectedTrainingObjective(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/training-objective/get-selectedTrainingObjective')
  }
  getSelectedSubjectShowTrainingSyllabuslist(baseSchoolNameId:number,courseNameId:number, bnaSubjectNameId:number){
    return this.http.get<TrainingSyllabus[]>(this.baseUrl + '/training-syllabus/get-trainingSyllabusListBySchoolIdCourseNameIdAndSubjectNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }
  
  find(id: number) {
    return this.http.get<TrainingSyllabus>(this.baseUrl + '/training-syllabus/get-trainingSyllabusDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/training-syllabus/update-trainingSyllabus/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/training-syllabus/save-trainingSyllabus', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/training-syllabus/delete-trainingSyllabus/'+id);
  }
}
