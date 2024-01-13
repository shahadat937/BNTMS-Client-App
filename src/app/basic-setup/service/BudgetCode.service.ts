import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBudgetCodePagination,BudgetCodePagination } from '../models/BudgetCodePagination'
import { BudgetCode } from '../models/BudgetCode';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BudgetCodeService {
  baseUrl = environment.apiUrl;
  BudgetCodes: BudgetCode[] = [];
  BudgetCodePagination = new BudgetCodePagination();
  constructor(private http: HttpClient) { }

  getBudgetCodes(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IBudgetCodePagination>(this.baseUrl + '/budget-code/get-budgetCodes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BudgetCodes = [...this.BudgetCodes, ...response.body.items];
        this.BudgetCodePagination = response.body;
        return this.BudgetCodePagination;
      })
    );  
  }
  find(id: number) {
    return this.http.get<BudgetCode>(this.baseUrl + '/budget-code/get-budgetCodeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/budget-code/update-budgetCode/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/budget-code/save-budgetCode', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/budget-code/delete-budgetCode/'+id);
  }

}
