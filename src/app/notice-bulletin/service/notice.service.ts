import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INoticePagination,NoticePagination } from '../models/noticePagination';
import { Notice } from '../models/notice';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  baseUrl = environment.apiUrl;
  Notices: Notice[] = [];
  NoticePagination = new NoticePagination(); 
  constructor(private http: HttpClient) { }

  getCourseByBaseSchoolNameId(baseSchoolNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByBaseNameId?baseSchoolNameId='+baseSchoolNameId)
  }
  
  stopNotices(noticeId){
    return this.http.get<Notice[]>(this.baseUrl + '/notice/stop-notices/'+noticeId)
  }

  // runningNotices(noticeId){
  //   return this.http.get<Notice[]>(this.baseUrl + '/notice/stop-notices/'+noticeId)
  // }

  getNoticeBySchool(baseSchoolNameId){
    return this.http.get<Notice[]>(this.baseUrl + '/notice/get-selectedClassNoticeBySchool?baseSchoolNameId='+baseSchoolNameId)
  }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
 

  getNotices(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<INoticePagination>(this.baseUrl + '/notice/get-notices', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Notices = [...this.Notices, ...response.body.items];
        this.NoticePagination = response.body;
        return this.NoticePagination;
      })
    ); 
  }

  find(id: number) {
    return this.http.get<Notice>(this.baseUrl + '/notice/get-noticeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/notice/update-notice/'+id, model);
  }
  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/notice/save-notice', model).pipe(
      map((BnaClassTest: PostResponse) => {
        if (BnaClassTest) {
          console.log(BnaClassTest);
          return BnaClassTest;
        }
      })
    );
  
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/notice/delete-notice/'+id);
  }
}
