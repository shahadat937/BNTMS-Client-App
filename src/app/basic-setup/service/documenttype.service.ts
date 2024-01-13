import { Injectable } from '@angular/core';
import { IDocumentTypePagination, DocumentTypePagination} from '../models/documenttypePagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { DocumentType } from '../models/documenttype';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  baseUrl = environment.apiUrl;
  DocumentType: DocumentType[] = [];
  DocumentTypePagination = new DocumentTypePagination();
  id: number;
  constructor(private http: HttpClient) { }

  getDocumentType(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IDocumentTypePagination>(this.baseUrl + '/document-type/get-documentTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.DocumentType = [...this.DocumentType, ...response.body.items];
        this.DocumentTypePagination = response.body;
        return this.DocumentTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<DocumentType>(this.baseUrl + '/document-type/get-documentTypeDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/document-type/update-documentType/'+id, model);
  }
  submit(model: any) {  
    return this.http.post<PostResponse>(this.baseUrl + '/document-type/save-documentType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/document-type/delete-documentType/'+id);
  }
}
