import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBnaAttendancePeriodPagination, BnaAttendancePeriodPagination } from '../models/BnaAttendancePeriodPagination'
import { BnaAttendancePeriod } from '../models/BnaAttendancePeriod';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BnaAttendancePeriodService {
  baseUrl = environment.apiUrl;
  BnaAttendancePeriods: BnaAttendancePeriod[] = [];
  BnaAttendancePeriodPagination = new BnaAttendancePeriodPagination();
  constructor(private http: HttpClient) { }

  getBnaAttendancePeriods(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IBnaAttendancePeriodPagination>(this.baseUrl + '/bna-attendance-period/get-bnaAttendancePeriods', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BnaAttendancePeriods = [...this.BnaAttendancePeriods, ...response.body.items];
        this.BnaAttendancePeriodPagination = response.body;
        return this.BnaAttendancePeriodPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BnaAttendancePeriod>(this.baseUrl + '/bna-attendance-period/get-bnaAttendancePeriodDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-attendance-period/update-bnaAttendancePeriod/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-attendance-period/save-bnaAttendancePeriod', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-attendance-period/delete-bnaAttendancePeriod/'+id);
  }

}
