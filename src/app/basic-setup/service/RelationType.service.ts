import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRelationTypePagination,RelationTypePagination } from '../models/RelationTypePagination'
import { RelationType } from '../models/RelationType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RelationTypeService {
  baseUrl = environment.apiUrl;
  RelationTypes: RelationType[] = [];
  RelationTypePagination = new RelationTypePagination();
  constructor(private http: HttpClient) { }

  getRelationTypes(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IRelationTypePagination>(this.baseUrl + '/relation-type/get-relationTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.RelationTypes = [...this.RelationTypes, ...response.body.items];
        this.RelationTypePagination = response.body;
        return this.RelationTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<RelationType>(this.baseUrl + '/relation-type/get-relationTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/relation-type/update-relationType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/relation-type/save-relationType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/relation-type/delete-relationType/'+id);
  }

}
