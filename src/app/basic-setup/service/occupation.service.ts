import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Occupation } from '../models/occupation';
import {IOccupationPagination, OccupationPagination } from '../models/occupationPagination'

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  baseUrl = environment.apiUrl;
  occupations: Occupation[] = [];
  occupationPagination = new OccupationPagination();
  constructor(private http: HttpClient) { }

  getOccupations(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IOccupationPagination>(this.baseUrl + '/occupation/get-occupations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.occupations = [...this.occupations, ...response.body.items];
        this.occupationPagination = response.body;
        return this.occupationPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<Occupation>(this.baseUrl + '/occupation/get-occupationDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/occupation/update-occupation/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/occupation/save-occupation', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/occupation/delete-occupation/'+id);
  }
}
