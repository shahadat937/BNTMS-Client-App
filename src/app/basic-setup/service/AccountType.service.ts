import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IAccountTypePagination, AccountTypePagination } from '../models/AccountTypePagination'
import { AccountType } from '../models/AccountType';
import { map } from 'rxjs';
import { SelectedModel } from 'src/app/core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {
  baseUrl = environment.apiUrl;
  AccountTypes: AccountType[] = [];
  AccountTypePagination = new AccountTypePagination();
  constructor(private http: HttpClient) { }

  getAdminAuthorities(pageNumber, pageSize, searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    
    return this.http.get<IAccountTypePagination>(this.baseUrl + '/account-type/get-accountTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.AccountTypes = [...this.AccountTypes, ...response.body.items];
        this.AccountTypePagination = response.body;
        return this.AccountTypePagination;
      })
    );
   
  }

  getselectedAdminAuthorities(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/account-type/get-selectedAccountTypes')
  }

  find(id: number) {
    return this.http.get<AccountType>(this.baseUrl + '/account-type/get-accountTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/account-type/update-accountType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/account-type/save-accountType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/account-type/delete-accountType/'+id);
  }

}
