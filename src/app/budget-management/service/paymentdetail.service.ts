import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPaymentDetailPagination,PaymentDetailPagination } from '../models/paymentdetailPagination';
import { PaymentDetail } from '../models/paymentdetail';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  baseUrl = environment.apiUrl;
  PaymentDetails: PaymentDetail[] = [];
  PaymentDetailPagination = new PaymentDetailPagination(); 
  constructor(private http: HttpClient) { }


  // getselectedbnasemester(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-semester/get-selectedBnaSemesters')
  // }

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

  // getselectedpaymentdetailremarks(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/exam-mark-remark/get-selectedExamMarkRemark')
  // }

  // getselectebnaexamschedule(){
  //   return this.http.get<SelectedModel[]>(this.baseUrl + '/bna-exam-schedule/get-selectedBnaExamSchedules')
  // }

  
 

  getPaymentDetails(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString()); 
   
    return this.http.get<IPaymentDetailPagination>(this.baseUrl + '/payment-detail/get-paymentdetails', { observe: 'response', params })
    .pipe(
      map(response => {
        this.PaymentDetails = [...this.PaymentDetails, ...response.body.items];
        this.PaymentDetailPagination = response.body;
        return this.PaymentDetailPagination;
      })
    ); 
  }
  
  find(id: number) {
    return this.http.get<PaymentDetail>(this.baseUrl + '/payment-detail/get-paymentdetailsdetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/payment-detail/update-paymentdetail/'+id, model);
  }
  submit(model: any) {
    
    return this.http.post<PostResponse>(this.baseUrl + '/payment-detail/save-paymentdetail', model).pipe(
      map((PaymentDetail: PostResponse) => {
        if (PaymentDetail) {
          console.log(PaymentDetail);
          return PaymentDetail;
        }
      })
    );
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/payment-detail/delete-paymentdetail/'+id);
  }
}
