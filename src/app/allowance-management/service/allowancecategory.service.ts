import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllowanceCategory } from '../models/allowancecategory';
import { SelectedModel } from '../../core/models/selectedModel';
import {IAllowanceCategoryPagination, AllowanceCategoryPagination } from '../models/allowancecategoryPagination'

@Injectable({
  providedIn: 'root'
})
export class AllowanceCategoryService {

  baseUrl = environment.apiUrl;
  countries: AllowanceCategory[] = [];
  AllowanceCategoryPagination = new AllowanceCategoryPagination();
  constructor(private http: HttpClient) { }

  getAllowanceCategoryListByFromRankIdAndToRankId(fromRankId,toRankId){
    return this.http.get<AllowanceCategory[]>(this.baseUrl + '/allowance-category/get-AllowanceCategoryListByFromRankIdAndToRankId?fromRankId='+fromRankId+'&toRankId='+toRankId);
  }
  getCountryByCountryGroupId(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountryByCountryGroup?countryGroupId=' + id);
  }
  getCurrencyByCountryId(id:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/currency-name/get-selectedCurrencyByCountry?countryId=' + id);
  }

  getselectedRank(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/ranks/get-selectedRanks')
  }
  getselectedCountryGroup(){ 
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country-group/get-selectedCountryGroups')
  }

  getselectedCurrencyName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/currency-name/get-selectedCurrencyNames')
  }
  getselectedCountry(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountries')
  }
  getselectedAllowancePercentages(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/allowance-percentage/get-selectedAllowancePercentages')
  }

  getAllowanceCategories(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IAllowanceCategoryPagination>(this.baseUrl + '/allowance-category/get-AllowanceCategorys', { observe: 'response', params })
    .pipe(
      map(response => {
        this.countries = [...this.countries, ...response.body.items];
        this.AllowanceCategoryPagination = response.body;
        return this.AllowanceCategoryPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<AllowanceCategory>(this.baseUrl + '/allowance-category/get-AllowanceCategoryDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/allowance-category/update-AllowanceCategory/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/allowance-category/save-AllowanceCategory', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/allowance-category/delete-AllowanceCategory/'+id);
  }
}
