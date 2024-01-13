//import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import { Calendar } from '../../../calendar/models/calendar';
import { CalendarService } from '../../../calendar/service/calendar.service';
//import { PageEvent } from '@angular/material/paginator';
//import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CourseDurationService} from '../services/courseduration.service';
import {dashboardService} from '../services/dashboard.service';
import {MasterData} from 'src/assets/data/master-data';
import {CourseDuration} from '../models/courseduration';
import {SpCourseDuration} from '../models/spcourseduration';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { INITIAL_EVENTS } from '../../../calendar/events-util';
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
import { SpOfficerDetails } from '../models/spofficerdetails';
import { AuthService } from 'src/app/core/service/auth.service';
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
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
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
  ELEMENT_DATA: CourseDuration[] = [];
  upcomingLocalCourses:SpCourseDuration[];
  upcomingForeignCourses:SpCourseDuration[];
  runningCourses:SpCourseDuration[];
  runningForeignCourses:SpCourseDuration[];
  isLoading = false;
  courseTypeId=3;
  runningCourseType:number;
  traineeCount:number;
  dbType:any;
  schoolCount:number;
  localCourseCount:number;
  foreignCourseCount:number;
  intServiceCount:number;
  nomineeCount:number;
  notificationCount:any=0;
  branchId:any;
  traineeId:any;
  role:any;


  filterItems: string[] = [
    'work',
    'personal',
    'important',
    'travel',
    'friends',
  ];

  calendarEvents: EventInput[];
  tempEvents: EventInput[];

  public filters = [
    { name: 'work', value: 'Work', checked: true },
    { name: 'personal', value: 'Personal', checked: true },
    { name: 'important', value: 'Important', checked: true },
    { name: 'travel', value: 'Travel', checked: true },
    { name: 'friends', value: 'Friends', checked: true },
  ];

  runningOfficerCount:number;
  CountedRunningOfficer:SpOfficerDetails[];
  runningSailorCount:number;
  foreignNomineeCount:number;
  CountedSailorOfficer:SpOfficerDetails[];
  runningCivilCount:number;
  CountedCivilOfficer:SpOfficerDetails[];
  groupArrays:{ schoolName: string; courses: any; }[];

  calendarOptions: CalendarOptions;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','schoolName','course','noOfCandidates','professional','nbcd','durationFrom','durationTo', 'remark', 'actions'];

  displayedUpcomingForeignColumns: string[] = ['ser','courseTitle','courseName','durationFrom','durationTo', 'country', 'actions'];

  dataSource: MatTableDataSource<SpCourseDuration> = new MatTableDataSource();

  selection = new SelectionModel<CourseDuration>(true, []);
  

  constructor(private datepipe: DatePipe, private authService: AuthService,private CourseDurationService: CourseDurationService,private dashboardService: dashboardService) {}
 

  ngOnInit() {
    //  this.calendarEvents = INITIAL_EVENTS;
    //  console.log(INITIAL_EVENTS)
  
   // this.calendarEvents=INITIAL_EVENTS;
   this.role = this.authService.currentUserValue.role.trim();
   this.traineeId =  this.authService.currentUserValue.traineeId.trim();
   // this.branchId =  this.authService.currentUserValue.branchId.trim();
   this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
   console.log(this.role, this.traineeId, this.branchId)


  this.dashboardService.getCourseDurationForEventCalendar().subscribe(res=>{
   
  //  this.calendarEvents=INITIAL_EVENTS;
  this.calendarEvents= res;
  console.log(res)
  this.calendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events:this.calendarEvents,
    //select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this),
  };
  
  // this.calendarOptions.initialEvents = this.calendarEvents;
    
  });
    // this.calendarEvents= [{
    //   id: "event1",
    //   title: "All Day Event",
    //   start: "2022-03-14T18:00:00",    
    //    className: "fc-event-success",     
    // }];

    // this.calendarOptions.initialEvents = this.calendarEvents;

    this.chart1();
    this.chart2();
    // this.getLocalCourseCount();
    // this.getForeignCourseCount();
    // this.getIntServiceCount();
    this.getSpCourseDurations(3);
    // this.getSpTotalTrainee();

    // this.getSpSchoolCount();
   this.getNotificationReminderForDashboard();
    this.getnominatedCourseListFromSpRequest();
    this.getrunningCourseTotalOfficerListfromprocedure();
    
  }

  
 
  initializeEvents(){
    this.dashboardService.getCourseDurationForEventCalendar().subscribe(res=>{
      //var durationData: EventInput[] = res;
      // const durationData: EventInput[] =res;
      // console.log(durationData)
      this.calendarEvents=INITIAL_EVENTS;
      // this.calendarEvents= [{
      //   id: "event1",
      //   title: "All Day Event",
      //   start: "2022-03-14T18:00:00",
      //   // start: new Date(year, month, day + 20, 10, 0),
      //   // end: new Date(year, month, 1, 23, 59),
      //    className: "fc-event-success",
      //   // groupId: "work",
      //   // details:
      //   //   "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      // }];
    //  this.tempEvents = this.calendarEvents;
      this.calendarOptions.initialEvents = this.calendarEvents;
      
    });
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
      this.dashboardService.getSpCourseDurationsByType(this.courseTypeId,currentDateTime).subscribe(response => {   
        this.upcomingLocalCourses=response;
        // this gives an object with dates as keys
        const groups = this.upcomingLocalCourses.reduce((groups, courses) => {
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

        console.log(this.groupArrays)

        // this.upcomingLocalCourses=response;
        // console.log(response)
      })
    }else if(this.courseTypeId === this.masterData.coursetype.ForeignCourse){
      this.dashboardService.getSpForeignCourseDurationsByType(this.courseTypeId,currentDateTime).subscribe(response => {   
        this.upcomingForeignCourses=response;
      })
    }else{
      this.dashboardService.getSpCourseDurationsByType(this.courseTypeId,currentDateTime).subscribe(response => {   
        this.dataSource.data=response;
      })
    }
    
  }
  getNotificationReminderForDashboard(){
    // let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.dashboardService.getNotificationReminderForDashboard(this.role,this.branchId).subscribe(response => {         
      this.notificationCount=response[0].notificationCount;
      console.log("notify "+this.notificationCount)
    })
  }

  getnominatedCourseListFromSpRequest(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.dashboardService.getnominatedCourseListFromSpRequest(currentDateTime).subscribe(response => {   
      
      this.nomineeCount=response.length;
    })
  }

  getrunningCourseTotalOfficerListfromprocedure(){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.officer).subscribe(response => {         
      this.runningOfficerCount=response.length;
    })
    this.dashboardService.getnominatedForeignTraineeFromSpRequestBySchoolId(currentDateTime, this.masterData.OfficerType.Foreign).subscribe(response => {         
        this.foreignNomineeCount=response.length;
        console.log(response)
      })
    this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.sailor).subscribe(response => {         
      this.runningSailorCount=response.length;
    })
    this.dashboardService.getrunningCourseTotalOfficerListfromprocedureRequest(currentDateTime, this.masterData.TraineeStatus.civil).subscribe(response => {         
      this.runningCivilCount=response.length;
    })
  }

  // getSpTotalTrainee() {
  //   this.dashboardService.getSpTotalTraineeByTraineeStatus().subscribe(response => {   
  //     this.traineeCount=response
  //   })
  // }
  // getSpSchoolCount() {
  //   this.dashboardService.getSpSchoolCount().subscribe(response => {   
  //     this.schoolCount=response
    
  //   })
  // }

  // getLocalCourseCount(){
  //   let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  //   this.dashboardService.getSpRunningCourseDurationsByType(this.masterData.coursetype.LocalCourse,currentDateTime).subscribe(response => {           
  //     this.localCourseCount=response.length;
  //   })
  // }
  // getForeignCourseCount(){
  //   let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  //   this.dashboardService.getSpRunningForeignCourseDurationsByType(this.masterData.coursetype.ForeignCourse,currentDateTime).subscribe(response => {           
  //     this.foreignCourseCount=response.length;
  //     console.log("foreign count"+this.foreignCourseCount)
  //   })
  // }
  // getIntServiceCount(){
  //   let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  //   this.dashboardService.getSpRunningForeignCourseDurationsByType(this.masterData.coursetype.InterService,currentDateTime).subscribe(response => {           
  //     this.intServiceCount=response.length;
  //   })
  // }
  
  


  



  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'new students',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'old students',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#9F8DF1', '#E79A3B'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'percent',
          data: [5, 8, 10, 14, 9, 7, 11, 5, 9, 16, 7, 5],
        },
      ],
      chart: {
        height: 320,
        type: 'bar',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#9aa0ac'],
        },
      },

      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        position: 'bottom',
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        colors: ['#4F86F8', '#4F86F8'],
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + '%';
          },
        },
      },
    };
  }
}
