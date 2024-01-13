import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IJoiningReasonPagination,JoiningReasonPagination } from '../models/JoiningReasonPagination';
import { JoiningReason } from '../models/JoiningReason';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class JoiningReasonService {
  baseUrl = environment.apiUrl;
  JoiningReasons: JoiningReason[] = [];
  JoiningReasonPagination = new JoiningReasonPagination();
  constructor(private http: HttpClient) { }


  getSelectedReasonType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/reason-type/get-selectedReasonTypes')
  }

  

  //For load single data by trainee
  // getJoiningReasonByTraineeId(id: number){
  //   return this.http.get<JoiningReason[]>(this.baseUrl + '/JoiningReason/getsingledatabytraineeid?Traineeid=' + id).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //For load multiple data by trainee
  getJoiningReasonByTraineeId(id: number){
    return this.http.get<JoiningReason[]>(this.baseUrl + '/joining-reason/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        return response;
      })
    );
  }
 
  find(id: number) {
    return this.http.get<JoiningReason>(this.baseUrl + '/joining-reason/get-joiningReasonDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/joining-reason/update-joiningReason/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/joining-reason/save-joiningReason', model).pipe(
      map((JoiningReason: PostResponse) => {
        if (JoiningReason) {
          console.log(JoiningReason);
          return JoiningReason;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/joining-reason/delete-joiningReason/'+id);
  }
}
