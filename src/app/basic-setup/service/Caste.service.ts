import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ICastePagination,CastePagination } from '../models/CastePagination'
import { Caste } from '../models/Caste';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class CasteService {
  baseUrl = environment.apiUrl;
  Castes: Caste[] = [];
  CastePagination = new CastePagination();
  constructor(private http: HttpClient) { }

  getCastes(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<ICastePagination>(this.baseUrl + '/Caste/get-castes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Castes = [...this.Castes, ...response.body.items];
        this.CastePagination = response.body;
        return this.CastePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<Caste>(this.baseUrl + '/Caste/get-casteDetail/' + id);
  }

  getselectedreligion(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/religion/get-selectedReligions')
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/Caste/update-caste/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/Caste/save-caste', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/Caste/delete-caste/'+id);
  }

}
