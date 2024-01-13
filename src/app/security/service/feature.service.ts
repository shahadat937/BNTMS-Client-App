import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IFeaturePagination, FeaturePagination } from '../models/featurePagination'
import { Feature } from '../models/feature';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  baseUrl = environment.securityUrl;
  Features: Feature[] = [];
  FeaturePagination = new FeaturePagination();
  constructor(private http: HttpClient) { }

  getFeatures(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IFeaturePagination>(this.baseUrl + '/feature/get-features', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Features = [...this.Features, ...response.body.items];
        this.FeaturePagination = response.body;
        return this.FeaturePagination;
      })
    );
   
  }

  getselectedmodule(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/module/get-selectedModules') 
  }

  find(id: number) {
    return this.http.get<Feature>(this.baseUrl + '/feature/get-featureDetail/' + id);
  }
   

  update(id: number,model: any) { 
    return this.http.put(this.baseUrl + '/feature/update-feature/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/feature/save-feature', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/feature/delete-feature/'+id);
  }
}
