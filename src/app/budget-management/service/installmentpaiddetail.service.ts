import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IInstallmentPaidDetailPagination,InstallmentPaidDetailPagination } from '../models/installmentpaiddetailPagination';
import { InstallmentPaidDetail } from '../models/installmentpaiddetail';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class InstallmentPaidDetailService {
  baseUrl = environment.apiUrl;
  InstallmentPaidDetails: InstallmentPaidDetail[] = [];
  InstallmentPaidDetailPagination = new InstallmentPaidDetailPagination(); 
  constructor(private http: HttpClient) { }


  getselectedpaymentdetails(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/payment-detail/get-selectedpaymentdetails')
  }

  // getselectedbnabatch(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-batch/get-selectedBnaBatchs')
  // }

  // getselectedexamtype(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-type/get-selectedExamType')
  // }

  // getselectedbnacurriculumtype(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-curriculam-type/get-selectedBnaCurriculamTypes')
  // }

  // getselectedbnasubjectname(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-subject-name/get-selectedBnaSubjectNames')
  // }

  getselectedbaseschools(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/base-School-name/get-selectedSchools')
  }
  getselectedcoursedurationbyschoolname(baseSchoolNameId:number){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-duration/get-selectedCourseDurationBySchoolName?baseSchoolNameId='+baseSchoolNameId)
  }
  
  getselectedcoursename(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseNames')
  }

  // getselectedInstallmentPaidDetailremarks(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-mark-remark/get-selectedExamMarkRemark')
  // }

  // getselectebnaexamschedule(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-exam-schedule/get-selectedBnaExamSchedules')
  // }

  
 

  getInstallmentPaidDetails(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IInstallmentPaidDetailPagination>(this.baseUrl + '/installment-paid-detail/get-installmentpaiddetail', { observe: 'response', params })
    .pipe(
      map(response => {
        this.InstallmentPaidDetails = [...this.InstallmentPaidDetails, ...response.body.items];
        this.InstallmentPaidDetailPagination = response.body;
        return this.InstallmentPaidDetailPagination;
      })
    ); 
  }
  ChangepaymentCompletedStatus(installmentPaidDetailId,paymentCompletedStatus){
    return this.http.get(this.baseUrl + '/installment-paid-detail/change-installmentPaidDetailPaymentCompletedStatus?installmentPaidDetailId='+installmentPaidDetailId+'&paymentCompletedStatus='+paymentCompletedStatus);
  }
  find(id: number) {
    return this.http.get<InstallmentPaidDetail>(this.baseUrl + '/installment-paid-detail/get-installmentpaiddetaildetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/installment-paid-detail/update-installmentpaiddetail/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/installment-paid-detail/save-installmentpaiddetail', model).pipe(
      map((InstallmentPaidDetail: PostResponse) => {
        if (InstallmentPaidDetail) {
          console.log(InstallmentPaidDetail);
          return InstallmentPaidDetail;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/installment-paid-detail/delete-installmentpaiddetail/'+id);
  }
}
