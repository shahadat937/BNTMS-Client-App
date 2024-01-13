import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITraineeSectionSelectionPagination,TraineeSectionSelectionPagination } from '../models/TraineeSectionSelectionPagination';
import { TraineeSectionSelection } from '../models/TraineeSectionSelection';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class TraineeSectionSelectionService {
  baseUrl = environment.apiUrl;
  TraineeSectionSelections: TraineeSectionSelection[] = [];
  TraineeSectionSelectionPagination = new TraineeSectionSelectionPagination(); 
  constructor(private http: HttpClient) { }

  getselectedbnabatch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-batch/get-selectedBnaBatchs')
  }

  getselectedbnasemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getselectedbnaclasssectionselection(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-class-section-selection/get-selectedBnaClassSectionSelections')
  }

  getselectedbnacurriculamtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-curriculam-type/get-selectedBnaCurriculamTypes')
  }
 

  getTraineeSectionSelections(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<ITraineeSectionSelectionPagination>(this.baseUrl + '/trainee-section-selection/get-traineeSectionSelections', { observe: 'response', params })
    .pipe(
      map(response => {
        this.TraineeSectionSelections = [...this.TraineeSectionSelections, ...response.body.items];
        this.TraineeSectionSelectionPagination = response.body;
        return this.TraineeSectionSelectionPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<TraineeSectionSelection>(this.baseUrl + '/trainee-section-selection/get-traineeSectionSelectionDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-section-selection/update-traineeSectionSelection/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/trainee-section-selection/save-traineeSectionSelection', model).pipe(
      map((TraineeSectionSelection: PostResponse) => {
        if (TraineeSectionSelection) {
          console.log(TraineeSectionSelection);
          return TraineeSectionSelection;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-section-selection/delete-traineeSectionSelection/'+id);
  }
}
