import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPresentBilletPagination,PresentBilletPagination } from '../models/PresentBilletPagination'
import { PresentBillet } from '../models/PresentBillet';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PresentBilletService {
  baseUrl = environment.apiUrl;
  PresentBillets: PresentBillet[] = [];
  PresentBilletPagination = new PresentBilletPagination();
  constructor(private http: HttpClient) { }

  getPresentBillets(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IPresentBilletPagination>(this.baseUrl + '/present-billet/get-presentBillets', { observe: 'response', params })
    .pipe(
      map(response => {
        this.PresentBillets = [...this.PresentBillets, ...response.body.items];
        this.PresentBilletPagination = response.body;
        return this.PresentBilletPagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<PresentBillet>(this.baseUrl + '/present-billet/get-presentBilletDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/present-billet/update-presentBillet/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/present-billet/save-presentBillet', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/present-billet/delete-presentBillet/'+id);
  }

}
