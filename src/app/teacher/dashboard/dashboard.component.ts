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
import { Role } from 'src/app/core/models/role';

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
  GetInstructorForm: FormGroup;
  traineeId:any;
  courseDurationId:any;
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

  qexamCount:any;
  stuffxmCount:any;
  jcoxmCount:any;

  courseList:any;
  courseTypeId:any;

  routineList:any;
  upcomingCoursesList:any;
  traineeImg: any;
  materialList:any;
  userManual:any;

  groupArrays:{ course: string; courses: any; }[];

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
    // const branchId =  this.authService.currentUserValue.branchId.trim();
    const branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, branchId)
    // this.intitializeForm();
    // this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    // this.getSpCurrentRoutineForStudentDashboard(this.traineeId);
    //this.traineeId=this.route.snapshot.paramMap.get('traineeId'); 
    console.log(this.traineeId+"ggggg")
    this.getSpCurrentRoutineForStudentDashboard(this.traineeId);
    this.getActiveQexam(this.traineeId);
    this.getActiveJcoexam(this.traineeId);
    this.getActiveStuffexam(this.traineeId);

    this.studentDashboardService.getUserManualByRole(this.role).subscribe(response => {   
      console.log("user manual");
      console.log(response);
      this.userManual=response[0].doc;
      console.log(this.userManual);
    });

    this.instructorDashboardService.getSpInstructorInfoByTraineeId(this.traineeId).subscribe(res=>{
      if(res){
        this.courseList = res;
        let infoList=res;
        this.pno=infoList[0].pno,
        this.position=infoList[0].position,
        this.name=infoList[0].name,
        this.name1=infoList[0].name1,
        this.courseDurationId=infoList[0].courseDurationId,
        this.schoolName=infoList[0].schoolName,
        this.courseTypeId=infoList[0].courseTypeId,
        this.joiningDate=infoList[0].joiningDate, 
        this.traineeImg=infoList[0].bnaPhotoUrl, 
        
        this.schoolId=infoList[0].baseSchoolNameId, 
        
        
        
        console.log("instructor data"+this.courseDurationId)
        console.log(res)
      }else{
        this.isShown=false;
      }
      
      if(this.userExists(res,this.masterData.coursetype.LocalCourse)){
        console.log("local user")
        this.isShown=true;
        this.getActiveBulletins(res[0].baseSchoolNameId)
        this.getNoticeBySchoolId(res[0].baseSchoolNameId)
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

  userExists(dataList,courseTypeId) {
    console.log(dataList);
    return dataList.some(function(el) {
      return el.courseTypeId === courseTypeId;
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

      // this gives an object with dates as keys
      const groups = this.upcomingCoursesList.reduce((groups, courses) => {
        const courseName = courses.course + "_" + courses.courseTitle;
        if (!groups[courseName]) {
          groups[courseName] = [];
        }
        groups[courseName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((course) => {
        return {
          course,
          courses: groups[course]
        };
      });
      console.log(this.groupArrays);

      console.log("dddd");
      console.log(res)
    });
  }

  getActiveBulletins(baseSchoolNameId){
    this.studentDashboardService.getIndividualBulletinListByTraineeId(baseSchoolNameId,this.traineeId).subscribe(res=>{
      this.bulletinList=res;  
      console.log(this.bulletinList);
    });
  }
  
  getActiveQexam(traineeId){
    this.instructorDashboardService.getSpInstructorInfoForCentralExam(traineeId,this.masterData.coursetype.CentralExam,this.masterData.courseName.QExam).subscribe(res=>{
      this.qexamCount=res.length;  
      console.log("qexam"+this.qexamCount);
    });
  }

  getActiveJcoexam(traineeId){
    this.instructorDashboardService.getSpInstructorInfoForCentralExam(traineeId,this.masterData.coursetype.CentralExam,this.masterData.courseName.JCOsTraining).subscribe(res=>{
      this.jcoxmCount=res.length;  
      console.log("jco"+this.qexamCount);
    });
  }
  
  getActiveStuffexam(traineeId){
    this.instructorDashboardService.getSpInstructorInfoForCentralExam(traineeId,this.masterData.coursetype.CentralExam,this.masterData.courseName.StaffCollage).subscribe(res=>{
      this.stuffxmCount=res.length;  
      console.log("stuff "+this.stuffxmCount);
    });
  }

  getNoticeBySchoolId(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.studentDashboardService.getNoticeBySchoolId(schoolId,currentDateTime).subscribe(response => {   
      this.NoticeForInstructor=response;
      console.log(response)
    })
  }

}
