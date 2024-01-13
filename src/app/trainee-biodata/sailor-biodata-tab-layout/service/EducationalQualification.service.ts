import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EducationalQualification } from '../models/EducationalQualification';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class EducationalQualificationService {
  baseUrl = environment.apiUrl;
  EducationalQualifications: EducationalQualification[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedexamtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-type/get-selectedExamType')
  }

  getselectedboard(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/board/get-selectedBoards')
  }

  getselectedgroup(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/group/get-selectedGroup')
  }

  getdatabytraineeid(id: number){
    return this.http.get<EducationalQualification[]>(this.baseUrl + '/educational-qualification/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<EducationalQualification>(this.baseUrl + '/educational-qualification/get-educationalQualificationDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/educational-qualification/update-educationalQualification/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/educational-qualification/save-educationalQualification', model).pipe(
      map((EducationalQualification: PostResponse) => {
        if (EducationalQualification) {       
          return EducationalQualification;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/educational-qualification/delete-educationalQualification/'+id);
  }
}
