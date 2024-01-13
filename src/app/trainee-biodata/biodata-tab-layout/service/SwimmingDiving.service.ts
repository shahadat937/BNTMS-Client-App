import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISwimmingDivingPagination,SwimmingDivingPagination } from '../models/SwimmingDivingPagination';
import { SwimmingDiving } from '../models/SwimmingDiving';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class SwimmingDivingService {
  baseUrl = environment.apiUrl;
  SwimmingDivings: SwimmingDiving[] = [];
  SwimmingDivingPagination = new SwimmingDivingPagination();
  constructor(private http: HttpClient) { }


  // getselectedthana(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/Thana/getselectedthana')
  // }

  getdatabytraineeid(id: number){
    return this.http.get<SwimmingDiving[]>(this.baseUrl + '/swimming-driving/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }



  find(id: number) {
    return this.http.get<SwimmingDiving>(this.baseUrl + '/swimming-driving/get-SwimmingDrivingDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/swimming-driving/update-SwimmingDriving/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/swimming-driving/save-SwimmingDriving', model).pipe(
      map((SwimmingDiving: PostResponse) => {
        if (SwimmingDiving) {
          console.log(SwimmingDiving);
          return SwimmingDiving;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/swimming-driving/delete-SwimmingDriving/'+id);
  }
}
