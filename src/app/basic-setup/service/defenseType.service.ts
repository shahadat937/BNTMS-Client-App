import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DefenseType } from '../models/defenseType';
import {IDefenseTypePagination, DefenseTypePagination } from '../models/defenseTypePagination'

@Injectable({
  providedIn: 'root'
})
export class DefenseTypeService {

  baseUrl = environment.apiUrl;
  defenseTypes: DefenseType[] = [];
  defenseTypePagination = new DefenseTypePagination();
  constructor(private http: HttpClient) { }

  getDefenseTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IDefenseTypePagination>(this.baseUrl + '/defense-type/get-defenseTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.defenseTypes = [...this.defenseTypes, ...response.body.items];
        this.defenseTypePagination = response.body;
        return this.defenseTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<DefenseType>(this.baseUrl + '/defense-type/get-defenseTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/defense-type/update-defenseType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/defense-type/save-defenseType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/defense-type/delete-defenseType/'+id);
  }
}
