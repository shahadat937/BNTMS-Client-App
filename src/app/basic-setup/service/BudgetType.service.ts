import { Injectable } from '@angular/core';
import { IBudgetTypePagination, BudgetTypePagination} from '../models/BudgetTypePagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { BudgetType } from '../models/BudgetType';

@Injectable({
  providedIn: 'root'
})
export class BudgetTypeService {
  baseUrl = environment.apiUrl;
  BudgetType: BudgetType[] = [];
  BudgetTypePagination = new BudgetTypePagination();
  id: number;
  constructor(private http: HttpClient) { }

  getBudgetType(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IBudgetTypePagination>(this.baseUrl + '/budget-type/get-budgetTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BudgetType = [...this.BudgetType, ...response.body.items];
        this.BudgetTypePagination = response.body;
        return this.BudgetTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<BudgetType>(this.baseUrl + '/budget-type/get-budgetTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/budget-type/update-budgetType/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/budget-type/save-budgetType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/budget-type/delete-budgetType/'+id);
  }
}
