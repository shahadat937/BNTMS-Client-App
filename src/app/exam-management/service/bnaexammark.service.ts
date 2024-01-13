import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNAExamMarkPagination,BNAExamMarkPagination } from '../models/bnaexammarkPagination';
import { BNAExamMark } from '../models/bnaexammark';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { BNASubjectName } from 'src/app/subject-management/models/BNASubjectName';
import { SubjectMark } from '../../subject-management/models/SubjectMark';
import { TraineeListForExamMark } from '../models/traineeListforexammark';

@Injectable({
  providedIn: 'root'
})
export class BNAExamMarkService {
  baseUrl = environment.apiUrl;
  BNAExamMarks: BNAExamMark[] = [];
  BNAExamMarkPagination = new BNAExamMarkPagination(); 
  constructor(private http: HttpClient) { }

  // bna-exam-mark/get-exammarkListForValidation?baseSchoolNameId=20&courseDurationId=12340&courseSectionId=2052&bnaSubjectNameId=3175&markTypeId=6
 
  getExamMarkForValidation(baseSchoolNameId,courseDurationId,courseSectionId,bnaSubjectNameId,markTypeId){
    return this.http.get<number>(this.baseUrl + '/bna-exam-mark/get-exammarkListForValidation?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId+'&bnaSubjectNameId='+bnaSubjectNameId+'&markTypeId='+markTypeId);
  }

  getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId){
    return this.http.get<number>(this.baseUrl + '/course-duration/get-selectedCourseDurationIdByBaseSchoolNameAndCourseNameRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId);
  }

  GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId,courseNameId,subjectNameId){
    return this.http.get<SubjectMark[]>(this.baseUrl + '/subject-mark/get-SelectedSubjectMarkByBaseSchoolCourseNameAndBnaSubjectNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  }

  GetRoutineIdWithSchoolCourseSubject(baseSchoolNameId,courseNameId,subjectNameId){
    return this.http.get<number>(this.baseUrl + '/class-routine/get-SelectedRoutineIdWithSchoolCourseSubject?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectNameId);
  }

  GetTotalMarkAndPassMarkByBaseSchoolIdCourseIdAndSubjectId(baseSchoolNameId,courseNameId,subjectName){
    return this.http.get<BNASubjectName>(this.baseUrl + '/bna-subject-name/get-totalmarkAndPassMarkFromprocedure?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+subjectName);
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedexammarkremark(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-mark-remark/get-selectedExamMarkRemark')
  }
  getselectedmarktypes(baseSchoolNameId,courseNameId,courseDurationId,subjectNameId,courseModuleId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-selectedMarkTypeByParametersFromSubjectMark?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+subjectNameId+'&courseModuleId='+courseModuleId)
  }
  getapprovededmarktypes(baseSchoolNameId,courseNameId,courseDurationId,subjectNameId,courseModuleId,approveStatus){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/subject-mark/get-approvedMarkTypeByParametersFromSubjectMark?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+subjectNameId+'&courseModuleId='+courseModuleId+'&isApproved='+approveStatus)
  }
  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }

  getSelectedCourseDurationByschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolNameAndDuration?baseSchoolNameId='+baseSchoolNameId+'');
  }
  getselectedCourseSection(baseSchoolNameId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-section/get-selectedCourseSectionsByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }
  getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByParametersFromRoutineTable?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId);
  }
  getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameIdForReExam(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId,examStatus){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByParametersFromRoutineTableForReExam?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId+'&examStatus='+examStatus);
  }
  getSelectedSubjectNameByParametersFromAttendanceTableForExam(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId,examStatus){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNameByParametersFromAttendanceTableForExam?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId+'&examStatus='+examStatus);
  }
 
  getSchoolExamApproveList(baseSchoolNameId){
    return this.http.get<any[]>(this.baseUrl + '/bna-exam-mark/get-schoolExamApproveList?baseSchoolNameId='+baseSchoolNameId);
  }

  
  getSelectedSubjectNameListForInstructorDashBoardByBaseSchoolNameIdAndCourseNameId(traineeId,baseSchoolNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/bna-subject-name/get-subjectNameListForInstructorDashboardDropdown?traineeId='+traineeId+'&baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId);
  }

  getApprovedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-approvedSubjectNameByParametersFromRoutineTable?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  }

  getexamMarkListByParameters(baseSchoolNameId,courseNameId,courseDurationId,subjectNameId,subjectMarkId,approveStatus){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/bna-exam-mark/get-examMarkListByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+subjectNameId+'&subjectMarkId='+subjectMarkId+'&approveStatus='+approveStatus);
  }
  getexamMarkFilterListByParameters(baseSchoolNameId,courseNameId,subjectNameId,courseDurationId,subjectMarkId,approveStatus,courseSectionId,classRoutineId){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/bna-exam-mark/get-examMarkFilteredListByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&bnaSubjectNameId='+subjectNameId+'&subjectMarkId='+subjectMarkId+'&approveStatus='+approveStatus+'&courseSectionId='+courseSectionId+'&classRoutineId='+classRoutineId);
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
  getTraineeMarkListByDurationForStuffClg(courseDurationId){
    return this.http.get<any>(this.baseUrl + '/bna-exam-mark/get-traineeMarkListByDurationForStuffClg?courseDurationId='+courseDurationId)
  }
  getTraineeMarkListByDurationForQexam(courseDurationId){
    return this.http.get<any>(this.baseUrl + '/bna-exam-mark/get-traineeMarkListByDurationForQexam?courseDurationId='+courseDurationId)
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
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-exam-mark/delete-bnaExamMark/'+id);
  }
}
