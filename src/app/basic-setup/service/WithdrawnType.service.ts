import { Injectable } from '@angular/core';
import { IWithdrawnTypePagination, WithdrawnTypePagination} from '../models/WithdrawnTypePagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { WithdrawnType } from '../models/WithdrawnType';

@Injectable({
  providedIn: 'root'
})
export class WithdrawnTypeService {
  baseUrl = environment.apiUrl;
  WithdrawnType: WithdrawnType[] = [];
  WithdrawnTypePagination = new WithdrawnTypePagination();
  id: number;
  constructor(private http: HttpClient) { }

  getWithdrawnTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IWithdrawnTypePagination>(this.baseUrl + '/Withdrawn-type/get-WithdrawnTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.WithdrawnType = [...this.WithdrawnType, ...response.body.items];
        this.WithdrawnTypePagination = response.body;
        return this.WithdrawnTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<WithdrawnType>(this.baseUrl + '/Withdrawn-type/get-WithdrawnTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/Withdrawn-type/update-WithdrawnType/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/Withdrawn-type/save-WithdrawnType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/Withdrawn-type/delete-WithdrawnType/'+id);
  }
}
