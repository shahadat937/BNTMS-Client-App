import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBNAClassSectionSelectionPagination,BNAClassSectionSelectionPagination} from '../models/BNAClassSectionSelectionPagination';
import { BNAClassSectionSelection } from '../models/BNAClassSectionSelection';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BNAClassSectionSelectionService {
  baseUrl = environment.apiUrl;
  BNAClassSectionSelections: BNAClassSectionSelection[] = [];
  BNAClassSectionSelectionPagination = new BNAClassSectionSelectionPagination();
  constructor(private http: HttpClient) { }

  getBNAClassSectionSelections(pageNumber, pageSize,searchText) {

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IBNAClassSectionSelectionPagination>(this.baseUrl + '/bna-class-section-selection/get-bnaClassSectionSelections', { observe: 'response', params })
    .pipe(
      map(response => {
        this.BNAClassSectionSelections = [...this.BNAClassSectionSelections, ...response.body.items];
        this.BNAClassSectionSelectionPagination = response.body;
        return this.BNAClassSectionSelectionPagination;
      })
    );  
  }
  find(id: number) {
    return this.http.get<BNAClassSectionSelection>(this.baseUrl + '/bna-class-section-selection/get-bnaClassSectionSelectionDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/bna-class-section-selection/update-bnaClassSectionSelection/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/bna-class-section-selection/save-bnaClassSectionSelection', model);
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/bna-class-section-selection/delete-bnaClassSectionSelection/'+id);
  }
}
 