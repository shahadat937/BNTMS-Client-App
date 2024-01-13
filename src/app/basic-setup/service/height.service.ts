import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IHeightPagination,HeightPagination } from '../models/heightPagination';
import { PostResponse } from '../../core/models/PostResponse';
import { Height } from '../models/height';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeightService {
  baseUrl = environment.apiUrl;
  heights: Height[] = [];
  heightPagination = new HeightPagination();
  constructor(private http: HttpClient) { }

  getHeights(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IHeightPagination>(this.baseUrl + '/height/get-heights', { observe: 'response', params })
    .pipe(
      map(response => {
        this.heights = [...this.heights, ...response.body.items];
        this.heightPagination = response.body;
        return this.heightPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Height>(this.baseUrl + '/height/get-heightDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/height/update-height/'+id, model);
  }
  submit(model: any) {
   
    return this.http.post<PostResponse>(this.baseUrl + '/height/save-height', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/height/delete-height/'+id);
  }
}
