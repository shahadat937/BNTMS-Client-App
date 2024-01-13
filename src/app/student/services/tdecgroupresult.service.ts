import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { IBNAExamMarkPagination,BNAExamMarkPagination } from '../models/bnaexammarkPagination';
import {TdecGroupResult} from '../models/tdecgroupresult';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { BNASubjectName } from 'src/app/subject-management/models/BNASubjectName';
import { SubjectMark } from '../../subject-management/models/SubjectMark';
// import { TraineeListForExamMark } from '../models/traineeListforexammark';

@Injectable({
  providedIn: 'root'
})
export class TdecGroupResultService {
  baseUrl = environment.apiUrl;
  BNAExamMarks: TdecGroupResult[] = [];
  // BNAExamMarkPagination = new BNAExamMarkPagination(); 
  constructor(private http: HttpClient) { }


  // getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
  //   return this.http.get<number>(this.baseUrl + '/course-duration/get-selectedCourseDurationIdByBaseSchoolNameAndCourseNameRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  // }

  // GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId,courseNameId,subjectNameId){
  //   return this.http.get<SubjectMark[]>(this.baseUrl + '/subject-mark/get-SelectedSubjectMarkByBaseSchoolCourseNameAndBnaSubjectNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  // }

  // GetRoutineIdWithSchoolCourseSubject(baseSchoolNameId,courseNameId,subjectNameId){
  //   return this.http.get<number>(this.baseUrl + '/class-routine/get-SelectedRoutineIdWithSchoolCourseSubject?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  // }

  // GetTotalMarkAndPassMarkByBaseSchoolIdCourseIdAndSubjectId(baseSchoolNameId,courseNameId,subjectName){
  //   return this.http.get<BNASubjectName>(this.baseUrl + '/bna-subject-name/get-totalmarkAndPassMarkFromprocedure?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectName);
  // }

  // getselectedbaseschools(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  // }
  // getselectedexammarkremark(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-mark-remark/get-selectedExamMarkRemark')
  // }
  // getselectedmarktypes(baseSchoolNameId,courseNameId,subjectNameId,courseModuleId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-selectedMarkTypeByParametersFromSubjectMark?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId+'&courseModuleId='+courseModuleId)
  // }
  // getapprovededmarktypes(baseSchoolNameId,courseNameId,subjectNameId,courseModuleId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-approvedMarkTypeByParametersFromSubjectMark?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId+'&courseModuleId='+courseModuleId)
  // }
  // getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  // }
  // getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByParametersFromRoutineTable?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  // }
 
  // getSelectedSubjectNameListForInstructorDashBoardByBaseSchoolNameIdAndCourseNameId(traineeId,baseSchoolNameId,courseDurationId){
  //   return this.http.get<any[]>(this.baseUrl + '/bna-subject-name/get-subjectNameListForInstructorDashboardDropdown?traineeId='+traineeId+'&baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId);
  // }

  // getApprovedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-approvedSubjectNameByParametersFromRoutineTable?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  // }

  // getexamMarkListByParameters(baseSchoolNameId,courseNameId,subjectNameId,subjectMarkId,approveStatus){
  //   return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/bna-exam-mark/get-examMarkListByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId+'&subjectMarkId='+subjectMarkId+'&approveStatus='+approveStatus);
  // }

  // getSelectedClassTypeByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/class-type/get-selectedClassTypeByParameterRequestFromClassRoutine?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  // }

  // getselectedcoursename(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  // }

  // getTraineeMarkListByDuration(courseDurationId){
  //   return this.http.get<any>(this.baseUrl + '/bna-exam-mark/get-traineeMarkListByDuration?courseDurationId='+courseDurationId)
  // }

  
  

  // getselectebnaexamschedule(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-exam-schedule/get-selectedBnaExamSchedules')
  // }

  
  // getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModulesByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  // }

  // getBNAExamMarks(pageNumber, pageSize,searchText) {

  //   let params = new HttpParams(); 
    
  //   params = params.append('searchText', searchText.toString());
  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString()); 
   
  //   return this.http.get<IBNAExamMarkPagination>(this.baseUrl + '/bna-exam-mark/get-bnaExamMarks', { observe: 'response', params })
  //   .pipe(
  //     map(response => {
  //       this.BNAExamMarks = [...this.BNAExamMarks, ...response.body.items];
  //       this.BNAExamMarkPagination = response.body;
  //       return this.BNAExamMarkPagination;
  //     })
  //   ); 
  // }
  

  submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/tdec-group-result/save-tdecGroupResult', model, httpOptions).pipe(
      map((TdecGroupResult: PostResponse) => {
        if (TdecGroupResult) {
          console.log(TdecGroupResult);
          return TdecGroupResult;
        }
      })
    );
  }


  find(id: number) {
    return this.http.get<TdecGroupResult>(this.baseUrl + '/bna-exam-mark/get-bnaExamMarkDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-exam-mark/update-bnaExamMark/'+id, model);
  }
  
  approve(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/bna-exam-mark/approve-bnaExamMarklist', model, httpOptions).pipe(
      map((TdecGroupResult: PostResponse) => {
        if (TdecGroupResult) {
          console.log(TdecGroupResult);
          return TdecGroupResult;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-exam-mark/delete-bnaExamMark/'+id);
  }
}
