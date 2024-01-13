import { Component, OnInit, ViewChild,ElementRef,Pipe, PipeTransform  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { dashboardService } from '../services/dashboard.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import {TraineeNominationService} from '../../../course-management/service/traineenomination.service'
import { StudentDashboardService } from 'src/app/student/services/StudentDashboard.service';



@Component({
  selector: 'app-traineeattendance-list',
  templateUrl: './traineeattendance-list.component.html',
  styleUrls: ['./traineeattendance-list.component.sass']
})
export class TraineeAttendanceListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  destination:string;
  AttendanceStatusForm: FormGroup;
  groupArrays:{ attendanceDate: string; courses: any; }[];
  RoutineByCourse:any;
  sectionList:SelectedModel[];
  courseType:any;
  schoolId:any;
  courseTypeId:any;
  showHideDiv=false;
  traineeAttendanceList:any;
  courseDurationId:any;

  displayedColumns: string[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  
  branchId:any;
  traineeId:any;
  role:any;

  courseNameTitle:any;
  trainee:any;
  durationId:any;

  constructor(private datepipe: DatePipe,private fb: FormBuilder,private studentDashboardService: StudentDashboardService, private authService: AuthService,private TraineeNominationService: TraineeNominationService, private dashboardService: dashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.userRole.SuperAdmin
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)
   
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    //this.getTraineeNominations();
    

    this.intitializeForm();
    this.getTraineeAttendanceList(100); // 100 for all data
  }
  intitializeForm() {
    this.AttendanceStatusForm = this.fb.group({
      attendanceStatus:[],            
    });
  }

  getTraineeAttendanceList(attendanceStatus){
    var inputId = this.route.snapshot.paramMap.get('traineeId'); 
    this.durationId = this.route.snapshot.paramMap.get('courseDurationId');
    this.studentDashboardService.getSpStudentInfoByTraineeId(Number(inputId)).subscribe(res=>{
      var traineeSectionId = res[0].courseSectionId;
      console.log("res")
      console.log(res)

      this.dashboardService.getTraineeAttendanceList(inputId,this.durationId,traineeSectionId,attendanceStatus).subscribe(res=>{
        this.traineeAttendanceList=res;
        // this.trainee = res[0].traineeRank + " " + res[0].name + " ( P No " + res[0].pno +")";
        // this.courseNameTitle = res[0].course + " - " + res[0].courseTitle;
        console.log(res)
  
        // this gives an object with dates as keys
        const groups = this.traineeAttendanceList.reduce((groups, courses) => {
          const attendanceDate = courses.attendanceDate;
          if (!groups[attendanceDate]) {
            groups[attendanceDate] = [];
          }
          groups[attendanceDate].push(courses);
          return groups;
        }, {});
  
        // Edit: to add it in the array format instead
        this.groupArrays = Object.keys(groups).map((attendanceDate) => {
          return {
            attendanceDate,
            courses: groups[attendanceDate]
          };
        });
  
        console.log(this.groupArrays)
      });
    });

    console.log(inputId, this.durationId,attendanceStatus)
    
  }

  onAttendanceStatusSelectionGet(){

    
    var attendanceStatus = this.AttendanceStatusForm.value['attendanceStatus'];

    this.getTraineeAttendanceList(attendanceStatus);
  }

  toggle(){
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle(){
    this.showHideDiv= false;
    this.print();
  }
  print(){ 
    
    this.trainee = this.traineeAttendanceList[0].traineeRank + " " + this.traineeAttendanceList[0].name + " ( P No " + this.traineeAttendanceList[0].pno +")";
    this.courseNameTitle = this.traineeAttendanceList[0].course + " - " + this.traineeAttendanceList[0].courseTitle;
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
              .first-col-hide .mat-header-row.cdk-header-row.ng-star-inserted .mat-header-cell:first-child, .first-col-hide .mat-row.cdk-row.ng-star-inserted .mat-cell:first-child {
                      display: none;
                  }
                th {
                    height: 26px;
                    }
                .header-text{
                  text-align:center;
                }
                .header-text h3{
                  margin:0;
                }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
            <h3>Trainee:- ${this.trainee}</h3>
            <h3>Course:- ${this.courseNameTitle}</h3>
          </div>
          <br>
          <hr>
          ${printContents}
          
        </body>
      </html>`
    );
    popupWin.document.close();

}
}
