import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Calendar } from "../models/calendar";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class CalendarService {
  baseUrl = environment.apiUrl;
  private readonly API_URL = "assets.json";
  //private readonly API_URL = "assets/data/calendar.json";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  dataChange: BehaviorSubject<Calendar[]> = new BehaviorSubject<Calendar[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Calendar[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCalendars(): Observable<Calendar[]> {
    console.log(this.API_URL)
    return this.httpClient
      .get<Calendar[]>(this.API_URL)
      .pipe(catchError(this.errorHandler));
  }
  getCourseDurationForEventCalendar(){
    return this.httpClient.get<any[]>(this.baseUrl + '/course-duration/get-courseDurationForEventCalendar')
  }
  addUpdateCalendar(calendar: Calendar): void {
    this.dialogData = calendar;
  }
  deleteCalendar(calendar: Calendar): void {
    this.dialogData = calendar;
  }
  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
