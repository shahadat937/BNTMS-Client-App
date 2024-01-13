import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IStepRelationPagination,StepRelationPagination } from '../models/StepRelationPagination'
import { StepRelation } from '../models/StepRelation';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StepRelationService {
  baseUrl = environment.apiUrl;
  StepRelations: StepRelation[] = [];
  StepRelationPagination = new StepRelationPagination();
  constructor(private http: HttpClient) { }

  getStepRelations(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IStepRelationPagination>(this.baseUrl + '/step-relation/get-stepRelations', { observe: 'response', params })
    .pipe(
      map(response => {
        this.StepRelations = [...this.StepRelations, ...response.body.items];
        this.StepRelationPagination = response.body;
        return this.StepRelationPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<StepRelation>(this.baseUrl + '/step-relation/get-stepRelationDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/step-relation/update-stepRelation/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/step-relation/save-stepRelation', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/step-relation/delete-stepRelation/'+id);
  }

}
