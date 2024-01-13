import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IEventPagination,EventPagination } from '../models/eventPagination';
import { Event } from '../models/event';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl;
  events: Event[] = [];
  eventPagination = new EventPagination(); 
  constructor(private http: HttpClient) { }

  getCourseByBaseSchoolNameId(baseSchoolNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByBaseNameId?baseSchoolNameId='+baseSchoolNameId)
  }
  
  stopevents(eventId){
    return this.http.get<Event[]>(this.baseUrl + '/event/stop-events/'+eventId)
  }

  // runningevents(eventId){
  //   return this.http.get<event[]>(this.baseUrl + '/event/stop-events/'+eventId)
  // }

  geteventBySchool(baseSchoolNameId){
    return this.http.get<Event[]>(this.baseUrl + '/event/get-selectedClassEventBySchool?baseSchoolNameId='+baseSchoolNameId)
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
 

  getevents(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IEventPagination>(this.baseUrl + '/event/get-events', { observe: 'response', params })
    .pipe(
      map(response => {
        this.events = [...this.events, ...response.body.items];
        this.eventPagination = response.body;
        return this.eventPagination;
      })
    ); 
  }

  find(id: number) {
    return this.http.get<Event>(this.baseUrl + '/event/get-eventDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/event/update-event/'+id, model);
  }
  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/event/save-event', model).pipe(
      map((BnaClassTest: PostResponse) => {
        if (BnaClassTest) {
          console.log(BnaClassTest);
          return BnaClassTest;
        }
      })
    );
  
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/event/delete-event/'+id);
  }


  ChangeEventStatus(eventId,status){
    return this.http.get(this.baseUrl + '/event/change-eventStatus?eventId='+eventId+'&status='+status);
  }
}
