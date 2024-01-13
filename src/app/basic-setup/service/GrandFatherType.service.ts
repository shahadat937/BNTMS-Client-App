import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGrandFatherTypePagination,GrandFatherTypePagination } from '../models/GrandFatherTypePagination'
import { GrandFatherType } from '../models/GrandFatherType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GrandFatherTypeService {
  baseUrl = environment.apiUrl;
  GrandFatherTypes: GrandFatherType[] = [];
  GrandFatherTypePagination = new GrandFatherTypePagination();
  constructor(private http: HttpClient) { }

  getGrandFatherTypes(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IGrandFatherTypePagination>(this.baseUrl + '/grand-father-type/get-grandFatherTypes', { observe: 'response', params })
    .pipe(
      map(response => {
        this.GrandFatherTypes = [...this.GrandFatherTypes, ...response.body.items];
        this.GrandFatherTypePagination = response.body;
        return this.GrandFatherTypePagination;
      })
    );
   
  }

  find(id: number) {
    return this.http.get<GrandFatherType>(this.baseUrl + '/grand-father-type/get-grandFatherTypeDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/grand-father-type/update-grandFatherType/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/grand-father-type/save-grandFatherType', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/grand-father-type/delete-grandFatherType/'+id);
  }

}
