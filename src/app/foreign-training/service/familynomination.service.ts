import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFamilyNominationPagination,FamilyNominationPagination } from '../models/familynominationPagination';
import { FamilyNomination } from '../models/familynomination';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { FamilyInfo } from '../models/familyinfo';

@Injectable({
  providedIn: 'root'
})
export class FamilyNominationService {
  baseUrl = environment.apiUrl;
  FamilyNominations: FamilyNomination[] = [];
  FamilyNominationPagination = new FamilyNominationPagination(); 
  constructor(private http: HttpClient) { }

  getselectedrelationtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/relation-type/get-selectedrelationTypes')
  }
  getfamilyInfoListByTraineeId(traineeId){
    return this.http.get<FamilyInfo[]>(this.baseUrl + '/family-info/get-familyInfoListByTraineeId?traineeId='+traineeId);
  }
  // getselectedbnasemester(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  // }

  // getselectedbnabatch(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-batch/get-selectedBnaBatchs')
  // }

  // getselectedexamtype(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-type/get-selectedExamType')
  // }

  // getselectedbnacurriculumtype(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-curriculam-type/get-selectedBnaCurriculamTypes')
  // }

  // getselectedbnasubjectname(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  // }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }
  
  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  

  
 

  getFamilyNominations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IFamilyNominationPagination>(this.baseUrl + '/family-nomination/get-familynomination', { observe: 'response', params })
    .pipe(
      map(response => {
        this.FamilyNominations = [...this.FamilyNominations, ...response.body.items];
        this.FamilyNominationPagination = response.body;
        return this.FamilyNominationPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<FamilyNomination>(this.baseUrl + '/family-nomination/get-familynominationdetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/family-nomination/update-familynomination/'+id, model);
  }
  // submit(model: any) {
    
  //   return this.http.post<PostResponse>(this.baseUrl + '/family-nomination/save-familyNominationList', model).pipe(
  //     map((FamilyNomination: PostResponse) => {
  //       if (FamilyNomination) {
  //         console.log(FamilyNomination);
  //         return FamilyNomination;
  //       }
  //     })
  //   );
  // } 
  submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<PostResponse>(this.baseUrl + '/family-nomination/save-familyNominationList', model, httpOptions).pipe(
      map((InterServiceMark: PostResponse) => {
        if (InterServiceMark) {
          console.log(InterServiceMark);
          return InterServiceMark;
        }
      })
    );
  }
  delete(id:number){
    return this.http.delete(this.baseUrl + '/family-nomination/delete-familynomination/'+id);
  }
}
