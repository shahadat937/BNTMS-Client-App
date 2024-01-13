import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INotificationPagination,NotificationPagination } from '../models/notificationPagination';
import { Notification } from '../models/notification';
import { SelectedModel } from '../../core/models/selectedModel';
import { map } from 'rxjs';
import { PostResponse } from 'src/app/core/models/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.apiUrl;
  Notifications: Notification[] = [];
  NotificationPagination = new NotificationPagination(); 
  constructor(private http: HttpClient) { }

  getCourseByBaseSchoolNameId(baseSchoolNameId){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/course-name/get-selectedCourseByBaseNameId?baseSchoolNameId='+baseSchoolNameId)
  }
  

  getNotificationsBySchool(userRole,senderId,reciverId){
    return this.http.get<Notification[]>(this.baseUrl + '/notification/get-notificationsById?userRole='+userRole+'&senderId='+senderId+'&reciverId='+reciverId)
  }
  getNotificationReminderForAdmin(baseSchoolNameId,userRole){
    return this.http.get<any[]>(this.baseUrl + '/notification/get-notificationReminderForAdmin?id='+baseSchoolNameId+'&userRole='+userRole)
  }

  getNotificationResponselistForSchool(baseSchoolNameId){
    return this.http.get<any[]>(this.baseUrl + '/notification/get-notificationResponselistForSchool?id='+baseSchoolNameId)
  }

  ChangeNotificationSeenStatus(notificationId, status) {
    return this.http.get<any>(this.baseUrl + '/notification/change-recieverSeenStatus?notificationId='+notificationId+'&Status='+status);
  }

  getNotifications(pageNumber, pageSize,searchText) {

    let params = new HttpParams(); 
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   
    return this.http.get<INotificationPagination>(this.baseUrl + '/notification/get-Notifications', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Notifications = [...this.Notifications, ...response.body.items];
        this.NotificationPagination = response.body;
        return this.NotificationPagination;
      })
    ); 
  }

  find(id: number) {
    return this.http.get<Notification>(this.baseUrl + '/notification/get-NotificationDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/notification/update-Notification/'+id, model);
  }
  submit(model: any) {
    return this.http.post<PostResponse>(this.baseUrl + '/notification/save-Notification', model).pipe(
      map((BnaClassTest: PostResponse) => {
        if (BnaClassTest) {
          console.log(BnaClassTest);
          return BnaClassTest;
        }
      })
    );
  
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/notification/delete-Notification/'+id);
  }
}
