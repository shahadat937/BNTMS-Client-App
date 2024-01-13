import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IEmploymentBeforeJoinBNAPagination,EmploymentBeforeJoinBNAPagination } from '../models/EmploymentBeforeJoinBNAPagination';
import { EmploymentBeforeJoinBNA } from '../models/EmploymentBeforeJoinBNA';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class EmploymentBeforeJoinBNAService {
  baseUrl = environment.apiUrl;
  EmploymentBeforeJoinBNAs: EmploymentBeforeJoinBNA[] = [];
  EmploymentBeforeJoinBNAPagination = new EmploymentBeforeJoinBNAPagination();
  constructor(private http: HttpClient) { }

  getdatabytraineeid(id: number){
    return this.http.get<EmploymentBeforeJoinBNA[]>(this.baseUrl + '/employment-before-join-bna/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }



  find(id: number) {
    return this.http.get<EmploymentBeforeJoinBNA>(this.baseUrl + '/employment-before-join-bna/get-employmentBeforeJoinBnaDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/employment-before-join-bna/update-employmentBeforeJoinBna/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/employment-before-join-bna/save-employmentBeforeJoinBna', model).pipe(
      map((EmploymentBeforeJoinBNA: PostResponse) => {
        if (EmploymentBeforeJoinBNA) {
          console.log(EmploymentBeforeJoinBNA);
          return EmploymentBeforeJoinBNA;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/employment-before-join-bna/delete-employmentBeforeJoinBna/'+id);
  }
}
