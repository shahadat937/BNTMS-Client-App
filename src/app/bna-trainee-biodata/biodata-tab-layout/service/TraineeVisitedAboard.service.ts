import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TraineeVisitedAboard } from '../models/TraineeVisitedAboard';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class TraineeVisitedAboardService {
  baseUrl = environment.apiUrl;
  TraineeVisitedAboards: TraineeVisitedAboard[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedcountry(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountries')
  }

  

  getdatabytraineeid(id: number){
    return this.http.get<TraineeVisitedAboard[]>(this.baseUrl + '/trainee-visited-aboard/get-listBytrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.TraineeVisitedAboards = [...this.TraineeVisitedAboards, ...response.body.items];        
        //response = this.TraineeVisitedAboards;
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<TraineeVisitedAboard>(this.baseUrl + '/trainee-visited-aboard/get-traineeVisitedAboardDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-visited-aboard/update-traineeVisitedAboard/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/trainee-visited-aboard/save-traineeVisitedAboard', model).pipe(
      map((TraineeVisitedAboard: PostResponse) => {
        if (TraineeVisitedAboard) {
          console.log(TraineeVisitedAboard);
          return TraineeVisitedAboard;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-visited-aboard/delete-traineeVisitedAboard/'+id);
  }
}
