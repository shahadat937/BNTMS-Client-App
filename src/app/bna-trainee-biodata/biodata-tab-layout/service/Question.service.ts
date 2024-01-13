import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IQuestionPagination,QuestionPagination } from '../models/QuestionPagination';
import { Question } from '../models/Question';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = environment.apiUrl;
  Questions: Question[] = [];
  QuestionPagination = new QuestionPagination();
  constructor(private http: HttpClient) { }

  
  getselectedquestiontype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/question-type/get-selectedQuestionTypes')
  }

  

  getdatabytraineeid(id: number){
    return this.http.get<Question[]>(this.baseUrl + '/question/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }



  find(id: number) {
    return this.http.get<Question>(this.baseUrl + '/question/get-questionDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/question/update-question/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/question/save-question', model).pipe(
      map((Question: PostResponse) => {
        if (Question) {
          console.log(Question);
          return Question;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/question/delete-question/'+id);
  }
}
