import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BNABatch } from '../models/bNABatch';
import {IBNABatchPagination, BNABatchPagination } from '../models/bNABatchPagination'

@Injectable({
  providedIn: 'root'
})
export class BNABatchService {

  baseUrl = environment.apiUrl;
  bNABatchs: BNABatch[] = [];
  bNABatchPagination = new BNABatchPagination();
  constructor(private http: HttpClient) { }

  getBNABatchs(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<IBNABatchPagination>(this.baseUrl + '/bna-batch/get-bnaBatchs', { observe: 'response', params })
    .pipe(
      map(response => {
        this.bNABatchs = [...this.bNABatchs, ...response.body.items];
        this.bNABatchPagination = response.body;
        return this.bNABatchPagination;
      })
    );
  }
  find(id: number) {
    return this.http.get<BNABatch>(this.baseUrl + '/bna-batch/get-bnaBatchDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-batch/update-bnaBatch/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-batch/save-bnaBatch', model);
  }
  delete(id){
    return this.http.delete(this.baseUrl + '/bna-batch/delete-bnaBatch/'+id);
  }
}
