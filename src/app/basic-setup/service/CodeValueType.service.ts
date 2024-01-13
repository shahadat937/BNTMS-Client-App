import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ICodeValueTypePagination,CodeValueTypePagination } from '../models/CodeValueTypePagination'
import { CodeValueType } from '../models/CodeValueType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CodeValueTypeService {
  baseUrl = environment.apiUrl;
  CodeValueTypes: CodeValueType[] = [];
  CodeValueTypePagination = new CodeValueTypePagination();
  constructor(private http: HttpClient) { }

  getCodeValueTypes(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<ICodeValueTypePagination>(this.baseUrl + '/code-value-type/get-codeValueTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CodeValueTypes = [...this.CodeValueTypes, ...response.body.items];
        this.CodeValueTypePagination = response.body;
        return this.CodeValueTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<CodeValueType>(this.baseUrl + '/code-value-type/get-codeValueTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/code-value-type/update-codeValueType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/code-value-type/save-codeValueType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/code-value-type/delete-codeValueType/'+id);
  }

}
