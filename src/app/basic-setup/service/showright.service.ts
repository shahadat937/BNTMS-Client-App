import { Injectable } from '@angular/core';
import { IShowRightPagination, ShowRightPagination} from '../models/showrightPagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ShowRight } from '../models/ShowRight';

@Injectable({
  providedIn: 'root'
})
export class ShowRightService {
  baseUrl = environment.apiUrl;
  ShowRight: ShowRight[] = [];
  ShowRightPagination = new ShowRightPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getShowRight(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IShowRightPagination>(this.baseUrl + '/show-right/get-showRights', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ShowRight = [...this.ShowRight, ...response.body.items];
        this.ShowRightPagination = response.body;
        return this.ShowRightPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<ShowRight>(this.baseUrl + '/show-right/get-showRightDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/show-right/update-showRight/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/show-right/save-showRight', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/show-right/delete-showRight/'+id);
  }
}
