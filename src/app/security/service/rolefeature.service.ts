import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IRoleFeaturePagination, RoleFeaturePagination } from '../models/RoleFeaturePagination'
import { RoleFeature } from '../models/RoleFeature';
import { map } from 'rxjs';
import { SelectedModel } from '../../core/models/selectedModel';
@Injectable({
  providedIn: 'root'
})
export class RoleFeatureService {
  baseUrl = environment.securityUrl;
  RoleFeatures: RoleFeature[] = [];
  RoleFeaturePagination = new RoleFeaturePagination();
  constructor(private http: HttpClient) { }

  getRoleFeatures(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IRoleFeaturePagination>(this.baseUrl + '/RoleFeature/get-RoleFeatures', { observe: 'response', params })
    .pipe(
      map(response => {
        this.RoleFeatures = [...this.RoleFeatures, ...response.body.items];
        this.RoleFeaturePagination = response.body;
        return this.RoleFeaturePagination;
      })
    );
   
  }

  

  find(Roleid:number,Featureid:number) {
    return this.http.get<RoleFeature>(this.baseUrl + '/RoleFeature/get-RoleFeatureDetail?RoleId='+Roleid+'&FeatureId='+Featureid);
  }
   

  update(Roleid:number,Featureid:number,model: any) { 
    //return this.http.put(this.baseUrl + '/RoleFeature/update-RoleFeature/'+id, model);
    return this.http.put(this.baseUrl + '/RoleFeature/update-RoleFeature?RoleId='+Roleid+'&FeatureId='+Featureid, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/RoleFeature/save-RoleFeature', model);
  } 
  delete(Roleid:number,Featureid){
    //return this.http.delete(this.baseUrl + '/RoleFeature/delete-RoleFeature/'+id);
    return this.http.delete(this.baseUrl + '/RoleFeature/delete-RoleFeature?RoleId='+Roleid+'&FeatureId='+Featureid);
    
  }

  getselectedrole(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Role/get-selectedroles') 
  }

  getselectedfeature(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Feature/get-selectedfeatures') 
  }
  
}
