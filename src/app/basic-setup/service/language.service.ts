import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILanguagePagination,LanguagePagination } from '../models/LanguagePagination';
import { Language } from '../models/Language';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  baseUrl = environment.apiUrl;
  Languages: Language[] = [];
  LanguagePagination = new LanguagePagination();
  constructor(private http: HttpClient) { }

  getLanguages(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<ILanguagePagination>(this.baseUrl + '/language/get-languages', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Languages = [...this.Languages, ...response.body.items];
        this.LanguagePagination = response.body;
        return this.LanguagePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Language>(this.baseUrl + '/language/get-languageDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/language/update-language/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/language/save-language', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/language/delete-language/'+id);
  }
}
