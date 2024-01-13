import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNAAttendanceRemarksPagination,BNAAttendanceRemarksPagination } from '../models/BNAAttendanceRemarksPagination';
import { BNAAttendanceRemarks } from '../models/BNAAttendanceRemarks';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BNAAttendanceRemarksService {
  baseUrl = environment.apiUrl;
  BNAAttendanceRemarks: BNAAttendanceRemarks[] = [];
  BNAAttendanceRemarksPagination = new BNAAttendanceRemarksPagination();
  constructor(private http: HttpClient) { }

  getBNAAttendanceRemarkses(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IBNAAttendanceRemarksPagination>(this.baseUrl + '/bna-attendance-remark/get-bnaAttendanceRemarks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAAttendanceRemarks = [...this.BNAAttendanceRemarks, ...response.body.items];
        this.BNAAttendanceRemarksPagination = response.body;
        return this.BNAAttendanceRemarksPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<BNAAttendanceRemarks>(this.baseUrl + '/bna-attendance-remark/get-bnaAttendanceRemarkDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-attendance-remark/update-bnaAttendanceRemark/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-attendance-remark/save-bnaAttendanceRemark', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-attendance-remark/delete-bnaAttendanceRemark/'+id);
  }
}
