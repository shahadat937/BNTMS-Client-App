import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Election } from '../models/Election';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  baseUrl = environment.apiUrl;
  Elections: Election[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedelected(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/elected/get-selectedElected')
  }

  getdatabytraineeid(id: number){
    return this.http.get<Election[]>(this.baseUrl + '/election/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }

 
  find(id: number) {
    return this.http.get<Election>(this.baseUrl + '/election/get-electionDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/election/update-election/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/election/save-election', model).pipe(
      map((election: PostResponse) => {
        if (election) {
          console.log(election);
          return election;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/election/delete-election/'+id);
  }
}
