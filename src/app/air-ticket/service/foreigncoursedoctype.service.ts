import { Injectable } from '@angular/core';
import { IForeignCourseDocTypePagination, ForeignCourseDocTypePagination} from '../models/ForeignCourseDocTypePagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ForeignCourseDocType } from '../models/ForeignCourseDocType';

@Injectable({
  providedIn: 'root'
})
export class ForeignCourseDocTypeService {
  baseUrl = environment.apiUrl;
  ForeignCourseDocType: ForeignCourseDocType[] = [];
  ForeignCourseDocTypePagination = new ForeignCourseDocTypePagination();
  id: number;
  constructor(private http: HttpClient) { }

  getForeignCourseDocType(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IForeignCourseDocTypePagination>(this.baseUrl + '/foreign-course-doctype/get-foreignCourseDocTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ForeignCourseDocType = [...this.ForeignCourseDocType, ...response.body.items];
        this.ForeignCourseDocTypePagination = response.body;
        return this.ForeignCourseDocTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<ForeignCourseDocType>(this.baseUrl + '/foreign-course-doctype/get-foreignCourseDocTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/foreign-course-doctype/update-foreignCourseDocType/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/foreign-course-doctype/save-foreignCourseDocType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/foreign-course-doctype/delete-foreignCourseDocType/'+id);
  }
}
