import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavoritesType } from '../models/favoritesType';
import {IFavoritesTypePagination, FavoritesTypePagination } from '../models/favoritesTypePagination'

@Injectable({
  providedIn: 'root'
})
export class FavoritesTypeService {

  baseUrl = environment.apiUrl;
  favoritesTypes: FavoritesType[] = [];
  favoritesTypePagination = new FavoritesTypePagination();
  constructor(private http: HttpClient) { }

  getFavoritesTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IFavoritesTypePagination>(this.baseUrl + '/favorites-type/get-favoritesTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.favoritesTypes = [...this.favoritesTypes, ...response.body.items];
        this.favoritesTypePagination = response.body;
        return this.favoritesTypePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<FavoritesType>(this.baseUrl + '/favorites-type/get-favoritesTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/favorites-type/update-favoritesType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/favorites-type/seve-favoritesType', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/favorites-type/delete-favoritesType/'+id);
  }
}
