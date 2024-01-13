import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TraineeLanguage } from '../models/TraineeLanguage';
import { ITraineeLanguagePagination,TraineeLanguagePagination } from '../models/TraineeLanguagePagination';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class TraineeLanguageService {
  baseUrl = environment.apiUrl;
  TraineeLanguages: TraineeLanguage[] = [];
  TraineeLanguagePagination = new TraineeLanguagePagination();
  constructor(private http: HttpClient) { }


  
  getselectedLanguage(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/language/get-selectedLanguage')
  }

  getTraineeLanguageByTraineeId(id: number){
    return this.http.get<TraineeLanguage[]>(this.baseUrl + '/trainee-language/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

 
  find(id: number) {
    return this.http.get<TraineeLanguage>(this.baseUrl + '/trainee-language/get-traineeLanguageDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-language/update-traineeLanguage/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/trainee-language/save-traineeLanguage', model).pipe(
      map((TraineeLanguage: PostResponse) => {
        if (TraineeLanguage) {
          console.log(TraineeLanguage);
          return TraineeLanguage;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-language/delete-traineeLanguage/'+id);
  }
}
