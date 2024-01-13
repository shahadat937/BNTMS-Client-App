import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBNAPromotionStatusPagination,BNAPromotionStatusPagination } from '../models/BNAPromotionStatusPagination'
import { BNAPromotionStatus } from '../models/BNAPromotionStatus';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BNAPromotionStatusService {
  baseUrl = environment.apiUrl;
  BNAPromotionStatuss: BNAPromotionStatus[] = [];
  BNAPromotionStatusPagination = new BNAPromotionStatusPagination();
  constructor(private http: HttpClient) { }

  getBNAPromotionStatuss(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IBNAPromotionStatusPagination>(this.baseUrl + '/bna-promotion-status/get-bnaPromotionStatuses', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAPromotionStatuss = [...this.BNAPromotionStatuss, ...response.body.items];
        this.BNAPromotionStatusPagination = response.body;
        return this.BNAPromotionStatusPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<BNAPromotionStatus>(this.baseUrl + '/bna-promotion-status/get-bnaPromotionStatusDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-promotion-status/update-bnaPromotionStatus/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-promotion-status/save-bnaPromotionStatus', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-promotion-status/delete-bnaPromotionStatus/'+id);
  }

}
