import { Injectable } from '@angular/core';
import { IClassTypePagination, ClassTypePagination} from '../models/classtypePagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ClassType } from '../models/classtype';

@Injectable({
  providedIn: 'root'
})
export class ClassTypeService {
  baseUrl = environment.apiUrl;
  ClassType: ClassType[] = [];
  ClassTypePagination = new ClassTypePagination();
  id: number;
  constructor(private http: HttpClient) { }

  getClassType(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IClassTypePagination>(this.baseUrl + '/class-type/get-classTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ClassType = [...this.ClassType, ...response.body.items];
        this.ClassTypePagination = response.body;
        return this.ClassTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<ClassType>(this.baseUrl + '/class-type/get-classTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/class-type/update-classType/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/class-type/save-classType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/class-type/delete-classType/'+id);
  }
}
