import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGuestSpeakerActionStatusPagination,GuestSpeakerActionStatusPagination } from '../models/GuestSpeakerActionStatusPagination';
import { GuestSpeakerActionStatus } from '../models/GuestSpeakerActionStatus';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class GuestSpeakerActionStatusService {
  baseUrl = environment.apiUrl;
  GuestSpeakerActionStatuses: GuestSpeakerActionStatus[] = [];
  GuestSpeakerActionStatusPagination = new GuestSpeakerActionStatusPagination(); 
  constructor(private http: HttpClient) { }

 
  // getGuestSpeakerActionStatusesByCourseType(pageNumber, pageSize,searchText,courseTypeId:number) {

  //   let params = new HttpParams(); 
    
  //   params = params.append('searchText', searchText.toString());
  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());
  //   params = params.append('courseTypeId', courseTypeId.toString());
   
  //   return this.http.get<IGuestSpeakerActionStatusPagination>(this.baseUrl + '/course-duration/get-courseDurationByCourseType', { observe: 'response', params })
  //   .pipe(
  //     map(response => {
  //       this.GuestSpeakerActionStatuses = [...this.GuestSpeakerActionStatuses, ...response.body.items];
  //       this.GuestSpeakerActionStatusPagination = response.body;
  //       return this.GuestSpeakerActionStatusPagination;
  //     })
  //   ); 
  // }


  getGuestSpeakerActionStatuses(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IGuestSpeakerActionStatusPagination>(this.baseUrl + '/guest-speaker-action-atatus/get-GuestSpeakerActionStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.GuestSpeakerActionStatuses = [...this.GuestSpeakerActionStatuses, ...response.body.items];
        this.GuestSpeakerActionStatusPagination = response.body;
        return this.GuestSpeakerActionStatusPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<GuestSpeakerActionStatus>(this.baseUrl + '/guest-speaker-action-atatus/get-GuestSpeakerActionStatusDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/guest-speaker-action-atatus/update-GuestSpeakerActionStatus/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/guest-speaker-action-atatus/save-GuestSpeakerActionStatus', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/guest-speaker-action-atatus/delete-GuestSpeakerActionStatus/'+id);
  }
}
