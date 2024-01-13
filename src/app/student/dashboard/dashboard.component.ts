import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TraineeNominationService } from '../../course-management/service/traineenomination.service';
import { StudentDashboardService } from '../services/StudentDashboard.service';
import { BNASubjectNameService } from '../../subject-management/service/BNASubjectName.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { MasterData } from 'src/assets/data/master-data';
import { SpstudentInfoByTraineeId } from '../models/SpstudentInfoByTraineeId';
import { findIndex } from 'rxjs';
import { CourseModule } from 'src/app/basic-setup/models/CourseModule';
import { ClassRoutine } from 'src/app/routine-management/models/classroutine';
import { ReadingMaterial } from 'src/app/reading-materials/models/readingmaterial';
import { Attendance } from 'src/app/attendance-management/models/attendance';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { environment } from 'src/environments/environment';

export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
   masterData = MasterData;
  loading = false;
  public barChartOptions: Partial<barChartOptions>;
  public areaChartOptions: Partial<areaChartOptions>;
  GetStudentIdForm: FormGroup;
  studentData: SpstudentInfoByTraineeId;
  traineeId:number;
  userManual:any;
  isShown: boolean = false ;
  ApproveMsgScreen: boolean = false ;
  isBulletinShown: boolean = false ;
  CourseModuleByCourseName:CourseModule[];
  RoutineByCourseDuration:any;
  markListByDurationAndId:any;
  AttendanceByTraineeAndCourseDuration:Attendance[];
  ReadingMaterialBySchoolAndCourse:ReadingMaterial[];
  subjectLength:any;
  NoticeForStudent:any;
  todayroutine:any;
  traineeRemittanceNotification:any;
  studentOtherDocInfoList:any;
  studentOtherDocumentList:any;
  InterServiceDocumentList:any;
  studentGoDocumentList:any;
  bulletinList:any;
  branchName:any;
  pno: any;
  name: any;
  traineeNominationId:any;
  phoneNo: any;
  email:any;
  presentBillet: any;
  joinDate: any;
  position: any;
  durationFrom: any;
  durationTo: any;
  courseTitle: any;
  course: any;
  courseNameId: any;
  courseSectionId: any;
  baseSchoolNameId: any;
  QexamSubjectList: any;
  QexamRoutineList: any;
  StuffClgSubjectList: any;
  StuffClgRoutineList: any;
  attemptCount: any;
  subjectListBySaylorBranch: any;
  StudentAssignmentCount: any;
  StudentAssessnmentCount: any;
  attemptName: any;
  courseDurationId: any;
  inputId: any;
  traineeBranchId: any;
  courseTypeId: any;
  traineeImg: any;
  courseTypeName: any;
  schoolName: any;
  countryName: any;
  familyAllowId: any;
  baseNames: any;
  examCenterName: any;
  completeStatus: any;
  ApproveMsg: any;
  groupArrays:{ date: string; games: any; }[];
  options = [];
  fileUrl:any = environment.fileUrl;
  filteredOptions;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  
  displayedColumns: string[];
  displayedRoutineColumns: string[] = ['duration','subject'];
  displayedDocumentsColumns: string[] = ['ser','name','fileUpload'];
  displayedQexamSubjectListColumns: string[] = ['paperNo', 'subjectName', 'totalMark', 'passMarkBna','qExamTime', 'remarks'];
  displayedStuffClgColumns: string[] = ['paperNo', 'subjectName', 'totalMark', 'passMarkBna'];
  displayedStuffClgRoutineColumns: string[] = ['ser','bnaSubjectName','date','timeDuration'];
  displayedForeignRemittanceColumns: string[] = ['ser','installmentAmount','paymentType','nextInstallmentDate','status', 'receivedStatus'];
  displayedJcoSubjectColumns: string[] = ['paperNo', 'subjectName', 'totalMark', 'passMarkBna'];
  displayedJcoRoutineColumns: string[] = ['subject','date','time'];
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private confirmService: ConfirmService,private authService: AuthService , private datepipe: DatePipe,private route: ActivatedRoute,private BNASubjectNameService: BNASubjectNameService,private TraineeNominationService: TraineeNominationService,private studentDashboardService: StudentDashboardService) {}

  // Doughnut chart start
  public doughnutChartLabels: string[] = [
    'Development',
    'Java Classes',
    'Painting ',
    'Geography Class',
  ];
  public doughnutChartData: number[] = [32, 25, 20, 23];
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ['#5A5FAF', '#F7BF31', '#EA6E6C', '#28BDB8'],
    },
  ];

  public doughnutChartType = 'doughnut';
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    legend: {
      display: false,
    },
  }; 

  // Doughnut chart end

  ngOnInit() {
    const role = this.authService.currentUserValue.role.trim();
    const traineeId =  this.authService.currentUserValue.traineeId.trim();
    // const branchId =  this.authService.currentUserValue.branchId.trim();
    const branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(role, traineeId, branchId)

    this.studentDashboardService.getUserManualByRole(role).subscribe(response => {   
      console.log("user manual");
      console.log(response);
      this.userManual=response[0].doc;
      console.log(this.userManual);
    })

    //this.intitializeForm();

    this.inputId = traineeId;   
    console.log(this.inputId)
    this.studentDashboardService.getSpStudentInfoByTraineeId(this.inputId).subscribe(res=>{
      console.log(res)
      if(res){
        let infoList=res
        this.pno=infoList[0].pno,
        this.position=infoList[0].position,
        this.name=infoList[0].name,
        this.traineeNominationId=infoList[0].traineeNominationId,
        this.phoneNo=infoList[0].mobile,
        this.email=infoList[0].email,
        this.presentBillet=infoList[0].presentBillet,
        this.joinDate=infoList[0].joiningDate;
        this.traineeImg=infoList[0].bnaPhotoUrl, 
        this.durationFrom=infoList[0].durationFrom,
        this.courseTypeId=infoList[0].courseTypeId,
        this.attemptName=infoList[0].attemptName,
        this.durationTo=infoList[0].durationTo,
        this.courseTitle=infoList[0].courseTitle,
        this.course=infoList[0].course,
        this.courseNameId=infoList[0].courseNameId,
        this.courseSectionId=infoList[0].courseSectionId,
        this.traineeBranchId=infoList[0].branchId,
        this.schoolName=infoList[0].schoolName,
        this.countryName=infoList[0].countryName,
        this.courseTypeName=infoList[0].courseTypeName,
        this.familyAllowId=infoList[0].familyAllowId, 
        this.courseDurationId=infoList[0].courseDurationId;
        this.baseSchoolNameId=infoList[0].baseSchoolNameId;
        this.branchName=infoList[0].branchName;
        this.examCenterName=infoList[0].examCenterName;
        this.completeStatus=infoList[0].isCompletedStatus;
        console.log(this.courseTypeId,this.courseNameId,this.completeStatus)
        
        if(this.courseTypeId === this.masterData.coursetype.LocalCourse && this.completeStatus === 0){
          this.isShown=true;
          this.getTodayRoutine(this.courseDurationId,this.courseSectionId);
          this.gettraineeAssessmentForStudentSpRequest(this.inputId,this.courseDurationId);
          this.getActiveBulletins(this.baseSchoolNameId);
          this.getNoticeForTraineeDashboard(this.baseSchoolNameId, this.courseDurationId,this.inputId);
          this.getAssignmentCount(this.baseSchoolNameId,this.courseNameId,this.courseDurationId);
        }
        else if(this.courseTypeId === this.masterData.coursetype.ForeignCourse){
          this.isShown=true;
          console.log("it is foreign block")
          this.getTraineeRemittanceNotification(this.inputId,this.courseDurationId);
          this.getTraineeOtherDocInfo(this.inputId,this.courseDurationId);
          this.getTraineeOtherDocuments(this.inputId,this.courseDurationId);
          this.getTraineeGoDocument(this.courseDurationId);
        }
        else if(this.courseTypeId === this.masterData.coursetype.InterService){
          this.isShown=true;
          console.log("it is interservice block")
          // this.getTraineeRemittanceNotification(this.inputId,this.courseDurationId);
          // this.getTraineeOtherDocInfo(this.inputId,this.courseDurationId);
          
          this.getInterServiceDocuments(this.courseDurationId);
        }
        else if(this.courseTypeId === this.masterData.coursetype.CentralExam && this.courseNameId === this.masterData.courseName.QExam){
          this.isShown=true;
          this.getQexamSubjectList(this.courseNameId,this.traineeBranchId);
          this.getQexamRoutineByBranch(this.courseDurationId,this.traineeBranchId);
          this.getTraineeNominationCount(this.inputId,this.courseNameId);
          //this.getNoticeBySchoolId(this.baseSchoolNameId);
        }

        else if(this.courseTypeId === this.masterData.coursetype.CentralExam && this.courseNameId === this.masterData.courseName.StaffCollage){
          this.isShown=true;
          this.getStuffClgSubjectList();
          this.getStuffClgRoutine(this.courseDurationId);
          this.getTraineeNominationCount(this.inputId,this.courseNameId);
          //this.getNoticeBySchoolId(this.baseSchoolNameId);
        }

        else if(this.courseTypeId === this.masterData.coursetype.CentralExam && this.courseNameId === this.masterData.courseName.JCOsTraining){
          this.isShown=true;
          this.getSubjectListBySaylorBranch(this.courseNameId,infoList[0].saylorBranchId,infoList[0].saylorSubBranchId);
          this.getCurrentJcoRoutine(this.courseDurationId,infoList[0].saylorBranchId,infoList[0].saylorSubBranchId);
          // this.getTraineeNominationCount(this.inputId,this.courseNameId);
          //this.getNoticeBySchoolId(this.baseSchoolNameId);
          console.log("jceo")
        }
        
        // this.getReadingMaterialBySchoolAndCourse(infoList[0].baseSchoolNameId,infoList[0].courseNameId);      
        // this.getCourseModuleByCourseName(infoList[0].courseNameId);
        // this.getRoutineByCourseDuration(infoList[0].courseDurationId);
        // this.getMarkListByTraineeAndDuration(this.inputId,infoList[0].courseDurationId);
        
      }else{
        this.isShown=false;
      }
      
    }); 
    
  }

  gettraineeAssessmentForStudentSpRequest(traineeId,courseDurationId){ 
    // var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    this.studentDashboardService.gettraineeAssessmentForStudentSpRequest(courseDurationId,traineeId).subscribe(res=>{
      console.log("assessment.length"+res.length);
      this.StudentAssessnmentCount = res.length;
    });
  }
  // intitializeForm() {
  //   this.GetStudentIdForm = this.fb.group({
  //     traineeId:[],
  //     traineeName:['']  
  //   })
  // }

  

  // onSubmit(){
           
    
  // }

  getNoticeForTraineeDashboard(schoolId,durationId,traineeId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.studentDashboardService.getNoticeForTraineeDashboard(schoolId,currentDateTime,durationId,traineeId).subscribe(response => {   
      this.NoticeForStudent=response;
      console.log(response)
    })
  }

  getStuffClgRoutine(courseDurationId){
    this.studentDashboardService.getStuffClgRoutine(this.paging.pageIndex, this.paging.pageSize,this.searchText,courseDurationId).subscribe(response => {             
      this.StuffClgRoutineList = response.items; 
      console.log("Subject name");
      console.log(this.StuffClgRoutineList);
    })
  }
  getTraineeNominationCount(traineeId,courseNameId){
    this.studentDashboardService.getTraineeNominationCount(traineeId,courseNameId).subscribe(res=>{
      this.attemptCount=res
      console.log(this.attemptCount);
    });
  }
  getSubjectListBySaylorBranch(courseNameId,saylorBranchId,saylorSubBranchId){
    this.studentDashboardService.getSubjectListBySaylorBranch(courseNameId,saylorBranchId,saylorSubBranchId).subscribe(res=>{
      this.subjectListBySaylorBranch=res
      console.log(this.subjectListBySaylorBranch);
    });
  }

  getAssignmentCount(baseSchoolNameId,courseNameId,courseDurationId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.studentDashboardService.getAssignmentListForStudent(currentDateTime,baseSchoolNameId,courseNameId,courseDurationId).subscribe(response => {   
      this.StudentAssignmentCount=response.length;
      console.log("assignment count");
      console.log(this.StudentAssignmentCount)
    });
  }

  getActiveBulletins(baseSchoolNameId){
    this.isBulletinShown=true;
    this.studentDashboardService.getActiveBulletinList(baseSchoolNameId).subscribe(res=>{
      this.bulletinList=res;  
      console.log(this.bulletinList);
    });
  }

  getQexamSubjectList(courseNameId,branchId){
    this.studentDashboardService.getQexamSubjectList(branchId,courseNameId).subscribe(res=>{
      this.QexamSubjectList=res;  
      console.log(this.QexamSubjectList);
    });
  }

  getQexamRoutineByBranch(courseDurationId,branchId){
    this.studentDashboardService.getQexamRoutineByBranch(courseDurationId,branchId).subscribe(res=>{
      this.QexamRoutineList=res;  
      console.log(this.QexamRoutineList);

      for(let i=0;i<=this.QexamRoutineList.length;i++){

        console.log("Date"+this.QexamRoutineList[i]);
       }
       console.log(this.QexamRoutineList);

       this.displayedColumns =[...Object.keys(this.QexamRoutineList[0])];
       console.log([...Object.keys(this.QexamRoutineList[0])]);
       

       console.log(this.QexamRoutineList);
    });
  }

  getStuffClgSubjectList(){
    this.studentDashboardService.getStuffClgSubjectList().subscribe(res=>{
      this.StuffClgSubjectList=res;  
      console.log(this.StuffClgSubjectList);
    });
  }
  getTodayRoutine(courseDurationId,courseSectionId){
    this.studentDashboardService.getCurrentRoutineByTraineeId(courseDurationId,courseSectionId).subscribe(res=>{
      this.todayroutine=res;  
      console.log(this.todayroutine);
    });
  }

  getCurrentJcoRoutine(courseDurationId,saylorBranchId,saylorSubBranchId){
    this.studentDashboardService.getCurrentJcoRoutine(courseDurationId,saylorBranchId,saylorSubBranchId).subscribe(res=>{
      this.todayroutine=res;  
      console.log(this.todayroutine);
    });
  }

  getTraineeRemittanceNotification(traineeId,courseDurationId){
    this.studentDashboardService.getRemittanceNotificationForStudent(traineeId,courseDurationId).subscribe(res=>{
      this.traineeRemittanceNotification=res;  
      console.log(this.traineeRemittanceNotification);
    });
  }
  
  getTraineeOtherDocInfo(traineeId,courseDurationId){
    this.studentDashboardService.getStudentOtherDocInfo(traineeId,courseDurationId).subscribe(res=>{
      
      var approvedlistItemCount = res.length;
      console.log("check")
      console.log(res)
      if(approvedlistItemCount > 0 ){
        this.studentOtherDocInfoList=res; 
      }else{
        this.ApproveMsgScreen=true;
        this.ApproveMsg = "Data Is Processing!";
        console.log(this.ApproveMsg)
      } 
      console.log(this.studentOtherDocInfoList);
    });
  }
  
  getTraineeOtherDocuments(traineeId,courseDurationId){
    this.studentDashboardService.getStudentOtherDocuments(traineeId,courseDurationId).subscribe(res=>{
            
      this.studentOtherDocumentList=res;     
      console.log(this.studentOtherDocumentList);  
    });
  }
  getInterServiceDocuments(courseDurationId){
    this.studentDashboardService.getInterServiceDocuments(courseDurationId).subscribe(res=>{
            
      this.InterServiceDocumentList=res;     
      console.log(this.InterServiceDocumentList);  
    });
  }
  
  getTraineeGoDocument(courseDurationId){
    this.studentDashboardService.getStudentGoDocument(courseDurationId).subscribe(res=>{
            
      this.studentGoDocumentList=res;     
      console.log(this.studentGoDocumentList);  
    });
  }

  inActiveItem(row){
    console.log(row);
    const id = row.courseBudgetAllocationId;    
    //var baseSchoolNameId=this.CourseBudgetAllocationForm.value['baseSchoolNameId'];
    if(row.receivedStatus == 0){
      this.confirmService.confirm('Confirm Payment message', 'Have You Recieved This Installment').subscribe(result => {
        if (result) {
          this.studentDashboardService.ChangereceivedStatus(id,1).subscribe(() => {
           // this.getBulletins(baseSchoolNameId);
           this.getTraineeRemittanceNotification(this.inputId,this.courseDurationId);
            this.snackBar.open('Received Successfully!', '', { 
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          })
        }
      })
    }
  }

  changeDocStatus(row, fieldStatus){
    console.log(row);
    const id = row.foreignCourseOtherDocId;    
    //var baseSchoolNameId=this.CourseBudgetAllocationForm.value['baseSchoolNameId'];    
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Updating The Status?').subscribe(result => {
        if (result) {
          if(fieldStatus == 1){
            this.studentDashboardService.ChangeReleventDocStatus(id,'passport',true).subscribe(() => {
              // this.getBulletins(baseSchoolNameId);
              this.getTraineeOtherDocInfo(this.inputId,this.courseDurationId);
              this.snackBar.open('Updated Successfully!', '', { 
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: 'snackbar-success'
              });
            })
          } else if(fieldStatus == 2){
            this.studentDashboardService.ChangeReleventDocStatus(id,'dgfi',true).subscribe(() => {
              // this.getBulletins(baseSchoolNameId);
              this.getTraineeOtherDocInfo(this.inputId,this.courseDurationId);
              this.snackBar.open('Updated Successfully!', '', { 
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: 'snackbar-success'
              });
            })
          }
          
        }
      })
  }

  
}
