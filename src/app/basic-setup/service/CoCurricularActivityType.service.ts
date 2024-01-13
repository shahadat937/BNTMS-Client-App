import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ICoCurricularActivityTypePagination,CoCurricularActivityTypePagination } from '../models/CoCurricularActivityTypePagination'
import { CoCurricularActivityType } from '../models/CoCurricularActivityType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoCurricularActivityTypeService {
  baseUrl = environment.apiUrl;
  CoCurricularActivityTypes: CoCurricularActivityType[] = [];
  CoCurricularActivityTypePagination = new CoCurricularActivityTypePagination();
  constructor(private http: HttpClient) { }

  getCoCurricularActivityTypes(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<ICoCurricularActivityTypePagination>(this.baseUrl + '/co-curricular-activity-type/get-coCurricularActivityTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CoCurricularActivityTypes = [...this.CoCurricularActivityTypes, ...response.body.items];
        this.CoCurricularActivityTypePagination = response.body;
        return this.CoCurricularActivityTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<CoCurricularActivityType>(this.baseUrl + '/co-curricular-activity-type/get-coCurricularActivityTypeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/co-curricular-activity-type/update-coCurricularActivityType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/co-curricular-activity-type/save-coCurricularActivityType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/co-curricular-activity-type/delete-coCurricularActivityType/'+id);
  }

}
