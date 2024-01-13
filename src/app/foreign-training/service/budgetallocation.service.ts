import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBudgetAllocationPagination,BudgetAllocationPagination } from '../models/BudgetAllocationPagination';
import { BudgetAllocation } from '../models/BudgetAllocation';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BudgetAllocationService {
  baseUrl = environment.apiUrl;
  BudgetAllocations: BudgetAllocation[] = [];
  BudgetAllocationPagination = new BudgetAllocationPagination(); 
  constructor(private http: HttpClient) { }


  getselectedBudgetCode(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/budget-code/get-selectedBudgetCodes')
  }

  getselectedBudgetType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/budget-type/get-selectedBudgetTypes')
  }

  getselectedFiscalYear(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/fiscal-year/get-selectedFiscalYear')
  }

  
  getBudgetAllocations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IBudgetAllocationPagination>(this.baseUrl + '/budget-allocation/get-BudgetAllocations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BudgetAllocations = [...this.BudgetAllocations, ...response.body.items];
        this.BudgetAllocationPagination = response.body;
        return this.BudgetAllocationPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BudgetAllocation>(this.baseUrl + '/budget-allocation/get-BudgetAllocationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/budget-allocation/update-BudgetAllocation/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/budget-allocation/save-BudgetAllocation', model).pipe(
      map((BudgetAllocation: PostResponse) => {
        if (BudgetAllocation) {
          console.log(BudgetAllocation);
          return BudgetAllocation;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/budget-allocation/delete-BudgetAllocation/'+id);
  }
}
