import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RecordOfService } from '../models/RecordOfService';
import { IRecordOfServicePagination,RecordOfServicePagination } from '../models/RecordOfServicePagination';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class RecordOfServiceService {
  baseUrl = environment.apiUrl;
  RecordOfServices: RecordOfService[] = [];
  RecordOfServicePagination = new RecordOfServicePagination();
  constructor(private http: HttpClient) { }


  // getSelectedRecordOfServiceType(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/social-media-type/get-selectedSocialMediaType')
  // }


  getRecordOfServiceByTraineeId(id: number){
    return this.http.get<RecordOfService[]>(this.baseUrl + '/record-of-service/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

 
  find(id: number) {
    return this.http.get<RecordOfService>(this.baseUrl + '/record-of-service/get-RecordOfServiceDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/record-of-service/update-RecordOfService/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/record-of-service/save-RecordOfService', model).pipe(
      map((RecordOfService: PostResponse) => {
        if (RecordOfService) {
          console.log(RecordOfService);
          return RecordOfService;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/record-of-service/delete-RecordOfService/'+id);
  }
}
