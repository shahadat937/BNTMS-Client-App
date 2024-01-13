import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMigrationDocumentPagination,MigrationDocumentPagination } from '../models/migrationdocumentPagination';
import { MigrationDocument } from '../models/migrationdocument';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class MigrationDocumentService {
  baseUrl = environment.apiUrl;
  MigrationDocuments: MigrationDocument[] = [];
  MigrationDocumentPagination = new MigrationDocumentPagination(); 
  constructor(private http: HttpClient) { }

  getselectedrelationtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/relation-type/get-selectedrelationTypes')
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

  // getselectedMigrationDocumentremarks(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-mark-remark/get-selectedExamMarkRemark')
  // }

  // getselectebnaexamschedule(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-exam-schedule/get-selectedBnaExamSchedules')
  // }

  
 

  getMigrationDocuments(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IMigrationDocumentPagination>(this.baseUrl + '/migration-document/get-migrationdocuments', { observe: 'response', params })
    .pipe(
      map(response => {
        this.MigrationDocuments = [...this.MigrationDocuments, ...response.body.items];
        this.MigrationDocumentPagination = response.body;
        return this.MigrationDocumentPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<MigrationDocument>(this.baseUrl + '/migration-document/get-migrationdocumentdetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/migration-document/update-migrationdocument/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/migration-document/save-migrationdocument', model).pipe(
      map((MigrationDocument: PostResponse) => {
        if (MigrationDocument) {
          console.log(MigrationDocument);
          return MigrationDocument;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/migration-document/delete-migrationdocument/'+id);
  }
}
