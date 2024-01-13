import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IClassRoutinePagination,ClassRoutinePagination } from '../models/classroutinePagination';
import { ClassRoutine } from '../models/classroutine';
import { RoutineNote } from '../models/routinenote';
import { IRoutineNotePagination,RoutineNotePagination } from '../models/routinenotePagination';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { BNASubjectName } from 'src/app/subject-management/models/BNASubjectName';

@Injectable({
  providedIn: 'root'
})
export class RoutineNoteService {
  baseUrl = environment.apiUrl;
  ClassRoutines: ClassRoutine[] = [];
  ClassRoutinePagination = new ClassRoutinePagination(); 
  RoutineNotes: RoutineNote[] = [];
  RoutineNotePagination = new RoutineNotePagination(); 
  constructor(private http: HttpClient) { }

  getCourseInstructorByBaseSchoolNameAndCourseName(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/course-instructor/get-instructorByBaseSchoolAndCourseNameSpRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
}

  getClassRoutineCountByParameterRequest(baseSchoolNameId,courseNameId,bnaSubjectNameId,courseDurationId){
      return this.http.get<number>(this.baseUrl + '/class-routine/get-classRoutineCountByParemeterRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId+'&courseDurationId='+courseDurationId)
  }
  //class-routine/get-classRoutineByCourseNameBaseSchoolNameCourseModuleAndDateRequest?baseSchoolNameId=20&courseNameId=1065&courseModuleId=14&date=2%2F12%2F2022

  getClassRoutineByCourseNameBaseSchoolNameSpRequest(baseSchoolNameId,courseNameId,courseWeekId){
    return this.http.get<ClassRoutine[]>(this.baseUrl + '/class-routine/get-classRoutineByCourseNameBaseSchoolNameSpRequest?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseWeekId='+courseWeekId);
  }

  getSubjectlistBySchoolAndCourse(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/bna-subject-name/get-subjectlistBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId);
  }

