import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Allowance } from '../models/allowance';
import { SelectedModel } from '../../core/models/selectedModel';
import {IAllowancePagination, AllowancePagination } from '../models/allowancePagination'

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {

  baseUrl = environment.apiUrl;
  countries: Allowance[] = [];
  AllowancePagination = new AllowancePagination();
  constructor(private http: HttpClient) { }

  getselectedCountry(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountries')
  }
  getselectedRank(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/ranks/get-selectedRanks')
  }
  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }
  getselectedAllowanceCategory(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/allowance-category/get-selectedAllowanceCategorys')
  }
  getSelectedAllowanceNameByFromRankIdAndToRankId(fromRankId:number,toRankId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/allowance-category/get-selectedAllowanceNameByFromRankIdAndToRankId?fromRankId='+fromRankId+'&toRankId='+toRankId)
   }


  getAllowances(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IAllowancePagination>(this.baseUrl + '/allowance/get-Allowances', { observe: 'response', params })
    .pipe(
      map(response => {
        this.countries = [...this.countries, ...response.body.items];
        this.AllowancePagination = response.body;
        return this.AllowancePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<Allowance>(this.baseUrl + '/allowance/get-AllowanceDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/allowance/update-Allowance/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/allowance/save-Allowance', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/allowance/delete-Allowance/'+id);
  }
}
