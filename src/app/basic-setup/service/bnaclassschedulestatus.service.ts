import { Injectable } from '@angular/core';
import { IBNAClassScheduleStatusPagination, BNAClassScheduleStatusPagination} from '../models/bnaclassschedulestatusPagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { BNAClassScheduleStatus } from '../models/bnaclassschedulestatus';

@Injectable({
  providedIn: 'root'
})
export class BNAClassScheduleStatusService {
  baseUrl = environment.apiUrl;
  BNAClassScheduleStatus: BNAClassScheduleStatus[] = [];
  BNAClassScheduleStatusPagination = new BNAClassScheduleStatusPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getBNAClassScheduleStatus(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IBNAClassScheduleStatusPagination>(this.baseUrl + '/bna-class-schedule-status/get-bnaClassScheduleStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAClassScheduleStatus = [...this.BNAClassScheduleStatus, ...response.body.items];
        this.BNAClassScheduleStatusPagination = response.body;
        return this.BNAClassScheduleStatusPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<BNAClassScheduleStatus>(this.baseUrl + '/bna-class-schedule-status/get-bnaClassScheduleStatusDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-class-schedule-status/update-bnaClassScheduleStatus/'+id, model);
  }
  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/bna-class-schedule-status/save-bnaClassScheduleStatus', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-class-schedule-status/delete-bnaClassScheduleStatus/'+id);
  }
}