  getSelectedRoutineId(baseSchoolNameId,courseNameId,classPeriodId){
    return this.http.get<number>(this.baseUrl + '/class-routine/get-SelectedRoutineId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&classPeriodId='+classPeriodId);
}
getSelectedRoutineIdFilter(baseSchoolNameId,courseNameId,classPeriodId,courseDurationId,date){
  return this.http.get<number>(this.baseUrl + '/class-routine/get-SelectedRoutineIdFilter?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&classPeriodId='+classPeriodId+'&courseDurationId='+courseDurationId+'&date='+date);
}
// class-routine/get-SelectedRoutineIdFilter?baseSchoolNameId=20&courseNameId=1065&classPeriodId=32&courseDurationId=3089&date=2022-04-21
  getSubjectNameFromRoutine(baseSchoolNameId,courseNameId,date,classPeriodId,courseDurationId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/class-routine/get-subjectNameFromRoutine?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&date='+date+'&classPeriodId='+classPeriodId+'&courseDurationId='+courseDurationId);
}
  getTotalPeriodByParameterRequest(baseSchoolNameId,courseNameId,bnaSubjectNameId){
    return this.http.get<string>(this.baseUrl + '/bna-subject-name/get-bnaSubjectPeriodfromprocedure?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }

  getCourseModuleIdForRoutine(baseSchoolNameId,courseNameId,bnaSubjectNameId){
    return this.http.get<any>(this.baseUrl + '/bna-subject-name/get-moduleForRoutine?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }


  getSelectedRoutineByParameters(baseSchoolNameId,courseNameId,bnaSubjectNameId){
    return this.http.get<ClassRoutine[]>(this.baseUrl + '/class-routine/get-classRoutineByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&bnaSubjectNameId='+bnaSubjectNameId)
  }
  classRoutineBySchoolCourseDuration(baseSchoolNameId,courseNameId,courseDurationId){
    return this.http.get<ClassRoutine[]>(this.baseUrl + '/class-routine/get-classRoutineBySchoolCourseDuration?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId)
  }
  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedbaseschoolsByBase(baseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchoolNames?thirdLevel='+baseNameId)
  }
  getselectedclasstype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/class-type/get-selectedClassTypes')
  }

  getselectedClassPeriodbyschoolandcourse(baseSchoolNameId:number,courseNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/class-period/get-selectedClassPeriodBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }

  getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId:number,courseNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModulesByBaseSchoolNameIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
   }

  // getCourseTitleByBaseSchoolId(id:number){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseTitleByBaseSchool?baseSchoolNameId=' + id);
  // }


  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }
 
  getselectedbnasubjectname(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  }

  getSelectedCourseWeeks(baseSchoolNameId,courseDurationId,courseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-week/get-selectedCourseWeeks?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&courseNameId='+courseNameId)
  }
  
  getRoutineListForRoutineNote(baseSchoolNameId,courseNameId,courseDurationId,courseWeekId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/class-routine/get-routineListForRoutineNote?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseDurationId='+courseDurationId+'&courseWeekId='+courseWeekId)
  }
  
  
  getQexamRoutine(courseDurationId){
    return this.http.get<any[]>(this.baseUrl + '/class-routine/get-qexamRoutine?courseDurationId='+courseDurationId)
  }

  getClassRoutineListByParams(baseSchoolNameId,courseDurationId,courseNameId,courseWeekId){
    return this.http.get<ClassRoutine[]>(this.baseUrl + '/class-routine/get-classRoutineLisByParams?baseSchoolNameId='+baseSchoolNameId+'&courseDurationId='+courseDurationId+'&courseNameId='+courseNameId+'&courseWeekId='+courseWeekId)
  }
  
  getCentralExamRoutineListByParams(courseDurationId){
    return this.http.get<ClassRoutine[]>(this.baseUrl + '/class-routine/get-centralExamRoutineLisByParams?courseDurationId='+courseDurationId)
  }

  getselectedbnasubjectnamebyparameters(baseSchoolNameId:number,courseNameId:number, courseModuleId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNamesByParameters?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&courseModuleId='+courseModuleId)
  }

  getselectedSubjectNamesBySchoolAndCourse(baseSchoolNameId:number,courseNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedSubjectNamesBySchoolAndCourse?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId)
  }
  getdataForPrintWeeklyRoutine(courseWeekId){
    return this.http.get<any>(this.baseUrl + '/course-week/get-dataForPrintWeeklyRoutine?courseWeekId='+courseWeekId)
  }

  getselectedCourseModules(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModules')
  }

  // getselectedCourseModuleByBaseSchoolNameId(id:number){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-module/get-selectedCourseModuleByBaseSchoolNameId?baseSchoolNameId=' + id)
  // }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getRoutineNotes(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IRoutineNotePagination>(this.baseUrl + '/routine-note/get-routineNotes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.RoutineNotes = [...this.RoutineNotes, ...response.body.items];
        this.RoutineNotePagination = response.body;
        return this.RoutineNotePagination;
      })
    ); 
  }


  getRoutineNotesByBaseSchoolNameId(pageNumber, pageSize,searchText,baseSchoolNameId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('baseSchoolNameId', baseSchoolNameId.toString());
    // class-routine/get-classRoutinesByCourseDurationId?PageSize=5&PageNumber=1&courseDurationId=3137
    return this.http.get<IRoutineNotePagination>(this.baseUrl + '/routine-note/get-routineNotesByBaseSchoolNameId', { observe: 'response', params })
    .pipe(
      map(response => {
        this.RoutineNotes = [...this.RoutineNotes, ...response.body.items];
        this.RoutineNotePagination = response.body;
        return this.RoutineNotePagination;
      })
    ); 
  }

  weeklyRoutineUpdate(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/class-routine/update-weeklyClassRoutine', model, httpOptions).pipe(
      map((classRoutine: PostResponse) => {
        if (classRoutine) {
          console.log(classRoutine);
          return classRoutine;
        }
      })
    );
  } 
  
  find(id: number) {
    return this.http.get<RoutineNote>(this.baseUrl + '/routine-note/get-routineNoteDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/routine-note/update-routineNote/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/routine-note/save-routineNote', model).pipe(
      map((ClassRoutine: PostResponse) => {
        if (ClassRoutine) {
          console.log(ClassRoutine);
          return ClassRoutine;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/routine-note/delete-routineNote/'+id);
  }
}
