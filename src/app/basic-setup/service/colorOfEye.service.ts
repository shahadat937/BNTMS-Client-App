import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ColorOfEye } from '../models/colorOfEye';
import {IColorOfEyePagination, ColorOfEyePagination } from '../models/ColorOfEyePagination'

@Injectable({
  providedIn: 'root'
})
export class ColorOfEyeService {

  baseUrl = environment.apiUrl;
  colorOfEyes: ColorOfEye[] = [];
  colorOfEyePagination = new ColorOfEyePagination();
  constructor(private http: HttpClient) { }

  getColorOfEyes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IColorOfEyePagination>(this.baseUrl + '/color-of-eye/get-colorOfEyes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.colorOfEyes = [...this.colorOfEyes, ...response.body.items];
        this.colorOfEyePagination = response.body;
        return this.colorOfEyePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<ColorOfEye>(this.baseUrl + '/color-of-eye/get-colorOfEyeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/color-of-eye/update-colorOfEye/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/color-of-eye/save-colorOfEye', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/color-of-eye/delete-colorOfEye/'+id);
  }
}
