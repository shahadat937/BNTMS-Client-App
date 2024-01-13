import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IThanaPagination,ThanaPagination } from '../models/ThanaPagination'
import { Thana } from '../models/Thana';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class ThanaService {
  baseUrl = environment.apiUrl;
  Thanas: Thana[] = [];
  ThanaPagination = new ThanaPagination();
  constructor(private http: HttpClient) { }

  getThanas(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IThanaPagination>(this.baseUrl + '/thana/get-thanas', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Thanas = [...this.Thanas, ...response.body.items];
        this.ThanaPagination = response.body;
        return this.ThanaPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<Thana>(this.baseUrl + '/thana/get-thanaDetail/' + id);
  }

  getselecteddistrict(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/district/get-selectedDistricts')
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/thana/update-thana/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/thana/save-thana', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/thana/delete-thana/'+id);
  }

}
