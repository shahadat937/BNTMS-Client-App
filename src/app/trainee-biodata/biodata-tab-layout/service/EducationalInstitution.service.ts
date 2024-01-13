import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EducationalInstitution } from '../models/EducationalInstitution';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class EducationalInstitutionService {
  baseUrl = environment.apiUrl;
  EducationalInstitutions: EducationalInstitution[] = [];
  constructor(private http: HttpClient) { }


  getselecteddistrict(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/district/get-selectedDistricts')
  }

  getselectedthana(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/thana/get-selectedThanas')
  }

  getthanaByDistrict(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/thana/getSelectedThanaByDistrict?districtid=' + id);
  }

  getdatabytraineeid(id: number){
    return this.http.get<EducationalInstitution[]>(this.baseUrl + '/educational-institution/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }



  find(id: number) {
    return this.http.get<EducationalInstitution>(this.baseUrl + '/educational-institution/get-educationalInstitutionDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/educational-institution/update-educationalInstitution/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/educational-institution/save-educationalInstitution', model).pipe(
      map((EducationalInstitution: PostResponse) => {
        if (EducationalInstitution) {
          console.log(EducationalInstitution);
          return EducationalInstitution;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/educational-institution/delete-educationalInstitution/'+id);
  }
}
