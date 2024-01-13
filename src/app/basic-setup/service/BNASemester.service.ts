import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBNASemesterPagination, BNASemesterPagination } from '../models/BNASemesterPagination'
import { BNASemester } from '../models/BNASemester';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BNASemesterService {
  baseUrl = environment.apiUrl;
  BNASemesters: BNASemester[] = [];
  BNASemesterPagination = new BNASemesterPagination();
  constructor(private http: HttpClient) { }

  getBNASemesters(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IBNASemesterPagination>(this.baseUrl + '/bna-semester/get-bnaSemesters', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNASemesters = [...this.BNASemesters, ...response.body.items];
        this.BNASemesterPagination = response.body;
        return this.BNASemesterPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BNASemester>(this.baseUrl + '/bna-semester/get-bnaSemesterDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-semester/update-bnaSemester/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-semester/save-bnaSemester', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-semester/delete-bnaSemester/'+id);
  }

}
