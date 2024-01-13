import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFamilyInfoPagination,FamilyInfoPagination } from '../models/familyinfoPagination';
import { FamilyInfo } from '../models/familyinfo';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class FamilyInfoService {
  baseUrl = environment.apiUrl;
  FamilyInfos: FamilyInfo[] = [];
  FamilyInfoPagination = new FamilyInfoPagination(); 
  constructor(private http: HttpClient) { }
  
  
  getfamilyInfoListByPno(traineeId){
    return this.http.get<FamilyInfo[]>(this.baseUrl + '/family-info/get-familyInfoListByPno?traineeId='+traineeId);
  }
  getselecteddivision(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/division/get-selectedDivisions')
  }

  getdistrictbydivision(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/district/get-selectedDistrictByDivisions?divisionId=' + id)
  }

  getthanaByDistrict(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/thana/getSelectedThanaByDistrict?districtid=' + id);
  }

  getselectedgender(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/gender/get-selectedGender')
  }

  getselectednationality(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/nationality/get-selectedNationalities')
  }
  getselectedreligion(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/religion/get-selectedReligions')
  }
  getcastebyreligion(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Caste/get-selectedCasteByReligion?religionId='+id)
  }
  getselectedPno(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/trainee-bio-data-general-info/get-selectedTraineeByPno')
  }
  getselectedrelationTypes(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/relation-type/get-selectedrelationTypes')
  }
 

  getFamilyInfos(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<IFamilyInfoPagination>(this.baseUrl + '/family-info/get-FamilyInfos', { observe: 'response', params })
    .pipe(
      map(response => {
        this.FamilyInfos = [...this.FamilyInfos, ...response.body.items];
        this.FamilyInfoPagination = response.body;
        return this.FamilyInfoPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<FamilyInfo>(this.baseUrl + '/family-info/get-FamilyInfoDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/family-info/update-FamilyInfo/'+id, model);
  }
  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/family-info/save-FamilyInfo', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/family-info/delete-FamilyInfo/'+id);
  }
}
