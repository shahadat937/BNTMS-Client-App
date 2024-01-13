import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISocialMediaTypePagination,SocialMediaTypePagination } from '../models/SocialMediaTypePagination';
import { SocialMediaType } from '../models/SocialMediaType';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialmediaTypeService {
  baseUrl = environment.apiUrl;
  socialmediaTypes: SocialMediaType[] = [];
  socialmediaTypePagination = new SocialMediaTypePagination();
  constructor(private http: HttpClient) { }

  getSocialMediaTypes(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<ISocialMediaTypePagination>(this.baseUrl + '/social-media-type/get-socialMediaTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.socialmediaTypes = [...this.socialmediaTypes, ...response.body.items];
        this.socialmediaTypePagination = response.body;
        return this.socialmediaTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<SocialMediaType>(this.baseUrl + '/social-media-type/get-socialMediaTypeDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/social-media-type/update-socialMediaType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/social-media-type/save-socialMediaType', model);
  }  
  delete(id:number){ 
    return this.http.delete(this.baseUrl + '/social-media-type/delete-socialMediaType/'+id);
  }
}
