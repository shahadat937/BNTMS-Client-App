import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourseBudgetAllocationPagination,CourseBudgetAllocationPagination } from '../models/courseBudgetAllocationPagination';
import { CourseBudgetAllocation } from '../models/CourseBudgetAllocation';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseBudgetAllocationService {
  baseUrl = environment.apiUrl;
  CourseBudgetAllocations: CourseBudgetAllocation[] = [];
  CourseBudgetAllocationPagination = new CourseBudgetAllocationPagination(); 
  constructor(private http: HttpClient) { }

  getselectedPaymentType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/payment-type/get-selectedPaymentTypes')
  }
  getselectedBudgetCode(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/budget-code/get-selectedBudgetCodes')
  }

  getselectedBudgetType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/budget-type/get-selectedBudgetTypes')
  }

  getselectedFiscalYear(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/fiscal-year/get-selectedFiscalYear')
  }


  getCourseBudgetAllocations(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<ICourseBudgetAllocationPagination>(this.baseUrl + '/course-budget-allocation/get-courseBudgetAllocations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.CourseBudgetAllocations = [...this.CourseBudgetAllocations, ...response.body.items];
        this.CourseBudgetAllocationPagination = response.body;
        return this.CourseBudgetAllocationPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<CourseBudgetAllocation>(this.baseUrl + '/course-budget-allocation/get-courseBudgetAllocationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/course-budget-allocation/update-courseBudgetAllocation/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/course-budget-allocation/save-courseBudgetAllocation', model).pipe(
      map((CourseBudgetAllocation: PostResponse) => {
        if (CourseBudgetAllocation) {
          console.log(CourseBudgetAllocation);
          return CourseBudgetAllocation;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/course-budget-allocation/delete-courseBudgetAllocation/'+id);
  }
}
