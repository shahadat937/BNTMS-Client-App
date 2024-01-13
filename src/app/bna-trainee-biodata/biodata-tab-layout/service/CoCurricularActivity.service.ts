import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CoCurricularActivity } from '../models/CoCurricularActivity';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class CoCurricularActivityService {
  baseUrl = environment.apiUrl;
  CoCurricularActivitys: CoCurricularActivity[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedcocurricularactivitytype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/co-curricular-activity-type/get-selectedCoCurricularActivityType')
  }

  getdatabytraineeid(id: number){
    return this.http.get<CoCurricularActivity[]>(this.baseUrl + '/co-curricular-activity/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<CoCurricularActivity>(this.baseUrl + '/co-curricular-activity/get-coCurricularActivityDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/co-curricular-activity/update-coCurricularActivity/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/co-curricular-activity/save-coCurricularActivity', model).pipe(
      map((CoCurricularActivity: PostResponse) => {
        if (CoCurricularActivity) {
          console.log(CoCurricularActivity);
          return CoCurricularActivity;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/co-curricular-activity/delete-coCurricularActivity/'+id);
  }
}
