import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TraineeMembership } from '../models/TraineeMembership';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class TraineeMembershipService {
  baseUrl = environment.apiUrl;
  TraineeMemberships: TraineeMembership[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedmembershiptype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/membership-type/get-selectedMembershipType')
  }


  getdatabytraineeid(id: number){
    return this.http.get<TraineeMembership[]>(this.baseUrl + '/trainee-membership/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.TraineeMemberships = [...this.TraineeMemberships, ...response.body.items];        
        //response = this.TraineeMemberships;
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<TraineeMembership>(this.baseUrl + '/trainee-membership/get-traineeMembershipDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-membership/update-traineeMembership/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/trainee-membership/save-traineeMembership', model).pipe(
      map((TraineeMembership: PostResponse) => {
        if (TraineeMembership) {
          console.log(TraineeMembership);
          return TraineeMembership;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-membership/delete-traineeMembership/'+id);
  }
}
