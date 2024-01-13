import { Injectable } from '@angular/core';
import { ItraineecoursestatusPagination, traineecoursestatusPagination} from '../models/traineecoursestatusPagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { TraineeCourseStatus } from '../models/traineecoursestatus';

@Injectable({
  providedIn: 'root'
})
export class TraineeCourseStatusService {
  baseUrl = environment.apiUrl;
  TraineeCourseStatuses: TraineeCourseStatus[] = [];
  TraineeCourseStatusPagination = new traineecoursestatusPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getTraineeCourseStatuses(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<ItraineecoursestatusPagination>(this.baseUrl + '/trainee-course-status/get-traineeCourseStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeCourseStatuses = [...this.TraineeCourseStatuses, ...response.body.items];
        this.TraineeCourseStatusPagination = response.body;
        return this.TraineeCourseStatusPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<TraineeCourseStatus>(this.baseUrl + '/trainee-course-status/get-traineeCourseStatusDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-course-status/update-traineeCourseStatus/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-course-status/save-traineeCourseStatus', model).pipe(
      map((TraineeCourseStatus: PostResponse) => {
        if (TraineeCourseStatus) {
          console.log(TraineeCourseStatus);
          return TraineeCourseStatus;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-course-status/delete-traineeCourseStatus/'+id);
  }
}
