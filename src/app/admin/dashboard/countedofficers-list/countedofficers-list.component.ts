import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {TraineeNomination} from '../../../course-management/models/traineenomination'
import {TraineeNominationService} from '../../../course-management/service/traineenomination.service'
import { SpOfficerDetails } from '../models/spofficerdetails';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import {dashboardService} from '../services/dashboard.service';

@Component({
  selector: 'app-countedofficers-list',
  templateUrl: './countedofficers-list.component.html',
  styleUrls: ['./countedofficers-list.component.sass']
})
export class CountedOfficersListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeNomination[] = [];
  isLoading = false;
  Countedlist:any[];
  destination:string;
  dbType:any;
  officerTypeId:any;
  groupArrays:{ courseName: string; courses: any; }[];
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','name','course','duration'];

  constructor(private datepipe: DatePipe,private dashboardService: dashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeNominationService: TraineeNominationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    var traineeStatusId = this.route.snapshot.paramMap.get('traineeStatusId'); 
    this.dbType = this.route.snapshot.paramMap.get('dbType'); 
    
    console.log(traineeStatusId)
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    if(Number(traineeStatusId) == this.masterData.TraineeStatus.officer){
      this.destination = "Officer";
      this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.officer).subscribe(response => {         
        this.Countedlist=response;
        // this gives an object with dates as keys
        const groups = this.Countedlist.reduce((groups, courses) => {
          const schoolName = courses.course;
            if (!groups[schoolName]) {
            groups[schoolName] = [];
              }
            groups[schoolName].push(courses);
            return groups;
          }, {});
  
        // Edit: to add it in the array format instead
          this.groupArrays = Object.keys(groups).map((courseName) => {
            return {
          courseName,
            courses: groups[courseName]
            };
            });
            console.log(this.groupArrays);
        console.log(this.Countedlist);
      })
    }else if(Number(traineeStatusId) == this.masterData.TraineeStatus.sailor){
      this.destination = "Sailor";
      this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.sailor).subscribe(response => {         
        this.Countedlist=response;
        // this gives an object with dates as keys
        const groups = this.Countedlist.reduce((groups, courses) => {
          const schoolName = courses.course + '_('+ courses.courseTitle+')';
            if (!groups[schoolName]) {
            groups[schoolName] = [];
              }
            groups[schoolName].push(courses);
            return groups;
          }, {});
  
        // Edit: to add it in the array format instead
          this.groupArrays = Object.keys(groups).map((courseName) => {
            return {
          courseName,
            courses: groups[courseName]
            };
            });
            console.log(this.groupArrays);
        console.log(this.Countedlist);
      })
    }else if(Number(traineeStatusId) == this.masterData.TraineeStatus.civil){
      this.destination = "Civil";
      this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.civil).subscribe(response => {         
        this.Countedlist=response;
        // this gives an object with dates as keys
        const groups = this.Countedlist.reduce((groups, courses) => {
          const schoolName = courses.course + '_('+ courses.courseTitle+')';
            if (!groups[schoolName]) {
            groups[schoolName] = [];
              }
            groups[schoolName].push(courses);
            return groups;
          }, {});
  
        // Edit: to add it in the array format instead
          this.groupArrays = Object.keys(groups).map((courseName) => {
            return {
          courseName,
            courses: groups[courseName]
            };
            });
            console.log(this.groupArrays);
        console.log(this.Countedlist);
      })
    }else{
      this.destination = "Trainee";
      this.dashboardService.getnominatedCourseListFromSpRequest(currentDateTime).subscribe(response => {   
      
        this.Countedlist=response;

        // this gives an object with dates as keys
        const groups = this.Countedlist.reduce((groups, courses) => {
          const schoolName = courses.course + '_('+ courses.courseTitle+')';
            if (!groups[schoolName]) {
            groups[schoolName] = [];
              }
            groups[schoolName].push(courses);
            return groups;
          }, {});
  
        // Edit: to add it in the array format instead
          this.groupArrays = Object.keys(groups).map((courseName) => {
            return {
          courseName,
            courses: groups[courseName]
            };
            });
            console.log(this.groupArrays);

      })
    }

  }

}
