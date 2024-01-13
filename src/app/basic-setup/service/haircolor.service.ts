import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HairColor } from '../models/haircolor';
import {IHairColorPagination, HairColorPagination } from '../models/haircolorPagination'

@Injectable({
  providedIn: 'root'
})
export class HairColorService {

  baseUrl = environment.apiUrl;
  countries: HairColor[] = [];
  HairColorPagination = new HairColorPagination();
  constructor(private http: HttpClient) { }

  getCountries(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IHairColorPagination>(this.baseUrl + '/hair-color/get-hairColors', { observe: 'response', params })
    .pipe(
      map(response => {
        this.countries = [...this.countries, ...response.body.items];
        this.HairColorPagination = response.body;
        return this.HairColorPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<HairColor>(this.baseUrl + '/hair-color/get-hairColorDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/hair-color/update-hairColor/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/hair-color/save-hairColor', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/hair-color/delete-hairColor/'+id);
  }
}
