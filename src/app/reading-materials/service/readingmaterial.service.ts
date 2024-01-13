import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IReadingMaterialPagination,ReadingMaterialPagination } from '../models/readingmaterialPagination';
import { ReadingMaterial } from '../models/readingmaterial';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class ReadingMaterialService {
  baseUrl = environment.apiUrl;
  ReadingMaterials: ReadingMaterial[] = [];
  ReadingMaterialPagination = new ReadingMaterialPagination(); 
  constructor(private http: HttpClient) { }

  getSelectedReadingMaterial(){
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
 

  getReadingMaterialsBySchool(pageNumber, pageSize,searchText, baseSchoolNameId) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('baseSchoolNameId', baseSchoolNameId.toString());
   
    return this.http.get<IReadingMaterialPagination>(this.baseUrl + '/reading-material/get-readingMaterials', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ReadingMaterials = [...this.ReadingMaterials, ...response.body.items];
        this.ReadingMaterialPagination = response.body;
        return this.ReadingMaterialPagination;
      })
    ); 
  }
  
  getSelectedReadingMaterialByMaterialTitleIdBaseSchoolIdAndCourseNameId(baseSchoolNameId,courseNameId,readingMaterialTitleId){
    return this.http.get<ReadingMaterial[]>(this.baseUrl + '/reading-material/get-selectedReadingMaterialByMaterialTitleIdBaseSchoolIdAndCourseNameId?baseSchoolNameId='+baseSchoolNameId+'&courseNameId='+courseNameId+'&materialTitleId='+readingMaterialTitleId+'');
  }
  find(id: number) {
    return this.http.get<ReadingMaterial>(this.baseUrl + '/reading-material/get-readingMaterialDetail/' + id);
  }
  update(id: number,model: any) {
    
    return this.http.put(this.baseUrl + '/reading-material/update-readingMaterial/'+id, model);
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
    
    return this.http.post<any>(this.baseUrl + '/reading-material/save-readingMaterial', model,{
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map((ReadingMaterial: any) => {
        if (ReadingMaterial) {
          console.log(ReadingMaterial);
          return ReadingMaterial;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/reading-material/delete-readingMaterial/'+id);
  }
}
