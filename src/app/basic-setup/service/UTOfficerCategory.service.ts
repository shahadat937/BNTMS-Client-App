import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IUTOfficerCategoryPagination,UTOfficerCategoryPagination } from '../models/UTOfficerCategoryPagination'
import { UTOfficerCategory } from '../models/UTOfficerCategory';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UTOfficerCategoryService {
  baseUrl = environment.apiUrl;
  UTOfficerCategorys: UTOfficerCategory[] = [];
  UTOfficerCategoryPagination = new UTOfficerCategoryPagination();
  constructor(private http: HttpClient) { }

  getUTOfficerCategorys(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IUTOfficerCategoryPagination>(this.baseUrl + '/ut-officer-category/get-utOfficerCategories', { observe: 'response', params })
    .pipe(
      map(response => {
        this.UTOfficerCategorys = [...this.UTOfficerCategorys, ...response.body.items];
        this.UTOfficerCategoryPagination = response.body;
        return this.UTOfficerCategoryPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<UTOfficerCategory>(this.baseUrl + '/ut-officer-category/get-utOfficerCategoryDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/ut-officer-category/update-utOfficerCategory/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/ut-officer-category/save-utOfficerCategory', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/ut-officer-category/delete-utOfficerCategory/'+id);
  }

}
