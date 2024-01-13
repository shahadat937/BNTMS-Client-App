import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBnaCurriculumUpdatePagination,BnaCurriculumUpdatePagination } from '../models/BnaCurriculumUpdatePagination';
import { BnaCurriculumUpdate } from '../models/BnaCurriculumUpdate';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BnaCurriculumUpdateService {
  baseUrl = environment.apiUrl;
  BnaCurriculumUpdates: BnaCurriculumUpdate[] = [];
  BnaCurriculumUpdatePagination = new BnaCurriculumUpdatePagination(); 
  constructor(private http: HttpClient) { }

  getselectedbnabatch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-batch/get-selectedBnaBatchs')
  }

  getselectedbnasemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getselectedbnasemesterdurations(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester-duration/get-selectedBnaSemesterDurations')
  }

  getselectedbnacurriculamtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-curriculam-type/get-selectedBnaCurriculamTypes')
  }
 

  getBnaCurriculumUpdates(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IBnaCurriculumUpdatePagination>(this.baseUrl + '/bna-curriculum-update/get-bnaCurriculumUpdates', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BnaCurriculumUpdates = [...this.BnaCurriculumUpdates, ...response.body.items];
        this.BnaCurriculumUpdatePagination = response.body;
        return this.BnaCurriculumUpdatePagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<BnaCurriculumUpdate>(this.baseUrl + '/bna-curriculum-update/get-bnaCurriculumUpdateDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-curriculum-update/update-bnaCurriculumUpdate/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/bna-curriculum-update/save-bnaCurriculumUpdate', model).pipe(
      map((BnaCurriculumUpdate: PostResponse) => {
        if (BnaCurriculumUpdate) {
          console.log(BnaCurriculumUpdate);
          return BnaCurriculumUpdate;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-curriculum-update/delete-bnaCurriculumUpdate/'+id);
  }
}
