import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBnaClassTestPagination,BnaClassTestPagination } from '../models/BnaClassTestPagination';
import { BnaClassTest } from '../models/BnaClassTest';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BnaClassTestService {
  baseUrl = environment.apiUrl;
  BnaClassTests: BnaClassTest[] = [];
  BnaClassTestPagination = new BnaClassTestPagination(); 
  constructor(private http: HttpClient) { }


  getselectedbnasemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getselectedBnaSemesterDurations(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester-duration/get-selectedBnaSemesterDurations')
  }

  getselectedsubjectCategory(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-category/get-selectedSubjectCategories')
  }

  getselectedbnaSubjectCurriculum(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-curriculum/get-selectedBnaSubjectCurriculums')
  }

  getselectedbnasubjectname(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  }

  getselectedbnaClassTestType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-class-test-type/get-selectedBnaClassTestTypes')
  }
  
  // getselectedcoursename(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  // }

  // getselectedBnaClassTestremarks(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-mark-remark/get-selectedExamMarkRemark')
  // }

  // getselectebnaexamschedule(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-exam-schedule/get-selectedBnaExamSchedules')
  // }

  
 

  getBnaClassTests(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IBnaClassTestPagination>(this.baseUrl + '/bna-class-test/get-bnaClassTests', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BnaClassTests = [...this.BnaClassTests, ...response.body.items];
        this.BnaClassTestPagination = response.body;
        return this.BnaClassTestPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BnaClassTest>(this.baseUrl + '/bna-class-test/get-bnaClassTestDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-class-test/update-bnaClassTest/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/bna-class-test/save-bnaClassTest', model).pipe(
      map((BnaClassTest: PostResponse) => {
        if (BnaClassTest) {
          console.log(BnaClassTest);
          return BnaClassTest;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-class-test/delete-bnaClassTest/'+id);
  }
}
