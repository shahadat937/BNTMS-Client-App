import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IModulePagination, ModulePagination } from '../models/ModulePagination'
import { Module } from '../models/module';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  baseUrl = environment.securityUrl;
  Modules: Module[] = [];
  ModulePagination = new ModulePagination();
  constructor(private http: HttpClient) { }

  getModules(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IModulePagination>(this.baseUrl + '/module/get-modules', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Modules = [...this.Modules, ...response.body.items];
        this.ModulePagination = response.body;
        return this.ModulePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Module>(this.baseUrl + '/module/get-moduleDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/module/update-module/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/module/save-module', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/module/delete-module/'+id);
  }
}
