import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamMarkRemarks } from '../models/exammarkremarks';
import {IExamMarkRemarksPagination, ExamMarkRemarksPagination } from '../models/exammarkremarksPagination'

@Injectable({
  providedIn: 'root'
})
export class ExamMarkRemarksService {

  baseUrl = environment.apiUrl;
  countries: ExamMarkRemarks[] = [];
  ExamMarkRemarksPagination = new ExamMarkRemarksPagination();
  constructor(private http: HttpClient) { }

  getCountries(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IExamMarkRemarksPagination>(this.baseUrl + '/exam-mark-remark/get-examMarkRemarks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.countries = [...this.countries, ...response.body.items];
        this.ExamMarkRemarksPagination = response.body;
        return this.ExamMarkRemarksPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<ExamMarkRemarks>(this.baseUrl + '/exam-mark-remark/get-examMarkRemarkDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/exam-mark-remark/update-examMarkRemark/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/exam-mark-remark/save-examMarkRemark', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/exam-mark-remark/delete-examMarkRemark/'+id);
  }
}
