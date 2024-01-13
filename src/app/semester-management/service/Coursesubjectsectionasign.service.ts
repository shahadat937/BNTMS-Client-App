import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITraineeNominationPagination,TraineeNominationPagination } from '../models/traineenominationPagination';
//import { TraineeNomination } from '../models/traineenomination';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { TraineeList} from '../../attendance-management/models/traineeList'
import { TraineeListForExamMark } from 'src/app/exam-management/models/traineeListforexammark';
import { TraineeListNewEntryEvaluation } from 'src/app/trainee-biodata/models/traineeList';
import { TraineeListForForeignCourseOtherDoc } from 'src/app/air-ticket/models/traineeListforforeigncourseotherdoc';
import { nomeneeSubjectSection } from '../models/nomeneeSubjectSection';

@Injectable({
  providedIn: 'root'
})
export class CoursesubjectsectionasignService {
  baseUrl = environment.apiUrl;
  NomeneeSubjectSections: nomeneeSubjectSection[] = [];

  constructor(private http: HttpClient) { }



  BnaNomeneeSubjectSectionAsignId(traineeNominationId: any) {
    console.log('hghg'+traineeNominationId)
    return this.http.get<[]>(this.baseUrl + '/course-Nomenee/get-BnaNomeneeSubjectSectionAsign?traineeNominationId='+traineeNominationId);
  }


  
  BnaNomeneeSubjectSectionAlredyAsignId(traineeNominationId: any) {
    console.log('hghg'+traineeNominationId)
    return this.http.get<[]>(this.baseUrl + '/course-Nomenee/get-BnaNomeneeSubjectSectionAlredyAsign?traineeNominationId='+traineeNominationId);
  }

  //return this.http.get<ClassRoutine[]>

  getselectedcoursedurationForBna(){
   // console.log('hghg'+this.http.get<SelectedModel[]>(this.baseUrl + '/course-section/get-selectedCourseSectionForBna'))
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-section/get-selectedCourseSectionForBna')
  }
 

  find(id  : any) {
    return  null;
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedbaseschoolsByBase(baseNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchoolNames?thirdLevel='+baseNameId)
  }

  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }

/*
  submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/course-Nomenee/save-CourseNomeneelist', model, httpOptions).pipe(
      map((TraineeNomination: PostResponse) => {
        if (TraineeNomination) {
          console.log(TraineeNomination);
          return TraineeNomination;
        }
      })
    );
  } 


  submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    return this.http.post<PostResponse>(this.baseUrl + '/attendance/save-attendancelist', model,httpOptions).pipe(
      map((Attendance: PostResponse) => {
        if (Attendance) {
          console.log(Attendance); 
          return Attendance;
        }
      })
    );
  } 

 
  submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/course-Nomenee/save-CourseNomeneelist', model, httpOptions).pipe(
      map((TraineeNomination: PostResponse) => {
        if (TraineeNomination) {
          console.log(TraineeNomination);
          return TraineeNomination;
        }
      })
    );
  }
*/


submitList(model:any){
  return this.http.post<PostResponse>(this.baseUrl + '/course-Nomenee/save-CourseNomenee', model).pipe(
    map((nomeneeSubjectSection: PostResponse) => {
      if (nomeneeSubjectSection) {
        console.log(nomeneeSubjectSection);
        return nomeneeSubjectSection;
      } 
    })
  );
}

submit(model: any) {
  console.log(model);
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
   
  return this.http.post<PostResponse>(this.baseUrl + '/course-Nomenee/save-CourseNomenee', model,httpOptions).pipe(
    map((nomeneeSubjectSection: PostResponse) => {
 
      if (nomeneeSubjectSection) {
        
        console.log(nomeneeSubjectSection);
        return nomeneeSubjectSection;
      }
    })
  );
} 


update(model: any) {
  console.log(model);
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
   
  return this.http.put<PostResponse>(this.baseUrl + '/course-Nomenee/update-CourseNomenees', model,httpOptions).pipe(
    map((nomeneeSubjectSection: PostResponse) => {
 
      if (nomeneeSubjectSection) {
        
        console.log(nomeneeSubjectSection);
        return nomeneeSubjectSection;
      }
    })
  );
} 
 /*submit(model: any) {
  console.log(model);
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  return this.http.post<PostResponse>(this.baseUrl + '/course-Nomenee/save-CourseNomenee', model,httpOptions).pipe(
    map((NomeneeSubjectSection: PostResponse) => {
      if (NomeneeSubjectSection) {
       // console.log(NomeneeSubjectSection);
        return NomeneeSubjectSection;
      }
    })
  );
} 

 submit(model: any) {
    console.log(model);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<PostResponse>(this.baseUrl + '/course-Nomenee/save-CourseNomeneelist', model, httpOptions).pipe(
      map((NomeneeSubjectSection: PostResponse) => {
        if (NomeneeSubjectSection) {
          console.log(NomeneeSubjectSection);
          return NomeneeSubjectSection;
        }
      })
    );
  }*/

}