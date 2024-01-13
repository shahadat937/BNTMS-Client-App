import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document } from '../models/document';
import { SelectedModel } from '../../core/models/selectedModel';
import {IDocumentPagination, DocumentPagination } from '../models/documentPagination'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  baseUrl = environment.apiUrl;
  countries: Document[] = [];
  DocumentPagination = new DocumentPagination();
  constructor(private http: HttpClient) { }

  getSelectedInterServiceCourseDocType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/inter-service-course-doc-type/get-selectedInterServiceCourseDocType')
  }
  
  // getselectedCourseNameByCourseTypeIdFromDuration(courseTypeId){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseNameByCourseTypeIdFromDuration?courseTypeId=' + courseTypeId);
  // }
  getCourseByType(courseTypeId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByType?courseTypeId=' + courseTypeId);
  }
  getDocuments(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IDocumentPagination>(this.baseUrl + '/document/get-Documents', { observe: 'response', params })
    .pipe(
      map(response => {
        this.countries = [...this.countries, ...response.body.items];
        this.DocumentPagination = response.body;
        return this.DocumentPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<Document>(this.baseUrl + '/document/get-DocumentDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/document/update-Document/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/document/save-Document', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/document/delete-Document/'+id);
  }
}
