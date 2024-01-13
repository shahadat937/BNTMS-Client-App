import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IGenderPagination, GenderPagination } from '../models/genderPagination'
import { Gender } from '../models/gender';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenderService {
  baseUrl = environment.apiUrl;
  genders: Gender[] = [];
  genderPagination = new GenderPagination();
  constructor(private http: HttpClient) { }

  getGenders(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IGenderPagination>(this.baseUrl + '/gender/get-genders', { observe: 'response', params })
    .pipe(
      map(response => {
        this.genders = [...this.genders, ...response.body.items];
        this.genderPagination = response.body;
        return this.genderPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<Gender>(this.baseUrl + '/gender/get-genderDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/gender/update-gender/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/gender/save-gender', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/gender/delete-gender/'+id);
  }

}
