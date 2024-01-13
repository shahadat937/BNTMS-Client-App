import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeekName } from '../models/WeekName';
import {IWeekNamePagination, WeekNamePagination } from '../models/WeekNamePagination'

@Injectable({
  providedIn: 'root'
})
export class WeekNameService {

  baseUrl = environment.apiUrl;
  WeekNames: WeekName[] = [];
  WeekNamePagination = new WeekNamePagination();
  constructor(private http: HttpClient) { }

  getWeekNames(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IWeekNamePagination>(this.baseUrl + '/week-name/get-WeekNames', { observe: 'response', params })
    .pipe(
      map(response => {
        this.WeekNames = [...this.WeekNames, ...response.body.items];
        this.WeekNamePagination = response.body;
        return this.WeekNamePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<WeekName>(this.baseUrl + '/week-name/get-WeekNameDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/week-name/update-WeekName/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/week-name/save-WeekName', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/week-name/delete-WeekName/'+id);
  }
}
