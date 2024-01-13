import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Religion } from '../models/religion';
import {IReligionPagination, ReligionPagination } from '../models/religionPagination'

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  baseUrl = environment.apiUrl;
  nationalities: Religion[] = [];
  religionPagination = new ReligionPagination();
  constructor(private http: HttpClient) { }

  getReligions(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IReligionPagination>(this.baseUrl + '/religion/get-religions', { observe: 'response', params })
    .pipe(
      map(response => {
        this.nationalities = [...this.nationalities, ...response.body.items];
        this.religionPagination = response.body;
        return this.religionPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<Religion>(this.baseUrl + '/religion/get-religionDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/religion/update-religion/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/religion/save-religion', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/religion/delete-religion/'+id);
  }
}
