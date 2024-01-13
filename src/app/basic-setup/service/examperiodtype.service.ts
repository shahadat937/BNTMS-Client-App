import { Injectable } from '@angular/core';
import { IExamPeriodTypePagination, ExamPeriodTypePagination} from '../models/examperiodtypePagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ExamPeriodType } from '../models/examperiodtype';

@Injectable({
  providedIn: 'root'
})
export class ExamPeriodTypeService {
  baseUrl = environment.apiUrl;
  ExamPeriodType: ExamPeriodType[] = [];
  ExamPeriodTypePagination = new ExamPeriodTypePagination();
  id: number;
  constructor(private http: HttpClient) { }

  getExamPeriodType(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IExamPeriodTypePagination>(this.baseUrl + '/exam-period-type/get-examPeriodTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ExamPeriodType = [...this.ExamPeriodType, ...response.body.items];
        this.ExamPeriodTypePagination = response.body;
        return this.ExamPeriodTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<ExamPeriodType>(this.baseUrl + '/exam-period-type/get-examPeriodTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/exam-period-type/update-examPeriodType/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/exam-period-type/save-examPeriodType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/exam-period-type/delete-examPeriodType/'+id);
  }
}
