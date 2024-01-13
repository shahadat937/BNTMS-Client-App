import { Injectable } from '@angular/core';
import { IWeightPagination, WeightPagination} from '../models/weightPagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { Weight } from '../models/weight';

@Injectable({
  providedIn: 'root'
})
export class WeightService {
  baseUrl = environment.apiUrl;
  weights: Weight[] = [];
  weightPagination = new WeightPagination();
  id: number;
  constructor(private http: HttpClient) { }

  getWeights(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IWeightPagination>(this.baseUrl + '/weights/get-weights', { observe: 'response', params })
    .pipe(
      map(response => {
        this.weights = [...this.weights, ...response.body.items];
        this.weightPagination = response.body;
        return this.weightPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Weight>(this.baseUrl + '/weights/get-weightDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/weights/update-weight/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/weights/save-weight', model).pipe(
      map((weight: PostResponse) => {
        if (weight) {
          console.log(weight);
          return weight;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/weights/delete-weight/'+id);
  }
}
