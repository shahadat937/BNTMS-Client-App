import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IComplexionPagination,ComplexionPagination } from '../models/complexionPagination';
import { Complexion } from '../models/complexion';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplexionService {
  baseUrl = environment.apiUrl;
  complexions: Complexion[] = [];
  complexionPagination = new ComplexionPagination();
  constructor(private http: HttpClient) { }

  getComplexions(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IComplexionPagination>(this.baseUrl + '/complexion/get-complexions', { observe: 'response', params })
    .pipe(
      map(response => {
        this.complexions = [...this.complexions, ...response.body.items];
        this.complexionPagination = response.body;
        return this.complexionPagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Complexion>(this.baseUrl + '/complexion/get-complexionDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/complexion/update-complexion/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/complexion/save-complexion', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/complexion/delete-complexion/'+id);
  }
}
