import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { IRoutineSoftCopyUploadPagination,RoutineSoftCopyUploadPagination } from '../models/RoutineSoftCopyUploadPagination';
import {IRoutineSoftCopyUploadPagination,RoutineSoftCopyUploadPagination} from '../models/RoutineSoftCopyUploadPagination'
import { RoutineSoftCopyUpload } from '../models/RoutineSoftCopyUpload';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class RoutineSoftCopyUploadService {
  baseUrl = environment.apiUrl;
  RoutineSoftCopyUploads: RoutineSoftCopyUpload[] = [];
  RoutineSoftCopyUploadPagination = new RoutineSoftCopyUploadPagination(); 
  constructor(private http: HttpClient) { }

  
  getSelectedRoutineSoftCopyUpload(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/reading-material-title/get-selectedReadingMaterialTitles')
  }
  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getselectedschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }

  getselectedDocumentType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/document-type/get-selectedDocumentTypes')
  }

  getselectedShowRight(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/show-right/get-selectedShowRight')
  }

  getselecteddownloadright(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/download-right/get-selectedDownloadRights')
  }
 

  getSoftCopyUploadList(pageNumber, pageSize,searchText, baseSchoolNameId,courseDurationId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('baseSchoolNameId', baseSchoolNameId.toString());
    params = params.append('courseDurationId', courseDurationId.toString());

    return this.http.get<IRoutineSoftCopyUploadPagination>(this.baseUrl + '/routine-softcopy-upload/get-RoutineSoftCopyUploads', { observe: 'response', params })
    .pipe(
      map(response => {
        this.RoutineSoftCopyUploads = [...this.RoutineSoftCopyUploads, ...response.body.items];
        this.RoutineSoftCopyUploadPagination = response.body;
        return this.RoutineSoftCopyUploadPagination;
      })
    ); 
  }
  
  getSelectedRoutineSoftCopyUploadByMaterialTitleIdBaseSchoolIdAndCourseNameId(baseSchoolNameId,courseNameId,RoutineSoftCopyUploadTitleId){
    return this.http.get<RoutineSoftCopyUpload[]>(this.baseUrl + '/reading-material/get-selectedRoutineSoftCopyUploadByMaterialTitleIdBaseSchoolIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&materialTitleId='+RoutineSoftCopyUploadTitleId+'');
  }
  find(id: number) {
    return this.http.get<RoutineSoftCopyUpload>(this.baseUrl + '/routine-softcopy-upload/get-RoutineSoftCopyUploadDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/routine-softcopy-upload/update-RoutineSoftCopyUpload/'+id, model);
  }
  // submit(model: any) {
    
  //   return this.http.post<PostResponse>(this.baseUrl + '/reading-material/save-readingMaterial', model).pipe(
  //     map((ReadingMaterial: PostResponse) => {
  //       if (ReadingMaterial) {
  //         console.log(ReadingMaterial);
  //         return ReadingMaterial;
  //       }
  //     })
  //   );
  // } 
  
  submit(model: any) {
    
    return this.http.post<any>(this.baseUrl + '/routine-softcopy-upload/save-RoutineSoftCopyUpload', model,{
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map((RoutineSoftCopyUpload: any) => {
        if (RoutineSoftCopyUpload) {
          console.log(RoutineSoftCopyUpload);
          return RoutineSoftCopyUpload;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/routine-softcopy-upload/delete-RoutineSoftCopyUpload/'+id);
  }
}
