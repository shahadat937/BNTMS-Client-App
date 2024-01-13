import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CovidVaccine } from '../models/CovidVaccine';
import { ICovidVaccinePagination,CovidVaccinePagination } from '../models/CovidVaccinePagination';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class CovidVaccineService {
  baseUrl = environment.apiUrl;
  CovidVaccines: CovidVaccine[] = [];
  CovidVaccinePagination = new CovidVaccinePagination();
  constructor(private http: HttpClient) { }


  // getSelectedCovidVaccineType(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/social-media-type/get-selectedSocialMediaType')
  // }


  getCovidVaccineByTraineeId(id: number){
    return this.http.get<CovidVaccine[]>(this.baseUrl + '/covid-vaccine/get-CovidVaccineListByTraineeId?traineeId='+id).pipe(
      map(response => {
        return response;
      })
    );
  }
 
  find(id: number) {
    return this.http.get<CovidVaccine>(this.baseUrl + '/covid-vaccine/get-CovidVaccineDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/covid-vaccine/update-CovidVaccine/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/covid-vaccine/save-CovidVaccine', model).pipe(
      map((CovidVaccine: PostResponse) => {
        if (CovidVaccine) {
          console.log(CovidVaccine);
          return CovidVaccine;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/covid-vaccine/delete-CovidVaccine/'+id);
  }
}
