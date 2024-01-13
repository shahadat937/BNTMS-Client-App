import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBloodGroupPagination,BloodGroupPagination } from '../models/BloodGroupPagination'
import { BloodGroup } from '../models/BloodGroup';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {
  baseUrl = environment.apiUrl;
  BloodGroups: BloodGroup[] = [];
  BloodGroupPagination = new BloodGroupPagination();
  constructor(private http: HttpClient) { }

  getBloodGroups(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IBloodGroupPagination>(this.baseUrl + '/blood-group/get-bloodGroups', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BloodGroups = [...this.BloodGroups, ...response.body.items];
        this.BloodGroupPagination = response.body;
        return this.BloodGroupPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BloodGroup>(this.baseUrl + '/blood-group/get-bloodGroupDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/blood-group/update-bloodGroup/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/blood-group/save-bloodGroup', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/blood-group/delete-bloodGroup/'+id);
  }

}
