import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { ActivatedRoute,Router } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexFill,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { MasterData } from 'src/assets/data/master-data';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { scheduled } from 'rxjs';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { ReadingMaterialService } from '../../reading-materials/service/readingmaterial.service';
import { StudentDashboardService } from 'src/app/student/services/StudentDashboard.service';
import { BaseSchoolNameService } from 'src/app/basic-setup/service/BaseSchoolName.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export type avgLecChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public avgLecChartOptions: Partial<avgLecChartOptions>;
  public pieChartOptions: Partial<pieChartOptions>;
   masterData = MasterData;
  loading = false;
  userRole = Role;
  GetSchoolForm: FormGroup;
  isShown: boolean = false ;
  paramBaseSchoolNameId:any;

  dataEnty: any = Role.DataEntry;
  fileUrl:any = environment.fileUrl;
  bulletinList:any;

  courseList:any;

  routineList:any;

  materialList:any;

  nomineeCount:number;
  foreignNomineeCount:number;
  runningOfficerCount:number;
  runningSailorCount:number;
  runningCivilCount:number;
  localCourseCount:number;
  UpcomingCourseCount:number;
  upcomingCourses:any;
  runningCourses:any;
  viewStatus:any;
  viewCourseTitle:any;
  RoutineBySchool:any;
  RoutineByCourse:any;
  PendingExamEvaluation:any;
  TraineeAbsentList:any;
  TodayRoutineList:any;
  TodayAttendanceList:any;
  ReadIngMaterialList:any;
  InstructorList:any;
  schoolId:any;
  schoolDb:any=1;
  schoolName:any;
  userManual:any;
  dbType:any;
  passOutStatus:any;
  branchId:any;
  traineeId:any;
  role:any;
  userRoleFornotification:any;
  notificationCount:any;
  
  pageTitle:any;
  selectedschool:SelectedModel[];
  groupArrays:{ schoolName: string; courses: any; }[];

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser','course', 'durationFrom', 'durationTo','countWeek','courseSyllabus','actions'];
  displayedRoutineColumns: string[] = ['ser', 'date','classType','duration', 'period', 'subject', 'classLocation', 'name'];
  displayedExamEvaluationColumns: string[] = ['ser', 'course','subject','date','name'];
  displayedAbsentListColumns: string[] = ['ser', 'course','duration','absent','actions'];
  displayedRoutineCountColumns: string[] = ['ser','course','moduleName','routineCount','actions'];
  displayedRoutineAbsentColumns: string[] = ['ser','course','nominated','actions'];
  displayedReadingMaterialColumns: string[] = ['ser','course','materialCount','actions'];
  displayedInstructorColumns: string[] = ['ser','course','instructorCount','actions'];
  displayedUpcomingColumns: string[] = ['ser','course','durationFrom','durationTo','daysCalculate', 'actions'];
  displayedNbcdUpcomingColumns: string[] = ['ser','comeform','course','durationFrom','durationTo','daysCalculate', 'actions'];
  constructor(private datepipe: DatePipe, private snackBar: MatSnackBar, private confirmService: ConfirmService, private authService: AuthService,private baseSchoolNameService:BaseSchoolNameService,private studentDashboardService:StudentDashboardService,private route: ActivatedRoute,private router: Router,private fb: FormBuilder,private ReadingMaterialService: ReadingMaterialService,private schoolDashboardService: SchoolDashboardService) {}
  ngOnInit() {

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    // this.branchId =  this.authService.currentUserValue.branchId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)
    if(this.role == this.userRole.CO || this.role == this.userRole.TrainingOffice || this.role == this.userRole.TC || this.role == this.userRole.TCO){
      this.schoolId = this.branchId;
      this.pageTitle = "Dashboard";
      this.getCoursesByViewType(1);
      // this.getRunningCourseDurationByBase(this.branchId); 
      this.getUpcomingCourseListByBase(this.branchId);
      this.getNominetedTraineeListByBase(this.branchId);
      this.getNominetedForeignTraineeListByBase(this.branchId);
      this.geCourseTotalOfficerListByBase(this.branchId);
      this.getNotificationReminderForDashboard();
      
      this.isShown = true;
    }else{
      this.schoolId = this.branchId;
      this.pageTitle = "School Dashboard";   
      this.getselectedschools();
      this.getNotificationReminderForDashboard();
      this.getNominetedTraineeListBySchoolId(this.schoolId);
      this.getNominetedForeignTraineeListBySchoolId(this.schoolId);
      this.getrunningCourseTotalOfficerListBySchoolId(this.schoolId);
      this.getCoursesByViewType(1);
      this.getUpcomingCourseListBySchool(this.schoolId);
      //this.getUpcomingCourseListByNbcdSchool(this.schoolId);
      this.getPendingExamEvaluation(this.schoolId);
      this.getTraineeAbsentList(this.schoolId);
      this.getRoutineInfoByCourse(this.schoolId);
      this.getCurrentRoutineBySchool(this.schoolId);
      this.getReadingMetarialBySchool(this.schoolId);
      this.getInstructorByCourse(this.schoolId);
      this.getCurrentAttendanceBySchool(this.schoolId);
      this.getActiveBulletins(this.schoolId);
      this.isShown = true;
    }
    this.schoolId = this.branchId;
    console.log(this.schoolId)
      this.baseSchoolNameService.find(this.schoolId).subscribe(response => {   
        this.schoolName = response.schoolName;
        console.log(this.schoolName);
      })
    

    this.baseSchoolNameService.getUserManualByRole(this.role).subscribe(response => {   
      console.log("user manual");
      console.log(response);
      this.userManual=response[0].doc;
      console.log(this.userManual);
    })
  }


  getActiveBulletins(baseSchoolNameId){
    this.studentDashboardService.getActiveBulletinList(baseSchoolNameId).subscribe(res=>{
      this.bulletinList=res;  
      console.log(this.bulletinList);
    });
  }

  getselectedschools(){
    this.ReadingMaterialService.getselectedschools().subscribe(res=>{
      this.selectedschool=res;
    });
  }

  getReadingMetarialBySchool(schoolId){
    this.schoolDashboardService.getReadingMetarialBySchool(schoolId).subscribe(response => {   
      this.ReadIngMaterialList=response;
      console.log(response)
    })
  }
  getCurrentRoutineBySchool(schoolId){
    this.dbType=1;
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getCurrentRoutineBySchool(currentDateTime,schoolId).subscribe(response => {   
      this.TodayRoutineList=response;
      console.log(response)
    })
  }

  getCurrentAttendanceBySchool(schoolId){    
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getCurrentAttendanceBySchool(currentDateTime,schoolId).subscribe(response => {   
      this.TodayAttendanceList=response;
      console.log(response)
      console.log("Param school");
      console.log(this.paramBaseSchoolNameId);
    })
  }

  getNominetedTraineeListBySchoolId(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getnominatedCourseListFromSpRequestBySchoolId(currentDateTime,schoolId).subscribe(response => {         
      this.nomineeCount=response.length;
      console.log(response);
      console.log("nomination count");
      console.log(this.nomineeCount);
    })
  }

  getNominetedTraineeListByBase(schoolId){
    // let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getNominatedTotalTraineeByBaseFromSp(schoolId).subscribe(response => {         
      this.nomineeCount=response.length;
      console.log(response)
    })
  }

  getNotificationReminderForDashboard(){
    if(this.role == this.userRole.SchoolOIC){
      this.userRoleFornotification = this.userRole.SuperAdmin;
    }else{
      this.userRoleFornotification = this.role;
    }
    // let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getNotificationReminderForDashboard(this.userRoleFornotification,this.branchId).subscribe(response => {         
      this.notificationCount=response[0].notificationCount;
      console.log("notify "+this.notificationCount)
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

  getDaysfromDate(dateFrom:any,dateTo:any){
    //Date dateTime11 = Convert.ToDateTime(dateFrom);  
    var date1 = new Date(dateFrom); 
	  var date2 =  new Date(dateTo);
    var Time = date2.getTime() - date1.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    var dayCount = Days+1;
    var totalWeeks = 0;
    for(var start = 0; start <= dayCount; start = start+7){
      totalWeeks +=1;
    }
    return totalWeeks;
  }

  getRunningCourseDurationByBase(viewStatus){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getRunningCourseDurationByBase(currentDateTime,this.schoolId,viewStatus).subscribe(response => {         
      this.runningCourses=response;
      console.log("running");
      console.log(this.runningCourses)
      // this gives an object with dates as keys
      const groups = this.runningCourses.reduce((groups, courses) => {
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
      console.log("eeee");
      console.log(this.groupArrays);

    })
  }

  getInstructorByCourse(schoolId){
    this.schoolDashboardService.getInstructorByCourse(schoolId).subscribe(response => {         
      this.InstructorList=response;
      console.log(response)
    })
  }

  getNominetedForeignTraineeListBySchoolId(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getnominatedForeignTraineeFromSpRequestBySchoolId(currentDateTime,schoolId, this.masterData.OfficerType.Foreign).subscribe(response => {         
      this.foreignNomineeCount=response.length;
      console.log(response)
    })
  }
  getNominetedForeignTraineeListByBase(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getNominatedForeignTraineeByTypeAndBase(currentDateTime,schoolId, this.masterData.OfficerType.Foreign).subscribe(response => {         
      this.foreignNomineeCount=response.length;
      console.log(response)
    })
  }

  getrunningCourseTotalOfficerListBySchoolId(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getrunningCourseTotalOfficerListBySchoolRequest(currentDateTime, this.masterData.TraineeStatus.officer, schoolId).subscribe(response => {         
      this.runningOfficerCount=response.length;
    })
    this.schoolDashboardService.getrunningCourseTotalOfficerListBySchoolRequest(currentDateTime, this.masterData.TraineeStatus.sailor, schoolId).subscribe(response => {         
      this.runningSailorCount=response.length;
    })
    this.schoolDashboardService.getrunningCourseTotalOfficerListBySchoolRequest(currentDateTime, this.masterData.TraineeStatus.civil, schoolId).subscribe(response => {         
      this.runningCivilCount=response.length;
    })
  }

  geCourseTotalOfficerListByBase(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getCourseTotalOfficerListByBase(currentDateTime, this.masterData.TraineeStatus.officer, schoolId).subscribe(response => {         
      this.runningOfficerCount=response.length;
    })
    this.schoolDashboardService.getCourseTotalOfficerListByBase(currentDateTime, this.masterData.TraineeStatus.sailor, schoolId).subscribe(response => {         
      this.runningSailorCount=response.length;
    })
    this.schoolDashboardService.getCourseTotalOfficerListByBase(currentDateTime, this.masterData.TraineeStatus.civil, schoolId).subscribe(response => {         
      this.runningCivilCount=response.length;
    })
  }

  getCoursesByViewType(viewStatus){
    this.viewStatus = viewStatus;

    if(this.role == this.userRole.CO || this.role == this.userRole.TrainingOffice || this.role == this.userRole.TC || this.role == this.userRole.TCO){
     
      if(viewStatus==1){
        this.viewCourseTitle = "Running";
        this.getRunningCourseDurationByBase(viewStatus);
       
      }else if(viewStatus==2){
        this.viewCourseTitle = "Passing Out";
        this.getRunningCourseDurationByBase(viewStatus);
      }else if(viewStatus=3){
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
        this.viewCourseTitle = "Upcoming";
        this.schoolDashboardService.getUpcomingCourseListByBase(currentDateTime,this.schoolId).subscribe(response => {         
          this.UpcomingCourseCount=response.length;
          this.upcomingCourses=response;
    
          console.log("school name");
    
    
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
    }else{
  
      if(viewStatus==1){
        console.log(this.masterData.coursetype.LocalCourse);
        
        this.viewCourseTitle = "Running";
        this.getrunningCourseListBySchool(viewStatus);
      }else if(viewStatus==2){
        this.viewCourseTitle = "Passing Out";
        this.getrunningCourseListBySchool(viewStatus);
      }else if(viewStatus=3){
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
        this.viewCourseTitle = "Upcoming";

        if(this.schoolId == this.masterData.schoolName.NBCDSchool || this.role == this.userRole.OICNBCDSchool){
          this.schoolDashboardService.getUpcomingCourseListByNbcdSchool(currentDateTime, this.masterData.coursetype.LocalCourse, this.schoolId).subscribe(response => {   
            this.UpcomingCourseCount=response.length;
            console.log("upcomingCourses-nbcd");
            this.upcomingCourses=response;
            console.log(this.upcomingCourses);
          })
        }
        else{
          this.schoolDashboardService.getUpcomingCourseListBySchool(currentDateTime, this.masterData.coursetype.LocalCourse, this.schoolId).subscribe(response => {                 
            console.log("upcoming duration");
            this.runningCourses=response;
            console.log(response);
          })
        }
      }
    }
    
  }

  getrunningCourseListBySchool(viewStatus){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getrunningCourseListBySchool(currentDateTime, this.masterData.coursetype.LocalCourse, this.schoolId,viewStatus).subscribe(response => {         
      this.localCourseCount=response.length;
      this.runningCourses=response;
      console.log(response);
    });
  }

  getDateComparision(obj){

    var currentDate = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    //Date dateTime11 = Convert.ToDateTime(dateFrom);  
    var current = new Date(currentDate);
    // var date1 = new Date(obj.durationFrom); 
	  var date2 =  new Date(obj.durationTo);
    // console.log(obj)
    // console.log(current, date2)
    // console.log(this.passOutStatus);

    if(current > date2){
      this.passOutStatus = 1;
    }else{
      this.passOutStatus = 0;
    }
    // console.log(this.passOutStatus);
    // else if(current >= date1 && current <= date2){
    //   this.weekStatus = 2;
    // }else if(current < date1){
    //   this.weekStatus = 3;
    // }else{
    // }
  }

  getUpcomingCourseListBySchool(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    ///console.log("Nbcd ");
    console.log(schoolId);
    if(schoolId == this.masterData.schoolName.NBCDSchool){
      this.schoolDashboardService.getUpcomingCourseListByNbcdSchool(currentDateTime, this.masterData.coursetype.LocalCourse, schoolId).subscribe(response => {   
      
        this.UpcomingCourseCount=response.length;
        console.log("upcomingCourses");
        this.upcomingCourses=response;
      })
    }
    else{
      this.schoolDashboardService.getUpcomingCourseListBySchool(currentDateTime, this.masterData.coursetype.LocalCourse, schoolId).subscribe(response => {   
      
        this.UpcomingCourseCount=response.length;
        this.upcomingCourses=response;
        console.log("nb");
      })
    }
  }

  getUpcomingCourseListByBase(baseId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getUpcomingCourseListByBase(currentDateTime,baseId).subscribe(response => {         
      this.UpcomingCourseCount=response.length;
      this.upcomingCourses=response;
    })
  }

  courseWeekGenerate(row){
    console.log(row)
    const id = row.courseDurationId; 

    this.confirmService.confirm('Confirm  message', 'Are You Sure ').subscribe(result => {
      console.log(result);
      if (result) {
        this.schoolDashboardService.genarateCourseWeek(id).subscribe(() => {
          this.getCoursesByViewType(1);
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

  getPendingExamEvaluation(schoolId){
    this.schoolDashboardService.getPendingExamEvaluation(schoolId).subscribe(response => {         
      this.PendingExamEvaluation=response;
      console.log(response)
    })
  }

  getTraineeAbsentList(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getTraineeAbsentList(currentDateTime,schoolId).subscribe(response => {   
      this.TraineeAbsentList=response;
      console.log("absent list")
      console.log(response)
    })
  }

  getRoutineInfoByCourse(schoolId){
    this.schoolDashboardService.getRoutineByCourse(schoolId).subscribe(response => {         
      this.RoutineByCourse=response;
      console.log(this.RoutineByCourse)
    })
  }
}
