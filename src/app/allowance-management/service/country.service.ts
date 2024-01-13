import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import { SelectedModel } from '../../core/models/selectedModel';
import {ICountryPagination, CountryPagination } from '../models/countryPagination'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl = environment.apiUrl;
  countries: Country[] = [];
  countryPagination = new CountryPagination();
  constructor(private http: HttpClient) { }

  getselectedCountryGroup(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country-group/get-selectedCountryGroups')
  }

  getselectedCurrencyName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/currency-name/get-selectedCurrencyNames')
  }

  getCountries(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<ICountryPagination>(this.baseUrl + '/country/get-countries', { observe: 'response', params })
    .pipe(
      map(response => {
        this.countries = [...this.countries, ...response.body.items];
        this.countryPagination = response.body;
        return this.countryPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<Country>(this.baseUrl + '/country/get-countryDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/country/update-country/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/country/save-country', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/country/delete-country/'+id);
  }
}
