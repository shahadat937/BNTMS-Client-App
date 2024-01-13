import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nationality } from '../models/nationality';
import {INationalityPagination, NationalityPagination } from '../models/nationalityPagination'

@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  baseUrl = environment.apiUrl;
  nationalities: Nationality[] = [];
  nationalityPagination = new NationalityPagination();
  constructor(private http: HttpClient) { }

  getNationalities(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<INationalityPagination>(this.baseUrl + '/nationality/get-nationalities', { observe: 'response', params })
    .pipe(
      map(response => {
        this.nationalities = [...this.nationalities, ...response.body.items];
        this.nationalityPagination = response.body;
        return this.nationalityPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<Nationality>(this.baseUrl + '/nationality/get-nationalityDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/nationality/update-nationality/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/nationality/save-nationality', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/nationality/delete-nationality/'+id);
  }
}
