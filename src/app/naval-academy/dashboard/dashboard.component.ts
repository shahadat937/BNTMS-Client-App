import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorDashboardService } from '../services/InstructorDashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { StudentDashboardService } from 'src/app/student/services/StudentDashboard.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';

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
  GetInstructorForm: FormGroup;
  traineeId:any;
  isShown: boolean = false ;
  subjectLength:any;
  pno: any;
  name: any;
  position: any;
  name1: any;
  joiningDate: any;
  schoolName: any;
  schoolId: any;
  bulletinList:any;
  role:any;
  NoticeForInstructor:any;
  fileUrl:any = environment.fileUrl;

  courseList:any;

  routineList:any;
  upcomingCoursesList:any;

  materialList:any;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  displayedUpcommingColumns: string[] = ['ser', 'course','durationForm','subjectName'];
  displayedCourseColumns: string[] = ['ser','schoolName','course', 'subjectName'];
  displayedRoutineColumns: string[] = ['ser', 'date','schoolName','duration', 'course','subject', 'location'];
  displayedReadingMaterialColumns: string[] = ['ser','readingMaterialTitle','documentName','documentLink'];
  

  constructor(private fb: FormBuilder, private authService: AuthService, private datepipe: DatePipe, private studentDashboardService: StudentDashboardService,private route: ActivatedRoute,private instructorDashboardService: InstructorDashboardService) {}
  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    const branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, branchId)
    this.chart1();
    this.chart2();
    // this.intitializeForm();
    // this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    // this.getSpCurrentRoutineForStudentDashboard(this.traineeId);
    //this.traineeId=this.route.snapshot.paramMap.get('traineeId'); 
    console.log(this.traineeId+"ggggg")
    this.getSpCurrentRoutineForStudentDashboard(this.traineeId);
    this.instructorDashboardService.getSpInstructorInfoByTraineeId(this.traineeId).subscribe(res=>{
      if(res){
        this.courseList = res;
        let infoList=res;
        this.pno=infoList[0].pno,
        this.position=infoList[0].position,
        this.name=infoList[0].name,
        this.name1=infoList[0].name1,
        this.schoolName=infoList[0].schoolName,
        this.joiningDate=infoList[0].joiningDate, 
        this.schoolId=infoList[0].baseSchoolNameId, 
        this.getActiveBulletins(infoList[0].baseSchoolNameId)
        this.getNoticeBySchoolId(infoList[0].baseSchoolNameId)
        this.isShown=true;
        console.log(res)
      }else{
        this.isShown=false;
      }
      
    });  
    
    this.instructorDashboardService.getSpInstructorRoutineByTraineeId(this.traineeId).subscribe(res=>{
      this.routineList = res;
      console.log(res)
    });

    this.instructorDashboardService.getSpReadingMaterialByTraineeId(this.traineeId).subscribe(res=>{
      this.materialList = res;
      console.log(res)
    });
  }

  // intitializeForm() {
  //   this.GetInstructorForm = this.fb.group({
  //     traineeId:[],
  //     traineeName:['']  
  //   })
  // }


  // onSubmit(){
  //   const id = this.GetInstructorForm.get('traineeId').value;  

    
    
  // }

  getSpCurrentRoutineForStudentDashboard(id){
    this.instructorDashboardService.getSpCurrentRoutineForStudentDashboard(id).subscribe(res=>{
      this.upcomingCoursesList = res;
      console.log("dddd");
      console.log(res)
    });
  }

  getActiveBulletins(baseSchoolNameId){
    this.studentDashboardService.getActiveBulletinList(baseSchoolNameId).subscribe(res=>{
      this.bulletinList=res;  
      console.log(this.bulletinList);
    });
  }

  getNoticeBySchoolId(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.studentDashboardService.getNoticeBySchoolId(schoolId,currentDateTime).subscribe(response => {   
      this.NoticeForInstructor=response;
      console.log(response)
    })
  }

  private chart1() {
    this.avgLecChartOptions = {
      series: [
        {
          name: 'Avg. Lecture',
          data: [65, 72, 62, 73, 66, 74, 63, 67],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {},
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#35fdd8'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
        width: 200,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Science', 'Mathes', 'Economics', 'History', 'Music'],
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };
  }
}
