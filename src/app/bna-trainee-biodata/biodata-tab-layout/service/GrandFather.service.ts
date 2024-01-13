import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GrandFather } from '../models/GrandFather';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class GrandFatherService {
  baseUrl = environment.apiUrl;
  GrandFathers: GrandFather[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedgrandfathertype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/grand-father-type/get-selectedGrandFatherType')
  }

  getselectedoccupation(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/occupation/get-selectedOccupation')
  }

  getselectednationality(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/nationality/get-selectedNationalities')
  }

  getdatabytraineeid(id: number){
    return this.http.get<GrandFather[]>(this.baseUrl + '/grand-father/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<GrandFather>(this.baseUrl + '/grand-father/get-grandFatherDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/grand-father/update-grandFather/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/grand-father/save-grandFather', model).pipe(
      map((GrandFather: PostResponse) => {
        if (GrandFather) {
          console.log(GrandFather);
          return GrandFather;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/grand-father/delete-grandFather/'+id);
  }
}
