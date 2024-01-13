import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNASubjectName } from '../../subject-management/models/BNASubjectName';
import { BNASubjectNameService } from '../../subject-management/service/BNASubjectName.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDashboardService } from '../services/StudentDashboard.service';

@Component({
  selector: 'app-weeklyattendance',
  templateUrl: './weeklyattendance-list.component.html',
  styleUrls: ['./weeklyattendance-list.component.sass']
})
export class WeeklyAttendanceListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  AttendanceByTraineeAndCourseDuration:any;
  status=1;
  showHideDiv= false;
  groupArrays:{ attendanceDate: string; attendance: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  traineeParcentage:any;

  displayedAttendanceColumns: string[] = ['ser','attendanceDate','periodName','classLeaderName','attendanceStatus'];


   selection = new SelectionModel<BNASubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar,private studentDashboardService: StudentDashboardService,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    var traineeId = this.route.snapshot.paramMap.get('traineeId');
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    this.getAttendanceByTraineeAndCourseDuration(traineeId, courseDurationId)
  }

  getAttendanceByTraineeAndCourseDuration(traineeId,courseDurationId){
    this.studentDashboardService.getAttendanceParcentageByTraineeAndCourseDuration(traineeId,courseDurationId).subscribe(res=>{
      this.traineeParcentage=res[0].percentage;
      console.log(this.traineeParcentage);
    });
    this.studentDashboardService.getAttendanceByTraineeAndCourseDuration(traineeId,courseDurationId).subscribe(res=>{
      this.AttendanceByTraineeAndCourseDuration = res;
      console.log(this.AttendanceByTraineeAndCourseDuration)
      // this gives an object with dates as keys
      const groups = this.AttendanceByTraineeAndCourseDuration.reduce((groups, attendance) => {
        const attendanceDate = attendance.attendanceDate.split('T')[0];
        if (!groups[attendanceDate]) {
          groups[attendanceDate] = [];
        }
        groups[attendanceDate].push(attendance);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((attendanceDate) => {
        return {
          attendanceDate,
          attendance: groups[attendanceDate]
        };
      });
      console.log(this.groupArrays)
    });
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
                
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <h3>Weekly Attendance</h3>
         
          </div>
          <br>
          <hr>
          
          ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();

}

  // getReadingMaterialBySchoolAndCourse(baseSchoolNameId, courseNameId){    
  //   this.studentDashboardService.getReadingMAterialInfoBySchoolAndCourse(baseSchoolNameId, courseNameId).subscribe(res=>{
  //     this.ReadingMaterialBySchoolAndCourse = res;
  //     console.log(this.ReadingMaterialBySchoolAndCourse)
  //   });
  // }

}
