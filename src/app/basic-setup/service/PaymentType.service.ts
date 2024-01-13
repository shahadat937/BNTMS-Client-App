import { Injectable } from '@angular/core';
import { IPaymentTypePagination, PaymentTypePagination} from '../models/PaymentTypePagination';
import { PostResponse } from '../../core/models/PostResponse';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaymentType } from '../models/PaymentType';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  baseUrl = environment.apiUrl;
  PaymentType: PaymentType[] = [];
  PaymentTypePagination = new PaymentTypePagination();
  id: number;
  constructor(private http: HttpClient) { }

  getPaymentType(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    //params =params.append('searchText',searchText.toString());

    return this.http.get<IPaymentTypePagination>(this.baseUrl + '/payment-type/get-paymentTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.PaymentType = [...this.PaymentType, ...response.body.items];
        this.PaymentTypePagination = response.body;
        return this.PaymentTypePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<PaymentType>(this.baseUrl + '/payment-type/get-paymentTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/payment-type/update-paymentType/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/payment-type/save-paymentType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/payment-type/delete-paymentType/'+id);
  }
}
