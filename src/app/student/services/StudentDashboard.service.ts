import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpstudentInfoByTraineeId } from '../models/SpstudentInfoByTraineeId';

import { map } from 'rxjs';
import { CourseModule } from 'src/app/basic-setup/models/CourseModule';
import { ClassRoutine } from 'src/app/routine-management/models/classroutine';
import { ReadingMaterial } from 'src/app/reading-materials/models/readingmaterial';
import { Attendance } from 'src/app/attendance-management/models/attendance';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { BNASubjectName } from 'src/app/central-exam/models/BNASubjectName';
import { IClassRoutinePagination,ClassRoutinePagination } from 'src/app/routine-management/models/classroutinePagination';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {
  baseUrl = environment.apiUrl;
  SpstudentInfoByTraineeId: SpstudentInfoByTraineeId[] = [];
  ClassRoutines: ClassRoutine[] = [];
  ClassRoutinePagination = new ClassRoutinePagination(); 
  constructor(private http: HttpClient) { }


  getSpStudentInfoByTraineeId(id:number) {

    return this.http.get<SpstudentInfoByTraineeId>(this.baseUrl + '/dashboard/get-studentInfoByTraineeId?TraineeId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getUserManualByRole(roleName) {
    return this.http.get<any>(this.baseUrl + '/user-manual/get-UserManualByRole?UserRoleName=' + roleName);
  }

  getStuffClgRoutine(pageNumber, pageSize,searchText,courseDurationId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseDurationId', courseDurationId.toString());
    // class-routine/get-classRoutinesByCourseDurationId?PageSize=5&PageNumber=1&courseDurationId=3137
    return this.http.get<IClassRoutinePagination>(this.baseUrl + '/class-routine/get-classRoutinesByCourseDurationId', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ClassRoutines = [...this.ClassRoutines, ...response.body.items];
        this.ClassRoutinePagination = response.body;
        return this.ClassRoutinePagination;
      })
    ); 
  }


  getTraineeNominationCount(traineeId,courseNameId){
    return this.http.get<any>(this.baseUrl + '/trainee-nomination/get-selectedTraineeNominationCount?traineeId='+traineeId+'&courseNameId='+courseNameId);
  }

  getSubjectListBySaylorBranch(courseNameId,saylorBranchId,saylorSubBranchId){
    return this.http.get<any>(this.baseUrl + '/bna-subject-name/get-subjectListBySaylorBranch?courseNameId='+courseNameId+'&SaylorBranchId='+saylorBranchId+'&saylorSubBranchId='+saylorSubBranchId);
  }

  

  getJcoResultBySubject(courseDurationId,bnaSubjectNameId,resultStatus){
    return this.http.get<any>(this.baseUrl + '/bna-subject-name/get-jcoResultBysubject?courseDurationId='+courseDurationId+'&bnaSubjectNameId='+bnaSubjectNameId+'&resultStatus='+resultStatus);
  }

  getSelectedCourseModulesByCourseNameId(id:number) {

    return this.http.get<CourseModule[]>(this.baseUrl + '/dashboard/get-selectedCourseModulesByCourseNameId?courseNameId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getSelectedTdecActionStatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/tdec-action-status/get-selectedTdecActionStatus')
  }

  getRoutineNotesForDashboard(current,baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/routine-note/get-routineNotesForDashboard?current='+current+'&baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  }
  
  getAssignmentListForStudent(current,schoolId,courseId,durationId){
    return this.http.get<any[]>(this.baseUrl + '/instructor-assignments/get-assignmentListForStudent?CurrentDate='+current+'&baseSchoolNameId='+schoolId+'&courseNameId='+courseId+'&courseDurationId='+durationId)
  }

  getQexamSubjectList(branchId,courseNameId){
    return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNameListByBranchId?branchId='+branchId+'&courseNameId='+courseNameId)
  }
  
  getQexamRoutineByBranch(courseDurationId, branchId){
    return this.http.get<any[]>(this.baseUrl + '/class-routine/get-qexamRoutineByBranch?courseDurationId='+courseDurationId+'&branchId='+branchId)
  }

  getStuffClgSubjectList(){
    return this.http.get<BNASubjectName[]>(this.baseUrl + '/bna-subject-name/get-bnaSubjectNameListByCourseNameId')
  }
  
  getExamRoutineForStudentDashboard(id:number) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-examRoutineInfoBySchoolId?courseDurationId='+id).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  

  getRoutineByCourseDurationId(schoolId,courseId,durationId,sectionId,status) {

    return this.http.get<ClassRoutine[]>(this.baseUrl + '/dashboard/get-routineInfoByTraineeIdForStudentDashboard?courseDurationId='+durationId+'&courseNameId='+courseId+'&baseSchoolNameId='+schoolId+'&courseSectionId='+sectionId+'&weekStatus='+status).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getTdecQuestionGroupListBySp(schoolId,courseId,durationId) {

    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-tdecQuestionGroupListBySp?BaseSchoolNameId='+schoolId+'&courseNameId='+courseId+'&courseDurationId='+durationId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }


  getReadingMaterialListByType(documentTypeId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-readingMaterialByType?documentTypeId='+documentTypeId).pipe(
      map(response => {        
        return response;
      })
    ); 
  }

  getTdecQuationGroupByParams(schoolId,courseId,durationId,subjectId) {

    return this.http.get<any[]>(this.baseUrl + '/tdec-quation-group/get-tdecQuationGroupByParams?baseSchoolNameId='+schoolId+'&courseNameId='+courseId+'&courseDurationId='+durationId+'&bnaSubjectNameId='+subjectId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getReadingMAterialInfoBySchoolAndCourse(baseSchoolNameId, courseNameId) {

    return this.http.get<ReadingMaterial[]>(this.baseUrl + '/dashboard/get-readingMAterialInfoBySchoolAndCourse?BaseSchoolNameId='+baseSchoolNameId+'&CourseNameId='+courseNameId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getTraineeMarkListByDurationAndId(courseDurationId,traineeId){
    return this.http.get<any>(this.baseUrl + '/bna-exam-mark/get-traineeMarkListByDurationandId?courseDurationId='+courseDurationId+'&traineeId='+traineeId)
  }

  getActiveBulletinList(baseSchoolNameId){
    return this.http.get<any>(this.baseUrl + '/bulletin/get-activeBulletinList?baseSchoolNameId='+baseSchoolNameId)
  }

  getIndividualBulletinListByTraineeId(baseSchoolNameId,traineeId){
    return this.http.get<any>(this.baseUrl + '/individual-bulletin/get-IndividualBulletinListByTraineeId?baseSchoolNameId='+baseSchoolNameId+'&traineeId='+traineeId)
  }

  getNoticeBySchoolId(schoolId,current) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-noticeBySchoolId?BaseSchoolNameId='+schoolId+'&CurrentDate='+current).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getNoticeForTraineeDashboard(schoolId,current, durationId, traineeId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-noticeByTraineeDashboard?baseSchoolNameId='+schoolId+'&currentDate='+current+'&courseDurationId='+durationId+'&traineeId='+traineeId).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  gettraineeAssessmentForStudentSpRequest(courseDurationId,traineeId) {
    return this.http.get<any[]>(this.baseUrl + '/dashboard/get-traineeAssessmentForStudentSpRequest?courseDurationId='+courseDurationId+'&traineeId='+traineeId).pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getCurrentRoutineByTraineeId(courseDurationId,courseSectionId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-currentRoutineForStudentDashboardSpRequest?courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId)
  }

  
  getCurrentJcoRoutine(courseDurationId,saylorBranchId,saylorSubBranchId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-jcoRoutineForStudentDashboardSpRequest?courseDurationId='+courseDurationId+'&saylorBranchId='+saylorBranchId+'&saylorSubBranchId='+saylorSubBranchId)
  }
  
  getRemittanceNotificationForStudent(traineeId,courseDurationId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-remittanceNotificationForStudent?traineeId='+traineeId+'&courseDurationId='+courseDurationId)
  }
  acceptedCourseBudget(id : number){
    return this.http.get<any>(this.baseUrl + '/course-budget-allocation/accepted-CourseBudgetAllocation/' + id);
  }

  getStudentOtherDocInfo(traineeId,courseDurationId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-studentOtherDocInfo?traineeId='+traineeId+'&courseDurationId='+courseDurationId)
  }

  getStudentOtherDocuments(traineeId,courseDurationId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-studentOtherDocuments?traineeId='+traineeId+'&courseDurationId='+courseDurationId)
  }
  getInterServiceDocuments(courseDurationId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-interServiceDocuments?courseDurationId='+courseDurationId)
  }

  getStudentGoDocument(courseDurationId){
    return this.http.get<any>(this.baseUrl + '/dashboard/get-studentGoDocument?courseDurationId='+courseDurationId)
  }

  ChangereceivedStatus(courseBudgetAllocationId,receivedStatus){
    return this.http.get(this.baseUrl + '/course-budget-allocation/change-receivedStatus?courseBudgetAllocationId='+courseBudgetAllocationId+'&receivedstatus='+receivedStatus);
  }
  
  ChangeReleventDocStatus(foreignCourseOtherDocId,fieldName,status){
    return this.http.get(this.baseUrl + '/foreign-course-other-doc/change-releventDocStatus?foreignCourseOtherDocId='+foreignCourseOtherDocId+'&fieldName='+fieldName+'&status='+status);
  }

  getAttendanceByTraineeAndCourseDuration(traineeId, courseDurationId) {

    return this.http.get<Attendance[]>(this.baseUrl + '/dashboard/get-attendanceByTraineeAndCourseDuration?traineeId='+traineeId+'&courseDurationId='+courseDurationId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getAttendanceParcentageByTraineeAndCourseDuration(traineeId, courseDurationId) {

    return this.http.get<any>(this.baseUrl + '/trainee-nomination/get-traineeAttendanceByCourseDurationIdSpRequest?traineeId='+traineeId+'&courseDurationId='+courseDurationId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getTraineeMarksheet(traineeId, courseDurationId) {

    return this.http.get<any[]>(this.baseUrl + '/bna-exam-mark/get-markSheetByTraineeAndDurationandId?courseDurationId='+courseDurationId+'&traineeId='+traineeId).pipe(
      map(response => {
        
        return response;
      })
    ); 
  }

  getTraineeListForAssessmentGroupByCourseDurationIdAndTraineeId(courseDurationId,traineeId,traineeAssissmentCreateId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-assissment-group/get-traineeListForAssessmentByCourseDurationIdAndTraineeId?courseDurationId='+courseDurationId+'&traineeId='+traineeId+'&traineeAssissmentCreateId='+traineeAssissmentCreateId);
  }

  saveTraineeAssessmentMarklist(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-assessment-mark/save-traineeAssessmentMarklist', model, httpOptions).pipe(
      map((BNAExamMark: PostResponse) => {
        if (BNAExamMark) {
          console.log(BNAExamMark);
          return BNAExamMark;
        }
      })
    );
  } 
  
}
