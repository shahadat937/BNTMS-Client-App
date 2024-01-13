import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IElectedPagination,ElectedPagination } from '../models/ElectedPagination';
import { Elected } from '../models/Elected';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectedService {
  baseUrl = environment.apiUrl;
  electeds: Elected[] = [];
  electedPagination = new ElectedPagination();
  constructor(private http: HttpClient) { }

  getElecteds(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IElectedPagination>(this.baseUrl + '/elected/get-electedes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.electeds = [...this.electeds, ...response.body.items];
        this.electedPagination = response.body;
        return this.electedPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Elected>(this.baseUrl + '/elected/get-electedDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/elected/update-elected/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/elected/save-elected', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/elected/delete-elected/'+id);
  }
}
