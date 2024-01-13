import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICodeValuePagination,CodeValuePagination } from '../models/CodeValuePagination';
import { CodeValue } from '../models/CodeValue';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { CodeValueType } from '../models/CodeValueType';
import { PostResponse } from 'src/app/core/models/PostResponse';
import { CheckboxSelectedModel } from 'src/app/core/models/checkboxSelectedModel';

@Injectable({
  providedIn: 'root'
})
export class CodeValueService {
  baseUrl = environment.apiUrl;
  CodeValues: CodeValue[] = [];
  CodeValuePagination = new CodeValuePagination();
  constructor(private http: HttpClient) { }

  getCodeValues(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<ICodeValuePagination>(this.baseUrl + '/code-value/get-codeValues', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CodeValues = [...this.CodeValues, ...response.body.items];
        this.CodeValuePagination = response.body;
        return this.CodeValuePagination;
      })
    ); 
   
  }
  
  getCheckBoxSelectedCodeValueByTypeWithChecked(type:string){
    return this.http.get<CheckboxSelectedModel[]>(this.baseUrl + '/code-value/get-selectedCodeValueByTypeWithChecked?type='+ type) 
  }
  getSelectedCodeValueByType(type:string){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/code-value/get-selectedCodeValueByType?type='+ type) 
  }

  getselectedcodevaluetype(){
      return this.http.get<SelectedModel[]>(this.baseUrl + '/code-value-type/get-selectedCodeValueTypes')
  }

  find(id: number) {
    return this.http.get<CodeValue>(this.baseUrl + '/code-value/get-codeValueDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/code-value/update-codeValue/'+id, model);
  }

  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/code-value/save-codeValue', model)
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/code-value/delete-codeValue/'+id);
  }
}
