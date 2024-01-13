//import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import { Calendar } from '../../calendar/models/calendar';
import { CalendarService } from '../../calendar/service/calendar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {InterServiceDashboardService} from '../services/InterServiceDashboard.service';
import {MasterData} from 'src/assets/data/master-data';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { INITIAL_EVENTS } from '../../calendar/events-util';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/service/auth.service';
import { SchoolDashboardService } from 'src/app/school/services/SchoolDashboard.service';
//import { MasterData } from 'src/assets/data/master-data';
//import { CourseDuration } from '../models/courseduration';
//import { CourseDurationService } from '../services/courseduration.service';
export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};

export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData: any;
  @ViewChild('chart') chart: ChartComponent;
  public areaChartOptions: Partial<areaChartOptions>;
  public barChartOptions: Partial<barChartOptions>;
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  runningCourseType:number;
  traineeCount:number;
  dbType:any;
  schoolCount:number;
  localCourseCount:number;
  interServiceTraineeCount:number;
  interServiceOfficerCount:number;
  interServiceCivilCount:number;
  interServiceSailorCount:number;
  intServiceCount:number;
  nomineeCount:number;
  interServiceCourses:any;
  viewStatus:any;
  viewCourseTitle:any;
  schoolId:any;
  UpcomingCourseCount:number;
  upcomingCourses:any;
  runningCourses:any;
  isJcosOpen:any;
  budgetCodes:any;
  dayCount:any;
  yearNow:any;
  status: any;
  branchId:any;
  traineeId:any;
  role:any;
  showHideDiv:any;

  groupArrays:{ schoolName: string; courses: any; }[];
  calendarEvents: EventInput[];
  calendarOptions: CalendarOptions;

  courseTypeId=MasterData.coursetype.InterService;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedColumns: string[] = ['ser','course', 'durationFrom', 'durationTo'];
  displayedUpcomingInterServiceColumns: string[] = ['ser','courseName', 'orgName','durationFrom','durationTo','dayCount', 'candidates'];
  displayedColumnsBudgetCode: string[] = ['sl', 'budgetCodes', 'availableAmount','targetAmount'];
  

  constructor(private datepipe: DatePipe, private authService: AuthService,private schoolDashboardService: SchoolDashboardService,private interServiceDashboardService: InterServiceDashboardService) {}
 

  ngOnInit() {

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    this.runningCourseType=this.masterData.coursetype.InterService;
    
    //this.getCourseDurationsByCourseType();
    this.getRunningCourseTotalTraineeByCourseType();
    this.getBudgetCodeList();
    // this.getSpCourseDurations(3);
    this.getJcoCourseDurations();
    this.getCoursesByViewType(1);
    this.getSpUpcomingCourseDurationsByTypeForInterService()

    // this.getSpSchoolCount();
    // this.getnominatedCourseListFromSpRequest();
    // this.getrunningCourseTotalOfficerListfromprocedure();
    
  }

  toggle() {
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle() {
    this.showHideDiv = false;
    this.print();
  }
  print() {
    let printContents, popupWin;
    printContents = document.getElementById("print-routine").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
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
                  
                    .table.table.tbl-by-group.db-li-s-in tr .cl-action{
                      display: none;
                    }
        
                    .table.table.tbl-by-group.db-li-s-in tr td{
                      text-align:center;
                      padding: 0px 5px;
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
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <h3>Running Courses</h3>
          
          </div>
          <br>
          <hr>
          ${printContents}
          
        </body>
      </html>`);
    popupWin.document.close();
  }
  onViewStatus(dropdown) {
    if (dropdown.isUserInput) {
      this.status = dropdown.source.value;
      console.log(this.status);
    }
  }
  getSpUpcomingCourseDurationsByTypeForInterService(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.interServiceDashboardService.getSpUpcomingCourseDurationsByTypeForInterService(this.runningCourseType,currentDateTime).subscribe(response => {           
      this.interServiceCourses=response;
      console.log(this.interServiceCourses)
    })
  }

  getCoursesByViewType(viewStatus){
    this.viewStatus = viewStatus;
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.interServiceDashboardService.getSpRunningForeignCourseDurationsByType(this.runningCourseType,currentDateTime,viewStatus).subscribe(response => {           
      this.interServiceCourses=response;
      console.log(this.interServiceCourses)
    })
  }

  // getCourseDurationsByCourseType(){
    
  //   let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  //   this.interServiceDashboardService.getSpRunningForeignCourseDurationsByType(this.runningCourseType,currentDateTime).subscribe(response => {           
  //     this.interServiceCourses=response;
  //     console.log(this.interServiceCourses)
  //   })
  // }

  getJcoCourseDurations(){
        this.interServiceDashboardService.getCentralCourseDuration(this.masterData.coursetype.CentralExam,this.masterData.courseName.JCOsTraining).subscribe(response => {           
      this.isJcosOpen=response.length;
      console.log("jco count"+this.isJcosOpen)
    })
  }

  getBudgetCodeList(){
    this.interServiceDashboardService.getBudgetCodeList().subscribe(res=>{
      this.budgetCodes=res 
      console.log(this.budgetCodes)
     });  
  }

  getDaysfromDate(dateFrom:any,dateTo:any){
    //Date dateTime11 = Convert.ToDateTime(dateFrom);  
    var date1 = new Date(dateFrom); 
	  var date2 =  new Date(dateTo);
    var Time = date2.getTime() - date1.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    this.dayCount = Days+1;
    return this.dayCount;
  }

  getCalculateAge(getStartDate, getEndDate,returnstatus){
    var currentDate = new Date(getEndDate);
    var startDate = new Date(getStartDate);

    this.yearNow = currentDate.getFullYear();
    var monthNow = currentDate.getMonth() + 1;
    var dateNow = currentDate.getDate();

    var yearDob = startDate.getFullYear();
    var monthDob = startDate.getMonth() + 1;
    var dateDob = startDate.getDate();
    var yearAge,monthAge,dateAge;
    
    yearAge = this.yearNow - yearDob;

    if (monthNow >= monthDob)
       monthAge = monthNow - monthDob;
    else {
      yearAge--;
       monthAge = 12 + monthNow -monthDob;
    }

    if (dateNow >= dateDob)
       dateAge = dateNow - dateDob;
    else {
      monthAge--;
       dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    if(returnstatus == 0){
      return (yearAge +" Years "+ monthAge +" Months "+ dateAge +" Days");
    }else if(returnstatus == 1){
      return (yearAge);
    }else if(returnstatus == 2){
      return (monthAge);
    }else if(returnstatus == 3){
      return (dateAge);
    }else{
      return 0;
    }
    
  }

  getRunningCourseTotalTraineeByCourseType(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.interServiceDashboardService.getRunningCourseTotalTraineeByCourseType(currentDateTime,this.runningCourseType,0).subscribe(response => {           
      this.interServiceTraineeCount=response.length;
    })
    this.interServiceDashboardService.getRunningCourseTotalTraineeByCourseType(currentDateTime,this.runningCourseType,this.masterData.TraineeStatus.officer).subscribe(response => {           
      this.interServiceOfficerCount=response.length;
    })
    this.interServiceDashboardService.getRunningCourseTotalTraineeByCourseType(currentDateTime,this.runningCourseType,this.masterData.TraineeStatus.sailor).subscribe(response => {           
      this.interServiceSailorCount=response.length;
    })
    this.interServiceDashboardService.getRunningCourseTotalTraineeByCourseType(currentDateTime,this.runningCourseType,this.masterData.TraineeStatus.civil).subscribe(response => {           
      this.interServiceCivilCount=response.length;
    })
  }  
 
  initializeEvents(){
    // this.dashboardService.getCourseDurationForEventCalendar().subscribe(res=>{
    //   //var durationData: EventInput[] = res;
    //   // const durationData: EventInput[] =res;
    //   // console.log(durationData)
    //   this.calendarEvents=INITIAL_EVENTS;
    //   // this.calendarEvents= [{
    //   //   id: "event1",
    //   //   title: "All Day Event",
    //   //   start: "2022-03-14T18:00:00",
    //   //   // start: new Date(year, month, day + 20, 10, 0),
    //   //   // end: new Date(year, month, 1, 23, 59),
    //   //    className: "fc-event-success",
    //   //   // groupId: "work",
    //   //   // details:
    //   //   //   "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    //   // }];
    // //  this.tempEvents = this.calendarEvents;
    //   this.calendarOptions.initialEvents = this.calendarEvents;
      
    // });
  }
  inActiveItem(id){
    this.courseTypeId = id;
    this.getSpCourseDurations(this.courseTypeId);    
  }
  getSpCourseDurations(id:number) {
    this.isLoading = true;
    this.courseTypeId = id;
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    console.log(currentDateTime);
    if(this.courseTypeId == this.masterData.coursetype.LocalCourse){
      // this.dashboardService.getSpCourseDurationsByType(this.courseTypeId,currentDateTime).subscribe(response => {   
      //   this.upcomingLocalCourses=response;
      //   // this gives an object with dates as keys
      //   const groups = this.upcomingLocalCourses.reduce((groups, courses) => {
      //     const schoolName = courses.schoolName;
      //     if (!groups[schoolName]) {
      //       groups[schoolName] = [];
      //     }
      //     groups[schoolName].push(courses);
      //     return groups;
      //   }, {});

      //   // Edit: to add it in the array format instead
      //   this.groupArrays = Object.keys(groups).map((schoolName) => {
      //     return {
      //       schoolName,
      //       courses: groups[schoolName]
      //     };
      //   });

      //   console.log(this.groupArrays)

      //   // this.upcomingLocalCourses=response;
      //   // console.log(response)
      // })
    }else if(this.courseTypeId === this.masterData.coursetype.ForeignCourse){
      // this.dashboardService.getSpForeignCourseDurationsByType(this.courseTypeId,currentDateTime).subscribe(response => {   
      //   this.upcomingForeignCourses=response;
      // })
    }else{
      // this.dashboardService.getSpCourseDurationsByType(this.courseTypeId,currentDateTime).subscribe(response => {   
      //   this.dataSource.data=response;
      // })
    }
    
  }
 

  getnominatedCourseListFromSpRequest(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    // this.dashboardService.getnominatedCourseListFromSpRequest(currentDateTime).subscribe(response => {   
      
    //   this.nomineeCount=response.length;
    // })
  }

  getrunningCourseTotalOfficerListfromprocedure(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    // this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.officer).subscribe(response => {         
    //   this.runningOfficerCount=response.length;
    // })
    // this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.sailor).subscribe(response => {         
    //   this.runningSailorCount=response.length;
    // })
    // this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.civil).subscribe(response => {         
    //   this.runningCivilCount=response.length;
    // })
  }

  getSpTotalTrainee() {
    // this.dashboardService.getSpTotalTraineeByTraineeStatus().subscribe(response => {   
    //   this.traineeCount=response
    // })
  }
  getSpSchoolCount() {
    // this.dashboardService.getSpSchoolCount().subscribe(response => {   
    //   this.schoolCount=response
    
    // })
  }

  getLocalCourseCount(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    // this.dashboardService.getSpRunningCourseDurationsByType(this.masterData.coursetype.LocalCourse,currentDateTime).subscribe(response => {           
    //   this.localCourseCount=response.length;
    // })
  }
  
  getIntServiceCount(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    // this.dashboardService.getSpRunningCourseDurationsByType(this.masterData.coursetype.InterService,currentDateTime).subscribe(response => {           
    //   this.intServiceCount=response.length;
    // })
  }
  

}
