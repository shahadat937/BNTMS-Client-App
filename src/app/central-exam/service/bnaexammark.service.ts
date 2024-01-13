import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBNAExamMarkPagination,BNAExamMarkPagination } from '../../exam-management/models/bnaexammarkPagination'
import { BNAExamMark } from '../models/bnaexammark';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { BNASubjectName } from 'src/app/subject-management/models/BNASubjectName';
import { SubjectMark } from '../../subject-management/models/SubjectMark';
import {TraineeListForExamMark} from '../../exam-management/models/traineeListforexammark';

@Injectable({
  providedIn: 'root'
})
export class BNAExamMarkService {
  baseUrl = environment.apiUrl;
  BNAExamMarks: BNAExamMark[] = [];
  BNAExamMarkPagination = new BNAExamMarkPagination(); 
  constructor(private http: HttpClient) { }

  getSelectedCourseDurationByCourseTypeIdAndCourseNameId(courseTypeId,courseNameId){
    // course-duration/get-selectedCourseDurationByCourseTypeIdAndCourseNameId?courseTypeId=1021&courseNameId=1252
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationByCourseTypeIdAndCourseNameId?courseTypeId='+courseTypeId+'&courseNameId='+courseNameId);
  }

  getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<number>(this.baseUrl + '/course-duration/get-selectedCourseDurationIdByBaseSchoolNameAndCourseNameRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }

  GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId,courseNameId,subjectNameId){
    return this.http.get<SubjectMark[]>(this.baseUrl + '/subject-mark/get-SelectedSubjectMarkByBaseSchoolCourseNameAndBnaSubjectNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  }

  GetSubjectMarkByCourseNameIdSubjectNameId(courseNameId,subjectNameId){
    return this.http.get<SubjectMark[]>(this.baseUrl + '/subject-mark/get-selectedSubjectMarkByCourseNameIdSubjectNameId?courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  }
  getClassRoutineIdForStaffCollege(courseDurationId,courseNameId,bnaSubjectNameId){
    return this.http.get<number>(this.baseUrl + '/class-routine/get-SelectedRoutineIdForStaffCollege?courseDurationId='+courseDurationId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId);
  }
  // class-routine/get-SelectedRoutineIdForStaffCollege?courseDurationId=3149&courseNameId=1251&bnaSubjectNameId=3426
  // subject-mark/get-selectedSubjectMarkByCourseNameIdSubjectNameId?courseNameId=1251&bnaSubjectNameId=3425
  GetRoutineIdWithSchoolCourseSubject(baseSchoolNameId,courseNameId,subjectNameId){
    return this.http.get<number>(this.baseUrl + '/class-routine/get-SelectedRoutineIdWithSchoolCourseSubject?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  }
  

  GetTotalMarkAndPassMarkByBaseSchoolIdCourseIdAndSubjectId(baseSchoolNameId,courseNameId,subjectName){
    return this.http.get<BNASubjectName>(this.baseUrl + '/bna-subject-name/get-totalmarkAndPassMarkFromprocedure?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectName);
  }
  // bna-subject-name/get-totalmarkAndPassMarkByCourseNameIdAndBnaSubjectNameId?courseNameId=1251&bnaSubjectNameId=3425
  GetTotalMarkAndPassMarkByCourseNameIdAndSubjectId(courseNameId,subjectNameId){
    return this.http.get<BNASubjectName>(this.baseUrl + '/bna-subject-name/get-totalmarkAndPassMarkByCourseNameIdAndBnaSubjectNameId?courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedexammarkremark(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-mark-remark/get-selectedExamMarkRemark')
  }
  getselectedmarktypes(baseSchoolNameId,courseNameId,subjectNameId,courseModuleId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-selectedMarkTypeByParametersFromSubjectMark?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId+'&courseModuleId='+courseModuleId)
  }

  getselectedmarktypesByCourseNameIdAndSubjectNameId(courseNameId,courseDurationId,subjectNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-selectedMarkTypeByCourseNameIdAndSubjectNameId?courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+subjectNameId);
  }

  getapprovedMarkTypeByParametersForCentralExam(courseNameId,courseDurationId,subjectNameId,isApproved){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-approvedMarkTypeByParametersForCentralExam?courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+subjectNameId+'&isApproved='+isApproved);
  }

  getapprovededmarktypes(baseSchoolNameId,courseNameId,subjectNameId,courseModuleId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-approvedMarkTypeByParametersFromSubjectMark?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId+'&courseModuleId='+courseModuleId)
  }
  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }
  getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByParametersFromRoutineTable?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  }
 
  getSelectedSubjectNameListForInstructorDashBoardByBaseSchoolNameIdAndCourseNameId(traineeId,baseSchoolNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/bna-subject-name/get-subjectNameListForInstructorDashboardDropdown?traineeId='+traineeId+'&baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId);
  }

  getApprovedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-approvedSubjectNameByParametersFromRoutineTable?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  }

  getexamMarkListByParameters(baseSchoolNameId,courseNameId,subjectNameId,subjectMarkId,approveStatus){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/bna-exam-mark/get-examMarkListByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId+'&subjectMarkId='+subjectMarkId+'&approveStatus='+approveStatus);
  }
  
  getCentralexamMarkListByParameters(courseNameId,subjectNameId,subjectMarkId,approveStatus,submissionStatus){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/bna-exam-mark/get-centralExamMarkListByParameters?courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId+'&subjectMarkId='+subjectMarkId+'&approveStatus='+approveStatus+'&submissionStatus='+submissionStatus);
  }

  getSelectedClassTypeByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/class-type/get-selectedClassTypeByParameterRequestFromClassRoutine?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getTraineeMarkListByDuration(courseDurationId){
    return this.http.get<any>(this.baseUrl + '/bna-exam-mark/get-traineeMarkListByDuration?courseDurationId='+courseDurationId)
  }

  getSelectedSubjectNameByCourseNameId(courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByCourseNameId?courseNameId='+courseNameId);
  }
  
  getCentralExamApproveList(courseTypeId,courseNameId){
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-centralExamApproveList?courseNameId='+courseNameId+'&courseTypeId='+courseTypeId);
  }
  

  // getselectebnaexamschedule(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-exam-schedule/get-selectedBnaExamSchedules')
  // }

  
  // getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModulesByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  // }

  getBNAExamMarks(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IBNAExamMarkPagination>(this.baseUrl + '/bna-exam-mark/get-bnaExamMarks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAExamMarks = [...this.BNAExamMarks, ...response.body.items];
        this.BNAExamMarkPagination = response.body;
        return this.BNAExamMarkPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BNAExamMark>(this.baseUrl + '/bna-exam-mark/get-bnaExamMarkDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-exam-mark/update-bnaExamMark/'+id, model);
  }
  submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/bna-exam-mark/save-bnaExamMarklist', model, httpOptions).pipe(
      map((BNAExamMark: PostResponse) => {
        if (BNAExamMark) {
          console.log(BNAExamMark);
          return BNAExamMark;
        }
      })
    );
  }
  approve(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/bna-exam-mark/approve-bnaExamMarklist', model, httpOptions).pipe(
      map((BNAExamMark: PostResponse) => {
        if (BNAExamMark) {
          console.log(BNAExamMark);
          return BNAExamMark;
        }
      })
    );
  } 
  instructorApprove(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/bna-exam-mark/instructorApprove-bnaExamMarklist', model, httpOptions).pipe(
      map((BNAExamMark: PostResponse) => {
        if (BNAExamMark) {
          console.log(BNAExamMark);
          return BNAExamMark;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-exam-mark/delete-bnaExamMark/'+id);
  }
}
