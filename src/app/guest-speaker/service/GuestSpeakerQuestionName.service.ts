import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGuestSpeakerQuestionNamePagination,GuestSpeakerQuestionNamePagination } from '../models/GuestSpeakerQuestionNamePagination';
import { GuestSpeakerQuestionName } from '../models/GuestSpeakerQuestionName';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class GuestSpeakerQuestionNameService {
  baseUrl = environment.apiUrl;
  GuestSpeakerQuestionNames: GuestSpeakerQuestionName[] = [];
  GuestSpeakerQuestionNamePagination = new GuestSpeakerQuestionNamePagination(); 
  constructor(private http: HttpClient) { }

 
 

  // tdec-question-name/get-tdecQuestionNameFilteredList?PageSize=5&PageNumber=1&baseSchoolNameId=20

  getGuestSpeakerQuestionNameFiltered(pageNumber, pageSize,searchText,baseschoolNameId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('baseschoolNameId', baseschoolNameId.toString());
   
    return this.http.get<IGuestSpeakerQuestionNamePagination>(this.baseUrl + '/guest-speaker-question-name/get-guestSpeakerList', { observe: 'response', params })
    .pipe(
      map(response => {
        this.GuestSpeakerQuestionNames = [...this.GuestSpeakerQuestionNames, ...response.body.items];
        this.GuestSpeakerQuestionNamePagination = response.body;
        return this.GuestSpeakerQuestionNamePagination;
      })
    ); 
  }

  // getGuestSpeakerQuestionNames(pageNumber, pageSize,searchText) {

  //   let params = new HttpParams(); 
    
  //   params = params.append('searchText', searchText.toString());
  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());
   
  //   return this.http.get<IGuestSpeakerQuestionNamePagination>(this.baseUrl + '/guest-speaker-question-name/get-GuestSpeakerQuestionNames', { observe: 'response', params })
  //   .pipe(
  //     map(response => {
  //       this.GuestSpeakerQuestionNames = [...this.GuestSpeakerQuestionNames, ...response.body.items];
  //       this.GuestSpeakerQuestionNamePagination = response.body;
  //       return this.GuestSpeakerQuestionNamePagination;
  //     })
  //   ); 
  // }
  
  find(id: number) {
    return this.http.get<GuestSpeakerQuestionName>(this.baseUrl + '/guest-speaker-question-name/get-GuestSpeakerQuestionNameDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/guest-speaker-question-name/update-GuestSpeakerQuestionName/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/guest-speaker-question-name/save-GuestSpeakerQuestionName', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/guest-speaker-question-name/delete-GuestSpeakerQuestionName/'+id);
  }
}
