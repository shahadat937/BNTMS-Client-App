import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllowancePercentage } from '../models/allowancepercentage';
import { SelectedModel } from '../../core/models/selectedModel';
import {IAllowancePercentagePagination, AllowancePercentagePagination } from '../models/allowancepercentagePagination'

@Injectable({
  providedIn: 'root'
})
export class AllowancePercentageService {

  baseUrl = environment.apiUrl;
  countries: AllowancePercentage[] = [];
  AllowancePercentagePagination = new AllowancePercentagePagination();
  constructor(private http: HttpClient) { }


  getAllowancePercentages(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IAllowancePercentagePagination>(this.baseUrl + '/allowance-percentage/get-AllowancePercentages', { observe: 'response', params })
    .pipe(
      map(response => {
        this.countries = [...this.countries, ...response.body.items];
        this.AllowancePercentagePagination = response.body;
        return this.AllowancePercentagePagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<AllowancePercentage>(this.baseUrl + '/allowance-percentage/get-AllowancePercentageDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/allowance-percentage/update-AllowancePercentage/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/allowance-percentage/save-AllowancePercentage', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/allowance-percentage/delete-AllowancePercentage/'+id);
  }
}
