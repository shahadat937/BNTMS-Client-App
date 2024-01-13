import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IBNACurriculamTypePagination, BNACurriculamTypePagination } from '../models/bNACurriculamTypePagination';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { BNACurriculamType } from '../models/bNACurriculamType';
@Injectable({
  providedIn: 'root'
})
export class BNACurriculamTypeService {
  baseUrl = environment.apiUrl;
  bNACurriculamTypes: BNACurriculamType[] = [];
  bNACurriculamTypePagination = new BNACurriculamTypePagination();
  constructor(private http: HttpClient) { }

  getBNACurriculamTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IBNACurriculamTypePagination>(this.baseUrl + '/bna-curriculam-type/get-bnaCurriculamTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.bNACurriculamTypes = [...this.bNACurriculamTypes, ...response.body.items];
        this.bNACurriculamTypePagination = response.body;
        return this.bNACurriculamTypePagination;
      })
    );
   
  }
  
  getBNACurriculamTypesAll() {
    return this.http.get<BNACurriculamType>(this.baseUrl + '/BnaCurriculamType/get-selectedBnaCurriculamTypes');
  }
 

  find(id: number) {
    return this.http.get<BNACurriculamType>(this.baseUrl + '/bna-curriculam-type/get-bnaCurriculamTypeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-curriculam-type/update-bnaCurriculamType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-curriculam-type/save-bnaCurriculamType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-curriculam-type/delete-bnaCurriculamType/'+id);
  }
}
