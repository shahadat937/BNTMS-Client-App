import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMarkTypePagination,MarkTypePagination } from '../models/MarkTypePagination';
import { MarkType } from '../models/MarkType';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkTypeService {
  baseUrl = environment.apiUrl;
  MarkType: MarkType[] = [];
  MarkTypePagination = new MarkTypePagination();
  constructor(private http: HttpClient) { }

  getMarkType(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IMarkTypePagination>(this.baseUrl + '/mark-type/get-marktypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.MarkType = [...this.MarkType, ...response.body.items];
        this.MarkTypePagination = response.body;
        return this.MarkTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<MarkType>(this.baseUrl + '/mark-type/get-marktypedetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/mark-type/update-marktype/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/mark-type/save-marktype', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/mark-type/delete-marktype/'+id);
  }
}
