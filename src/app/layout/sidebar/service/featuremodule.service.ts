import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
//import { ICourseDurationPagination,CourseDurationPagination } from '../models/coursedurationPagination';
import { Module } from '../models/module';
import { SelectedModel } from '../../../core/models/selectedModel';
import { map } from 'rxjs';
//import { PostResponse } from 'src/app/core/models/PostResponse';
import { PostResponse } from '../../../../app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class FeatureModuleService {
  baseUrl = environment.securityUrl;
  CourseDurations: Module[] = [];
  //CourseDurationPagination = new CourseDurationPagination(); 
  constructor(private http: HttpClient) { }

getModuleFeatures(){ 
  return this.http.get<Module[]>(this.baseUrl + '/Module/get-module-features');
}
  
}
