import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionType } from '../models/questionType';
import {IQuestionTypePagination, QuestionTypePagination } from '../models/questionTypePagination'

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {

  baseUrl = environment.apiUrl;
  questionTypes: QuestionType[] = [];
  questionTypePagination = new QuestionTypePagination();
  constructor(private http: HttpClient) { }

  getQuestionTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IQuestionTypePagination>(this.baseUrl + '/question-type/get-questionTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.questionTypes = [...this.questionTypes, ...response.body.items];
        this.questionTypePagination = response.body;
        return this.questionTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<QuestionType>(this.baseUrl + '/question-type/get-questionTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/question-type/update-questionType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/question-type/save-questionType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/question-type/delete-questionType/'+id);
  }
}
