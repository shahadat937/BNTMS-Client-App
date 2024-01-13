import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IReadingMaterialTitlePagination,ReadingMaterialTitlePagination } from '../models/ReadingMaterialTitlePagination';
import { ReadingMaterialTitle } from '../models/ReadingMaterialTitle';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class ReadingMaterialTitleService {
  baseUrl = environment.apiUrl;
  ReadingMaterialTitles: ReadingMaterialTitle[] = [];
  ReadingMaterialTitlePagination = new ReadingMaterialTitlePagination(); 
  constructor(private http: HttpClient) { }

  getReadingMaterialTitles(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IReadingMaterialTitlePagination>(this.baseUrl + '/reading-material-title/get-ReadingMaterialTitles', { observe: 'response', params })
    .pipe(
      map(response => {
        this.ReadingMaterialTitles = [...this.ReadingMaterialTitles, ...response.body.items];
        this.ReadingMaterialTitlePagination = response.body;
        return this.ReadingMaterialTitlePagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<ReadingMaterialTitle>(this.baseUrl + '/reading-material-title/get-ReadingMaterialTitleDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/reading-material-title/update-ReadingMaterialTitle/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/reading-material-title/save-ReadingMaterialTitle', model).pipe(
      map((ReadingMaterialTitle: PostResponse) => {
        if (ReadingMaterialTitle) {
          console.log(ReadingMaterialTitle);
          return ReadingMaterialTitle;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/reading-material-title/delete-ReadingMaterialTitle/'+id);
  }
}
