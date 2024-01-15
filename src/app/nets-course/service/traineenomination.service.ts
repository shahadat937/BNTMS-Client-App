import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITraineeNominationPagination,TraineeNominationPagination } from '../models/traineenominationPagination';
import { TraineeNomination } from '../models/traineenomination';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { TraineeList} from '../../attendance-management/models/traineeList'
import { TraineeListForExamMark } from 'src/app/exam-management/models/traineeListforexammark';
import { TraineeListNewEntryEvaluation } from 'src/app/trainee-biodata/models/traineeList';
import { TraineeListForForeignCourseOtherDoc } from 'src/app/air-ticket/models/traineeListforforeigncourseotherdoc';

@Injectable({
  providedIn: 'root'
})
export class TraineeNominationService {
  baseUrl = environment.apiUrl;
  TraineeNominations: TraineeNomination[] = [];
  TraineeNominationPagination = new TraineeNominationPagination(); 
  constructor(private http: HttpClient) { }

  //autocomplete
    //trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo=345&courseDurationId=3026&courseNameId=1023&traineeId=1032
  getSelectedTraineeByparameterRequest(pno,courseDurationId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo='+pno+'&courseDurationId='+courseDurationId+'&courseNameId='+courseNameId)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }

  getSelectedWithdrawnType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Withdrawn-type/get-selectedWithdrawnTypes');
  }
  // getSelectedTraineeByPno(pno){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo='+pno+'&courseDurationId='+courseDurationId+'&courseNameId='+courseNameId)
  //     .pipe(
  //       map((response:[]) => response.map(item => item))
  //     )
  // }
  getSelectedTraineeByPno(pno){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompleteTraineeByPno?pNo='+pno)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }


  getTraineeNominationByCourseDurationId(courseDurationId,courseSectionId){
    return this.http.get<TraineeList[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsForAttendanceByCourseDurationId?courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId);
  }

  getTestTraineeNominationByCourseDurationId(courseDurationId,courseSectionId){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsForAttendanceByCourseDurationId?courseDurationId='+courseDurationId+'&courseSectionId='+courseSectionId);
  }

  getTraineeAttendanceListByCourseDurationId(courseDurationId,courseSectionId,attendanceStatus,baseSchoolNameId,courseNameId,subjectNameId,classRoutineId){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/trainee-nomination/get-traineeattendanceListByCourseDurationIdspRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&subjectNameId='+subjectNameId+'&courseSectionId='+courseSectionId+'&classRoutineId='+classRoutineId+'&attendanceStatus='+attendanceStatus);
  }
  getTraineeNominationListByCourseDurationIdForNbcd(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationListByCourseDurationIdForNbcdspRequest?courseDurationId='+courseDurationId)
  }
  getSelectedTraineeByPnoAutoComplete(pno){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-autocompletePnoForNbcdNomination?pno='+pno)
      .pipe(
        map((response:[]) => response.map(item => item))
      )
  }
  getTraineeListForAssignmentsByCourseDurationId(courseDurationId,courseSectionId,courseNameId){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/trainee-nomination/get-traineeListForAssignmentsSpRequest?courseDurationId='+courseDurationId+'&courseNameId='+courseNameId+'&courseSectionId='+courseSectionId);
  }

  getTraineeAttendanceListForReExam(courseDurationId,courseSectionId,attendanceStatus,baseSchoolNameId,courseNameId,subjectNameId,classRoutineId){
    return this.http.get<TraineeListForExamMark[]>(this.baseUrl + '/trainee-nomination/get-traineeattendanceListForReExamSpRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&subjectNameId='+subjectNameId+'&courseSectionId='+courseSectionId+'&classRoutineId='+classRoutineId+'&attendanceStatus='+attendanceStatus);
  }

  getNewTraineeNominationByCourseDurationId(courseDurationId:number){
    return this.http.get<TraineeListNewEntryEvaluation[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsForAttendanceByCourseDurationId?courseDurationId='+courseDurationId);
  }
  getTraineeNominationsListForAssessmentGroupByCourseDurationIdAndTraineeId(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsListForAssessmentByCourseDurationIdAndTraineeId?courseDurationId='+courseDurationId);
  }
  getNewTraineeNominationsForJcoExamByBranch(courseDurationId,saylorBranchId,saylorSubBranchId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsForJcoExamByBranch?courseDurationId='+courseDurationId+'&saylorBranchId='+saylorBranchId+'&saylorSubBranchId='+saylorSubBranchId);
  }
  getForeignTrainingOtherDocTraineeNominationByCourseDurationId(courseDurationId:number){
    return this.http.get<TraineeListForForeignCourseOtherDoc[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationsForForeignCourseOtherDocByCourseDurationId?courseDurationId='+courseDurationId);
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getSelectedTrainee(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-selectedTraineeByPno')
  }

  getselectedcourseduration(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurations')
  }

  getselectedTraineeCourseStatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-course-status/get-selectedTraineeCourseStatuses')
  }

  getselectedWithdrawnDoc(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/withdrawn-docs/get-selectedWithDrawnDocs')
  }

  gettraineeNominationListByCourseDurationId(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationListByCourseDurationIdspRequest?courseDurationId='+courseDurationId)
  }

  gettraineeNominationListByTypeCourseDurationId(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/trainee-nomination/get-traineeNominationListByTypeCourseDurationIdspRequest?courseDurationId='+courseDurationId)
  }
 
  getTraineeNominationsByCourseDurationId(pageNumber, pageSize,searchText,courseDurationId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('courseDurationId', courseDurationId.toString());
    
    return this.http.get<ITraineeNominationPagination>(this.baseUrl + '/trainee-nomination/get-traineeNominationsByCourseDurationId', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeNominations = [...this.TraineeNominations, ...response.body.items];
        this.TraineeNominationPagination = response.body;
        return this.TraineeNominationPagination;
      })
    ); 
  }


  getTraineeNominations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<ITraineeNominationPagination>(this.baseUrl + '/trainee-nomination/get-traineeNominations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeNominations = [...this.TraineeNominations, ...response.body.items];
        this.TraineeNominationPagination = response.body;
        return this.TraineeNominationPagination;
      })
    ); 
  }
  findByCourseDuration(courseDurationId: number){
    return this.http.get<TraineeNomination>(this.baseUrl + '/trainee-nomination/get-traineeNominationDetailByCourseDurationId?courseDurationId=' + courseDurationId);
  }

  find(id: any) {
    return this.http.get<TraineeNomination>(this.baseUrl + '/trainee-nomination/get-traineeNominationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-nomination/update-traineeNomination/'+id, model);
  }
  updateTraineeNomination(id: number,model: any){
    return this.http.put(this.baseUrl + '/trainee-nomination/update-traineereligation/'+id, model);
  }
  updateTraineeNominationList(model:any){
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-nomination/update-traineeNominationList', model).pipe(
      map((TraineeNomination: PostResponse) => {
        if (TraineeNomination) {
          console.log(TraineeNomination);
          return TraineeNomination;
        } 
      })
    );
  }
  updateTraineeNominationListForReligation(model:any){
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-nomination/update-traineeNominationList-Forreligation', model).pipe(
      map((TraineeNomination: PostResponse) => {
        if (TraineeNomination) {
          console.log(TraineeNomination);
          return TraineeNomination;
        }
      })
    );
  }

  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-nomination/save-traineeNomination', model).pipe(
      map((TraineeNomination: PostResponse) => {
        if (TraineeNomination) {
          console.log(TraineeNomination);
          return TraineeNomination;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-nomination/delete-traineeNomination/'+id);
  }
}
