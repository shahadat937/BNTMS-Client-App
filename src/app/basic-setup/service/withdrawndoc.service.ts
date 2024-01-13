import { Injectable } from '@angular/core';
import { IWithdrawnDocPagination, WithdrawnDocPagination} from '../models/withdrawndocPagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { WithdrawnDoc } from '../models/withdrawndoc';

@Injectable({
  providedIn: 'root'
})
export class WithdrawnDocService {
  baseUrl = environment.apiUrl;
  WithdrawnDocs: WithdrawnDoc[] = [];
  WithdrawnDocPagination = new WithdrawnDocPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getWithdrawnDocs(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IWithdrawnDocPagination>(this.baseUrl + '/withdrawn-docs/get-withdrawnDocs', { observe: 'response', params })
    .pipe(
      map(response => {
        this.WithdrawnDocs = [...this.WithdrawnDocs, ...response.body.items];
        this.WithdrawnDocPagination = response.body;
        return this.WithdrawnDocPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<WithdrawnDoc>(this.baseUrl + '/withdrawn-docs/get-withdrawnDocsDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/withdrawn-docs/update-withdrawnDoc/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/withdrawn-docs/save-withdrawnDoc', model).pipe(
      map((WithdrawnDoc: PostResponse) => {
        if (WithdrawnDoc) {
          console.log(WithdrawnDoc);
          return WithdrawnDoc;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/withdrawn-docs/delete-withdrawnDoc/'+id);
  }
}
