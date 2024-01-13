import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParentRelative } from '../models/ParentRelative';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class ParentRelativeService {
  baseUrl = environment.apiUrl;
  ParentRelatives: ParentRelative[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedrelationtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/relation-type/get-selectedrelationTypes')
  }

  getselectedmaritialstatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/marital-status/get-selectedMaritialStatuses')
  }

  getselectednationality(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/nationality/get-selectedNationalities')
  }

  getselectedreligion(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/religion/get-selectedReligions')
  }

  getselectedcaste(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Caste/get-selectedCastes')
  }

  getselectedoccupation(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/occupation/get-selectedOccupation')
  }

  getselecteddivision(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/division/get-selectedDivisions')
  }

  getselecteddistrict(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/district/get-selectedDistricts')
  }

  getselectedthana(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/thana/get-selectedThanas')
  }

  getselecteddefensetype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/defense-type/get-selectedDefenseTypes')
  }

  getselectedrank(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/ranks/get-selectedRanks')
  }

  getcastebyreligion(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Caste/get-selectedCasteByReligion?religionId='+id)
  }

  getthanaByDistrict(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/thana/getSelectedThanaByDistrict?districtid=' + id);
  }

  getdistrictbydivision(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/district/get-selectedDistrictByDivisions?divisionId=' + id)
  }

  

  getdatabytraineeid(id: number){
    return this.http.get<ParentRelative[]>(this.baseUrl + '/parent-relative/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.ParentRelatives = [...this.ParentRelatives, ...response.body.items];        
        //response = this.ParentRelatives;
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<ParentRelative>(this.baseUrl + '/parent-relative/get-parentRelativeDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/parent-relative/update-parentRelative/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/parent-relative/save-parentRelative/', model).pipe(
      map((ParentRelative: PostResponse) => {
        if (ParentRelative) {
          console.log(ParentRelative);
          return ParentRelative;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/parent-relative/delete-parentRelative/'+id);
  }
}
