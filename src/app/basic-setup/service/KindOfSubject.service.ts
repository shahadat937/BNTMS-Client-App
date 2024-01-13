import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IKindOfSubjectPagination,KindOfSubjectPagination } from '../models/KindOfSubjectPagination';
import { PostResponse } from '../../core/models/PostResponse';
import { KindOfSubject } from '../models/KindOfSubject';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KindOfSubjectService {
  baseUrl = environment.apiUrl;
  KindOfSubjects: KindOfSubject[] = [];
  KindOfSubjectPagination = new KindOfSubjectPagination();
  constructor(private http: HttpClient) { }

  getKindOfSubjects(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IKindOfSubjectPagination>(this.baseUrl + '/kind-of-subject/get-kindOfSubjects', { observe: 'response', params })
    .pipe(
      map(response => {
        this.KindOfSubjects = [...this.KindOfSubjects, ...response.body.items];
        this.KindOfSubjectPagination = response.body;
        return this.KindOfSubjectPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<KindOfSubject>(this.baseUrl + '/kind-of-subject/get-kindOfSubjectDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/kind-of-subject/update-kindOfSubject/'+id, model);
  }
  submit(model: any) {
   
    return this.http.post<PostResponse>(this.baseUrl + '/kind-of-subject/save-kindOfSubject', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/kind-of-subject/delete-kindOfSubject/'+id);
  }
}
