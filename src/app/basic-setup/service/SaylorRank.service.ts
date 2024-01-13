import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaylorRank } from '../models/SaylorRank';
import {ISaylorRankPagination, SaylorRankPagination } from '../models/SaylorRankPagination'

@Injectable({
  providedIn: 'root'
})
export class SaylorRankService {

  baseUrl = environment.apiUrl;
  SaylorRanks: SaylorRank[] = [];
  SaylorRankPagination = new SaylorRankPagination();
  constructor(private http: HttpClient) { }

  getSaylorRanks(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<ISaylorRankPagination>(this.baseUrl + '/saylor-rank/get-SaylorRanks', { observe: 'response', params })
    .pipe(
      map(response => {
        this.SaylorRanks = [...this.SaylorRanks, ...response.body.items];
        this.SaylorRankPagination = response.body;
        return this.SaylorRankPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<SaylorRank>(this.baseUrl + '/saylor-rank/get-SaylorRankDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/saylor-rank/update-SaylorRank/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/saylor-rank/save-SaylorRank', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/saylor-rank/delete-SaylorRank/'+id);
  }
}
