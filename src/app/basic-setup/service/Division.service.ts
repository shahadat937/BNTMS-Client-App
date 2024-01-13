import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IDivisionPagination,DivisionPagination } from '../models/DivisionPagination'
import { Division } from '../models/Division';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  baseUrl = environment.apiUrl;
  Divisions: Division[] = [];
  DivisionPagination = new DivisionPagination();
  constructor(private http: HttpClient) { }

  getDivisions(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IDivisionPagination>(this.baseUrl + '/division/get-divisions', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Divisions = [...this.Divisions, ...response.body.items];
        this.DivisionPagination = response.body;
        return this.DivisionPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<Division>(this.baseUrl + '/division/get-divisionDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/division/update-division/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/division/save-division', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/division/delete-division/'+id);
  }

}
