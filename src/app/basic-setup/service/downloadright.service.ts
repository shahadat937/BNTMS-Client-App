import { Injectable } from '@angular/core';
import { IDownloadRightPagination, DownloadRightPagination} from '../models/downloadrightPagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { DownloadRight } from '../models/downloadright';

@Injectable({
  providedIn: 'root'
})
export class DownloadRightService {
  baseUrl = environment.apiUrl;
  DownloadRight: DownloadRight[] = [];
  DownloadRightPagination = new DownloadRightPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getDownloadRight(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IDownloadRightPagination>(this.baseUrl + '/download-right/get-downloadRights', { observe: 'response', params })
    .pipe(
      map(response => {
        this.DownloadRight = [...this.DownloadRight, ...response.body.items];
        this.DownloadRightPagination = response.body;
        return this.DownloadRightPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<DownloadRight>(this.baseUrl + '/download-right/get-downloadRightDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/download-right/update-downloadRight/'+id, model);
  }
  submit(model: any) { 
    return this.http.post<PostResponse>(this.baseUrl + '/download-right/save-downloadRight', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/download-right/delete-downloadRight/'+id);
  }
}
