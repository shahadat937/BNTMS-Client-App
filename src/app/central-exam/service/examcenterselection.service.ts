import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IExamCenterSelectionPagination,ExamCenterSelectionPagination } from '../models/examcenterselectionPagination';
import { ExamCenterSelection } from '../models/examcenterselection';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class ExamCenterSelectionService {
  baseUrl = environment.apiUrl;
  ExamCenterSelections: ExamCenterSelection[] = [];
  ExamCenterSelectionPagination = new ExamCenterSelectionPagination(); 
  constructor(private http: HttpClient) { }


  

  
 

  getExamCenterSelections(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IExamCenterSelectionPagination>(this.baseUrl + '/exam-center-selection/get-ExamCenterSelections', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ExamCenterSelections = [...this.ExamCenterSelections, ...response.body.items];
        this.ExamCenterSelectionPagination = response.body;
        return this.ExamCenterSelectionPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<ExamCenterSelection>(this.baseUrl + '/exam-center-selection/get-ExamCenterSelectionDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/exam-center-selection/update-ExamCenterSelection/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/exam-center-selection/save-ExamCenterSelection', model).pipe(
      map((ExamCenterSelection: PostResponse) => {
        if (ExamCenterSelection) {
          console.log(ExamCenterSelection);
          return ExamCenterSelection;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/exam-center-selection/delete-ExamCenterSelection/'+id);
  }
}
