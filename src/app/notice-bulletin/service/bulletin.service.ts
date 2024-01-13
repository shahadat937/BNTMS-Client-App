import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBulletinPagination,BulletinPagination } from '../models/bulletinPagination';
import { Bulletin } from '../models/bulletin';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  baseUrl = environment.apiUrl;
  Bulletins: Bulletin[] = [];
  BulletinPagination = new BulletinPagination(); 
  constructor(private http: HttpClient) { }

  getCourseByBaseSchoolNameId(baseSchoolNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByBaseNameId?baseSchoolNameId='+baseSchoolNameId)
  }

  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
 

  getBulletins(pageNumber, pageSize,searchText,schoolId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('baseSchoolNameId', schoolId);
   
    return this.http.get<IBulletinPagination>(this.baseUrl + '/bulletin/get-bulletins', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Bulletins = [...this.Bulletins, ...response.body.items];
        this.BulletinPagination = response.body;
        return this.BulletinPagination;
      })
    ); 
  }

  find(id: number) {
    return this.http.get<Bulletin>(this.baseUrl + '/bulletin/get-bulletinDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/Bulletin/update-bulletin/'+id, model);
  }
  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/bulletin/save-bulletin', model).pipe(
      map((BnaClassTest: PostResponse) => {
        if (BnaClassTest) {
          console.log(BnaClassTest);
          return BnaClassTest;
        }
      })
    );
  
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/Bulletin/delete-Bulletin/'+id);
  } 


  ChangeBulletinStatus(bulletinId,status){
    return this.http.get(this.baseUrl + '/bulletin/change-bulletinStatus?bulletinId='+bulletinId+'&status='+status);
  }
  
}
