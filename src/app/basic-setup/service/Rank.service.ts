import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IRankPagination, RankPagination } from '../models/RankPagination'
import { Rank } from '../models/Rank';
import { map } from 'rxjs';
import { AllowanceCategory } from 'src/app/allowance-management/models/allowancecategory';
@Injectable({
  providedIn: 'root'
})
export class RankService {
  baseUrl = environment.apiUrl;
  Ranks: Rank[] = [];
  RankPagination = new RankPagination();
  constructor(private http: HttpClient) { }

  getRanks(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IRankPagination>(this.baseUrl + '/ranks/get-ranks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Ranks = [...this.Ranks, ...response.body.items];
        this.RankPagination = response.body;
        return this.RankPagination;
      })
    );
   
  }
  // getAllowanceCategoryListByFromRankIdAndToRankId(fromRankId,toRankId){
  //   return this.http.get<AllowanceCategory[]>(this.baseUrl + '/allowance-category/get-AllowanceCategoryListByFromRankIdAndToRankId?fromRankId='+fromRankId+'&toRankId='+toRankId);
  // }

  find(id: number) {
    return this.http.get<Rank>(this.baseUrl + '/ranks/get-rankDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/ranks/update-rank/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/ranks/save-rank', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/ranks/delete-rank/'+id);
  }

}
