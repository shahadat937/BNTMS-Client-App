import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNAInstructorTypePagination,BNAInstructorTypePagination } from '../models/BNAInstructorTypePagination'
import { BNAInstructorType } from '../models/BNAInstructorType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BNAInstructorTypeService {
  baseUrl = environment.apiUrl;
  BNAInstructorTypes: BNAInstructorType[] = [];
  BNAInstructorTypePagination = new BNAInstructorTypePagination();
  constructor(private http: HttpClient) { }

  getBNAInstructorTypes(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IBNAInstructorTypePagination>(this.baseUrl + '/bna-instructor-type/get-bnaInstructorTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAInstructorTypes = [...this.BNAInstructorTypes, ...response.body.items];
        this.BNAInstructorTypePagination = response.body;
        return this.BNAInstructorTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BNAInstructorType>(this.baseUrl + '/bna-instructor-type/get-bnaInstructorTypeDetail/' + id);
  }
  
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-instructor-type/update-bnaInstructorType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-instructor-type/save-bnaInstructorType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-instructor-type/delete-bnaInstructorType/'+id);
  }

}
