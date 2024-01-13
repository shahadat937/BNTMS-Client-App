import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-upcomingcourses-list',
  templateUrl: './upcomingcourses-list.component.html',
  styleUrls: ['./upcomingcourses-list.component.sass']
})
export class UpcomingCoursesListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  destination:string;
  InstructorByCourse:any;
  localCourseCount:number;
  runningCourses:any;
  dbType:any;
  UpcomingCourseCount:number;
  upcomingCourses:any;
  isShowAlarmButton:boolean=false;
  schoolDb:any;
  dayCount:any;
  branchId:any;
  traineeId:any;
  role:any;
  school:any;
  schoolName:any;
  weekList:any;
  weekCount:any;
  groupArrays:{ schoolName: string; courses: any; }[];
  showHideDiv= false;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','course','durationFrom','durationTo','daysCalculate', 'actions'];

  constructor(private datepipe: DatePipe,private authService: AuthService,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    // this.branchId =  this.authService.currentUserValue.branchId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    //this.getTraineeNominations();
    //var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.schoolDb=1;
    var schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.dbType = this.route.snapshot.paramMap.get('dbType'); 
    this.school=schoolId;
    console.log(schoolId)
    if(this.role == this.userRole.CO || this.role == this.userRole.TrainingOffice || this.role == this.userRole.TC){
      this.getUpcomingCourseListByBase(this.branchId);
    }else{
      this.getUpcomingCourseListBySchool(schoolId);
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
                    .tbl-by-group.db-li-s-in tr .btn-tbl-view {
                      display:none;
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
                .header-text{
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
          <span class="header-warning top">CONFIDENTIAL</span>
          <h3>Upcomming Courses List</h3>
          <h3> ${this.schoolName}</h3>
          </div>
          <br>
          <hr>
          ${printContents}
          <span class="header-warning bottom">CONFIDENTIAL</span>
        </body>
      </html>`
    );
    popupWin.document.close();

}
  getUpcomingCourseListBySchool(schoolId){
      let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
      this.schoolDashboardService.getUpcomingCourseListBySchool(currentDateTime, this.masterData.coursetype.LocalCourse, schoolId).subscribe(response => {         
        console.log("response")
        console.log(response);
        this.schoolName = response[0].schoolName;
        console.log("response")
        this.UpcomingCourseCount=response.length;
        this.upcomingCourses=response;
       
        console.log("upcomming");
        console.log(this.upcomingCourses);
      })
  }

  checkCourseWeeks(courseDurationId){
    
    
    // console.log("duration id", courseDurationId);
    this.schoolDashboardService.getCourseWeekListByCourseDuration(courseDurationId).subscribe(response => {     
      this.weekCount=response.length;
      // console.log("week count");
      console.log(this.weekCount);
      // if(this.weekCount > 0){
      //   this.isShowAlarmButton=false;
      //   // console.log("created");
      // }
      // else{
      //   this.isShowAlarmButton=true;
      //   // console.log("not");
      // }
      return this.weekCount;
    })
  }

  courseWeekGenerate(row){
    console.log(row)
    const id = row.courseDurationId; 

    


console.log("courseduration");
console.log(id);
    this.confirmService.confirm('Confirm  message', 'Are You Sure ').subscribe(result => {
      console.log(result);
      if (result) {
        this.schoolDashboardService.genarateCourseWeek(id).subscribe(() => {
          this.getUpcomingCourseListBySchool(this.school);
          this.snackBar.open('Course Week Generated Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
  }

  getRemainingDays(getStartDate){
    var date1 = new Date(getStartDate); 
	  var date2 =  new Date();
    var Time = date1.getTime() - date2.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    var dayCount = Days+1;
    return dayCount.toFixed(0);
  }

  getrunningCourseListBySchool(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getrunningCourseListBySchool(currentDateTime, this.masterData.coursetype.LocalCourse, schoolId,0).subscribe(response => {   
      
      this.localCourseCount=response.length;
      this.runningCourses=response;
      console.log(response)
    })
  }

  getUpcomingCourseListByBase(baseId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getUpcomingCourseListByBase(currentDateTime,baseId).subscribe(response => {         
      this.UpcomingCourseCount=response.length;
      this.upcomingCourses=response;

      console.log("school name");
      console.log(this.school)

      // this.schoolDashboardService.getCourseWeekListByCourseDuration(id).subscribe(response => {     
      //   this.weekCount=response.length;
      //   console.log("week count");
      //   console.log(this.weekCount);
      // })

      // this gives an object with dates as keys
      const groups = this.upcomingCourses.reduce((groups, courses) => {
        const schoolName = courses.schoolName;
        if (!groups[schoolName]) {
          groups[schoolName] = [];
        }
        groups[schoolName].push(courses);
          return groups;
        }, {});
  
        // Edit: to add it in the array format instead
        this.groupArrays = Object.keys(groups).map((schoolName) => {
          return {
            schoolName,
            courses: groups[schoolName]
          };
        });
        console.log(this.groupArrays);

    })
  }

  getDaysfromDate(dateFrom:any,dateTo:any){
    //Date dateTime11 = Convert.ToDateTime(dateFrom);  
    var date1 = new Date(dateFrom); 
	  var date2 =  new Date(dateTo);
    var Time = date2.getTime() - date1.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    this.dayCount = Days+1;
    var totalWeeks = 0;
    for(var start = 0; start <= this.dayCount; start = start+7){
      totalWeeks +=1;
    }
    return totalWeeks;
  }
}
