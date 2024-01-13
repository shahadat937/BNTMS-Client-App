import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { environment } from 'src/environments/environment';
import { BIODataGeneralInfo } from '../models/BIODataGeneralInfo';
import {IBIODataGeneralInfoPagination, BIODataGeneralInfoPagination } from '../models/BIODataGeneralInfoPagination'

@Injectable({
  providedIn: 'root'
})
export class BIODataGeneralInfoService {

  baseUrl = environment.apiUrl;
  BIODataGeneralInfos: BIODataGeneralInfo[] = [];
  BIODataGeneralInfoPagination = new BIODataGeneralInfoPagination();
  constructor(private http: HttpClient) { }
  
  postFile(fileToUpload:File){
    const endpoint= '/src/assets/img';
    const formData:FormData=new FormData();
    formData.append('bnaPhotoUrl', fileToUpload, fileToUpload.name);
    return this.http
    .post(endpoint,formData);
  }

  getBIODataGeneralInfos(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IBIODataGeneralInfoPagination>(this.baseUrl + '/trainee-bio-data-general-info/get-sailors', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BIODataGeneralInfos = [...this.BIODataGeneralInfos, ...response.body.items];
        this.BIODataGeneralInfoPagination = response.body;
        return this.BIODataGeneralInfoPagination;
      })
    );
  }

  //dropdown data 

  getselectedSaylorBranch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/saylor-branch/get-selectedSaylorBranchs')
  }
  getselectedSaylorRank(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/saylor-rank/get-selectedSaylorRanks')
  }
  getselectedSaylorSubBranch(saylorBranchId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/saylor-sub-branch/get-selectedSubBranchBySaylorBranchId?saylorBranchId='+saylorBranchId)
  }
  getselectedhaircolor(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/hair-color/get-selectedHairColor')
  }

  getselectedrank(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/ranks/get-selectedRanks')
  }
  getselectedheight(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/height/get-selectedHeight')
  }

  getselectedweight(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/weights/get-selectedWeights')
  }
  getselectedcolorofeye(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/color-of-eye/get-selectedColorOfEyes')
  }

  getselectedbloodgroup(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/blood-group/get-selectedBloodGroups')
  }
  getselectedreligion(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/religion/get-selectedReligions')
  }

  getselectedcaste(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Caste/get-selectedCastes')
  }

  getselectedgender(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/gender/get-selectedGender')
  }

  getselectedmaritialstatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/marital-status/get-selectedMaritialStatuses')
  }

  getcastebyreligion(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Caste/get-selectedCasteByReligion?religionId='+id)
  }
  
  find(id: number) {
    return this.http.get<BIODataGeneralInfo>(this.baseUrl + '/trainee-bio-data-general-info/get-traineedetail/' + id);
  }
   
  findTraineeDetails(id: number) {
    return this.http.get<BIODataGeneralInfo>(this.baseUrl + '/trainee-bio-data-general-info/get-traineedetails/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-bio-data-general-info/update-traineeBioDataGeneralInfo/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/trainee-bio-data-general-info/save-traineeBioDataGeneralInfo', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/trainee-bio-data-general-info/delete-traineeBioDataGeneralInfo/'+id);
  }
}
