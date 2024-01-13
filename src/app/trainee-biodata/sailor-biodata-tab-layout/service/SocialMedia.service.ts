import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SocialMedia } from '../models/SocialMedia';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {
  baseUrl = environment.apiUrl;
  SocialMedias: SocialMedia[] = [];
  constructor(private http: HttpClient) { }


  getSelectedSocialMediaType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/social-media-type/get-selectedSocialMediaType')
  }


  getSocialMediaByTraineeId(id: number){
    return this.http.get<SocialMedia[]>(this.baseUrl + '/social-media/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

 
  find(id: number) {
    return this.http.get<SocialMedia>(this.baseUrl + '/social-media/get-socialMediaDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/social-media/update-socialMedia/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/social-media/save-socialMedia', model).pipe(
      map((SocialMedia: PostResponse) => {
        if (SocialMedia) {
          console.log(SocialMedia);
          return SocialMedia;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/social-media/delete-socialMedia/'+id);
  }
}
