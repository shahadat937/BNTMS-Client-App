import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildParameterService {
  
  private currentTraineeIdSubject: BehaviorSubject<number>;
  public currentUser: Observable<number>;

  constructor(private http: HttpClient) {

    this.currentTraineeIdSubject = new BehaviorSubject<number>(
      JSON.parse(localStorage.getItem('currentTraineeId'))
    );
    this.currentUser = this.currentTraineeIdSubject.asObservable();

  }

  public get currentTraineeValue(): number {
    return this.currentTraineeIdSubject.value;
  }
  SetupTraineeId(traineeId: number) {

    localStorage.setItem('currentTraineeId', JSON.stringify(traineeId));
    this.currentTraineeIdSubject.next(traineeId);
  }
}
