import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TraineeBIODataOther } from '../models/TraineeBIODataOther';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class TraineeBIODataOtherService {
  baseUrl = environment.apiUrl;
  TraineeBIODataOthers: TraineeBIODataOther[] = [];
  constructor(private http: HttpClient) { }

  getselectednationality(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/nationality/get-selectedNationalities')
  }

  getselectedbnacurriculumtype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-curriculam-type/get-selectedBnaCurriculamTypes')
  }

  getselectedpresentbillet(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/present-billet/get-selectedPresentBillets')
  }

  getselectedBnaInstructorType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-instructor-type/get-selectedBnaInstructorTypes')
  }

  getselectedFailurestatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/failure-status/get-selectedFailureStatus')
  }

  getselectedCourseName(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  getSelectedBnaClassSectionSelection(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-class-section-selection/get-selectedBnaClassSectionSelections')
  }

  getselectedBnaPromotionStatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-promotion-status/get-selectedBnaPromotionStatuses')
  }

  getselectedMaritalStatus(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/marital-status/get-selectedMaritialStatuses')
  }

  getselectedCountry(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/country/get-selectedCountries')
  }

  getselectedCaste(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/Caste/get-selectedCastes')
  }

  getselectedReligion(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/religion/get-selectedReligions')
  }

  getselectedBloodGroup(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/blood-group/get-selectedBloodGroups')
  }
  // getselectedboard(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/Board/getselectedboard')

  getselectedbnasemester(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  }

  getselectedutofficertype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/ut-officer-type/get-selectedUtOfficerTypes')
  }

  getselectedUtofficerCategory(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/ut-officer-category/get-selectedUtOfficerCategories')
  }

  getselectedbnaservicetype(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-service-type/get-selectedBnaServiceTypes')
  }

  getselectedcomplexions(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/complexion/get-selectedComplexions')
  }

  getselectedbranch(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/branch/get-selectedBranchs')
  }

  getselectedheight(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/height/get-selectedHeight')
  }

  getselectedweight(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/weights/get-selectedWeights')
  }

  getselectedcolorofeye(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/color-of-eye/get-selectedColorOfEyes')
  }

  


  getdatabytraineeid(id: number){
    return this.http.get<TraineeBIODataOther[]>(this.baseUrl + '/trainee-bio-data-other/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<TraineeBIODataOther>(this.baseUrl + '/trainee-bio-data-other/get-traineeBiodataOtherDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/trainee-bio-data-other/update-traineeBiodataOther/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/trainee-bio-data-other/save-traineeBiodataOther', model).pipe(
      map((TraineeBIODataOther: PostResponse) => {
        if (TraineeBIODataOther) {
          console.log(TraineeBIODataOther);
          return TraineeBIODataOther;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/trainee-bio-data-other/delete-traineeBiodataOther/'+id);
  }
}
