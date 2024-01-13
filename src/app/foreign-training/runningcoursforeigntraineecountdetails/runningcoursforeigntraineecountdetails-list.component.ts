import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseDuration} from '../../foreign-training/models/courseduration'
import { CourseDurationService } from 'src/app/foreign-training/service/courseduration.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { DatePipe } from '@angular/common';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-runningcoursforeigntraineecountdetails-list',
  templateUrl: './runningcoursforeigntraineecountdetails-list.component.html',
  styleUrls: ['./runningcoursforeigntraineecountdetails-list.component.sass']
})
export class RunningCoursForeignRraineecountDetailsListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseDuration[] = [];
  isLoading = false;
  courseTypeId=MasterData.coursetype.ForeignCourse;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  branchId:any;
  traineeId:any;
  role:any;
  dayCount:any;
  foreignCourseCount:number;
  foreignCourseCountryCount:number;
  foreignCourseDesignation:number;
  runningCourses:any;
  runningCoursesCountry:any;
  runningCoursesDesignation:any;
  viewCourseTitle:any;
  userRole = Role;
  viewStatus:any;
  showHideDiv= false;
 

  displayedColumns: string[] = ['ser','courseName', 'country','durationTo','dayCount', 'actions'];
  dataSource: MatTableDataSource<CourseDuration> = new MatTableDataSource();


   selection = new SelectionModel<CourseDuration>(true, []);

  
  constructor(private datepipe: DatePipe,private snackBar: MatSnackBar,private authService: AuthService,private CourseDurationService: CourseDurationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

     this.getrunningCourseListForForeingTraineeDetails(1);
  }
  getrunningCourseListForForeingTraineeDetails(viewStatus){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.CourseDurationService.getrunningCourseListForForeingTraineeDetails(currentDateTime,viewStatus).subscribe(response => {         
      this.foreignCourseCount=response.length;
      this.runningCourses=response;
      console.log(response);
      console.log("RunningCourse Details");
    });
    this.CourseDurationService.getrunningCourseListForForeingTraineeCountry(currentDateTime,viewStatus).subscribe(response => {         
      this.foreignCourseCountryCount=response.length;
      this.runningCoursesCountry=response;
      console.log(response);
      console.log("RunningCourse Country");
    });
    this.CourseDurationService.getrunningCourseListForForeingTraineeDesignation(currentDateTime,viewStatus).subscribe(response => {         
      this.foreignCourseDesignation=response.length;
      this.runningCoursesDesignation=response;
      console.log(response);
      console.log("RunningCourse Designation");
    });
  }

  getCoursesByViewType(viewStatus){
    this.viewStatus = viewStatus;
    if(this.role == this.userRole.ForeignTraining ){
      if(viewStatus==1){
        this.viewCourseTitle = "Running";
       // this.getRunningCourseDurationByBase(viewStatus);
      }else if(viewStatus==2){
        this.viewCourseTitle = "Passing Out";
        //this.getRunningCourseDurationByBase(viewStatus);
      }else if(viewStatus=3){
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
        this.viewCourseTitle = "Upcoming";
        
      }
    }else{
      if(viewStatus==1){
        this.viewCourseTitle = "Running";
        this.getrunningCourseListForForeingTraineeDetails(viewStatus);
      }else if(viewStatus==2){
        this.viewCourseTitle = "Passing Out";
        this.getrunningCourseListForForeingTraineeDetails(viewStatus);
      }else if(viewStatus=3){
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
        this.viewCourseTitle = "Upcoming";

       
      }
    }
    
  }
  toggle(){
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle(){
    this.showHideDiv= false;
    this.print();
  }
  print(){ 
     
    let printContents, popupWin;
    printContents = document.getElementById('print-routine').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          body{  width: 99%;}
            label { font-weight: 400;
                    font-size: 13px;
                    padding: 2px;
                    margin-bottom: 5px;
                  }
            table, td, th {
                  border: 1px solid silver;
                    }
                    table td {
                  font-size: 13px;
                    }

                    table th {
                  font-size: 13px;
                    }
              table {
                    border-collapse: collapse;
                    width: 98%;
                    }
                th {
                    height: 26px;
                    }
                .header-text, td{
                  text-align:center;
                }
                .header-text h3{
                  margin:0;
                }
                .header-warning{
                  font-size:12px;
                }
                .header-warning.bottom{
                  position:absolute;
                  bottom:0;
                  left:44%;
                }
                
                
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <span class="header-warning top">RESTRICTED</span>
          <h3> LIST OF BN PERSONNEL ONGOING COURSES IN DIFFERENT COUNTRIES</h3>
          <h4>TILL DATE:- ${this.datepipe.transform((new Date), 'dd MMM yyyy')}</h4>
          </div>
          <br>
          <hr>
          
          ${printContents}
         
          <span class="header-warning bottom">RESTRICTED</span>
        </body>
      </html>`
    );
    popupWin.document.close();

}

}

