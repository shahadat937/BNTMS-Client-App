import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MilitaryTraining } from '../models/MilitaryTraining';
import { IMilitaryTrainingPagination,MilitaryTrainingPagination } from '../models/MilitaryTrainingPagination';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class MilitaryTrainingService {
  baseUrl = environment.apiUrl;
  MilitaryTrainings: MilitaryTraining[] = [];
  MilitaryTrainingPagination = new MilitaryTrainingPagination();
  constructor(private http: HttpClient) { }


  // getSelectedMilitaryTrainingType(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/social-media-type/get-selectedSocialMediaType')
  // }


  getMilitaryTrainingByTraineeId(id: number){
    return this.http.get<MilitaryTraining[]>(this.baseUrl + '/military-training/get-listByTrainee?Traineeid='+id+'').pipe(
      map(response => {
        return response;
      })
    );
  }

 
  find(id: number) {
    return this.http.get<MilitaryTraining>(this.baseUrl + '/military-training/get-MilitaryTrainingDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/military-training/update-MilitaryTraining/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/military-training/save-MilitaryTraining', model).pipe(
      map((MilitaryTraining: PostResponse) => {
        if (MilitaryTraining) {
          console.log(MilitaryTraining);
          return MilitaryTraining;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/military-training/delete-MilitaryTraining/'+id);
  }
}
