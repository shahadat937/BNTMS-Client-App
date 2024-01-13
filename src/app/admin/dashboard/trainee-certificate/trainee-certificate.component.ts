import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNASubjectName } from '../../../subject-management/models/BNASubjectName';
import { BNASubjectNameService } from '../../../subject-management/service/BNASubjectName.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseInstructorService } from '../../../subject-management/service/courseinstructor.service';
import { CourseNameService } from '../../../basic-setup/service/CourseName.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import {BNAExamMarkService} from '../../../bna-exam-management/service/bnaexammark.service';
import {CourseDurationService} from '../../../course-management/service/courseduration.service';
import {BIODataGeneralInfoService} from '../../../trainee-biodata/service/BIODataGeneralInfo.service';
import {RankService} from '../../../basic-setup/service/Rank.service';
import {SaylorRankService} from '../../../basic-setup/service/SaylorRank.service';
import { BaseSchoolNameService } from 'src/app/security/service/BaseSchoolName.service';

@Component({
  selector: 'app-trainee-certificate',
  templateUrl: './trainee-certificate.component.html',
  styleUrls: ['./trainee-certificate.component.sass']
})
export class TraineeCertificateListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  status=1;
  SelectedsubjectsBySchoolAndCourse:BNASubjectName[];
  courseTypeId:number;
  courseType3:any;
  coursesTypes:any;
  courseType:any;
  traineeId:any;
  branchId:any;
  GetInstructorByParameters:any[];
  GetTotalSubjectCalculation:any[];
  dbType1:any;
  traineeDb:any;
  schoolDb:any;
  schoolName:any;
  courseName:any;
  durationForm:Date;
  durationTo:Date;
  courseTitle:any;
  courseDurationId:any;
  courseListStatus:any;
  baseSchoolNameId:any;
  schoolLogo:any;
  trainee:any;
  traineeName:any;
  traineePno:any;
  traineeRank:any;
  traineePosition:any;
  course:any;
  showHideDiv= false;
  isShown:boolean=false;
  role:any;
  groupArrays:{ courseModule: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  traineeCertificateDetails:any[];

  displayedColumns: string[] = ['ser','subjectName','subjectType','totalPeriod','totalMark','passMarkBna','actions'];

  displayedInstructorColumns: string[]= ['ser','trainee','bnaSubjectName'];
   selection = new SelectionModel<BNASubjectName>(true, []);

// getExamMarkListByParameters
  
  constructor(private snackBar: MatSnackBar,private baseSchoolNameService:BaseSchoolNameService,private BNAExamMarkService:BNAExamMarkService,private saylorRankService:SaylorRankService,private rankService:RankService,private courseDurationService:CourseDurationService,private biodataService:BIODataGeneralInfoService,private authService: AuthService,private courseNameService:CourseNameService,private CourseInstructorService: CourseInstructorService ,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 

    this.baseSchoolNameService.find(this.baseSchoolNameId).subscribe(res=>{
      console.log(res);
      this.schoolLogo = res.schoolLogo;
      this.schoolName = res.schoolName;
      if(!this.schoolLogo){
        this.schoolLogo = 'assets/images/login/navy-logo.png';
      }
    });  

    this.BNAExamMarkService.getTraineeCertificateDetailsByParameters(this.baseSchoolNameId,this.courseDurationId,this.traineeId).subscribe(res=>{
      this.traineeCertificateDetails=res;      
      console.log("tgg");
      console.log(this.traineeCertificateDetails);  
      this.traineePosition = res[0].position;
      this.isShown=true;
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
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin = window.open('top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            @font-face {
              font-family: stencil;
              src: url(/assets/fonts/text-fonts/Stencil_Regular.ttf);
            }
            @font-face {
              font-family: monotypecorsiva;
              src: url(/assets/fonts/text-fonts/Monotype_Corsiva.ttf);
            }
            @font-face {
              font-family: 'AlgerianRegular';
              src: url(/assets/fonts/text-fonts/AlgerianRegular.ttf) format("truetype");;
            }
            @page {
              size: A4;
              size: landscape;
              margin: 48px;
            }
            body{  
              width: 99%;
            }
            .dotted-border {
              display: inline-block;
              border-bottom: 2px dotted #000;
              margin-left: 5px;
              text-align: center;
              line-height: 20px;
            }
            
            .ser-field {
              width: 50px;
            }
            .top-logo-ser-section .school-logo{
              width: 150px;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            .ser-top-left {
              position: relative;
              top: 25px;
              font-size: 22px;
            }
            .pno-field {
              width: 15%;
            }
            .rank-field {
              width: 20%;
            }
            .name-field {
              width:45.5%;
            }
            .p-0 {
              padding: 0;
            }
            .course-field {
              width: 64.7%;
              font-family: stencil;
              font-size: 17pt;
              text-transform: uppercase;
            }
            .week-field {
              width: 8%;
            }
            .du-from-field,.du-to-field {
              width: 30.8%;
            }
            .total-marks-field {
              width: 10%;
            }
            .trainee-pos-field, .total-pos-field {
              width: 5%;
            }
            .col-xs-4 {
              width: 33.33333333%;
              float: left;
            }

            .pm-certificate-container .pm-certificate-border {
              width: 96.5%;
              border-radius: 15px;
              padding: 20px;
              background-image: url("./../images/bg/Certificate-border.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              margin:48px;
            }

            .bold {
              font-weight: bold;
            }
            .block {
              display: block;
            }
            .text-center {
              text-align: center !important;
            }
            .pm-certificate-container {
              width: 100%;
            }
            .pm-certificate-container .col-xs-2, .pm-certificate-container .col-xs-4, .pm-certificate-container .col-xs-6, .pm-certificate-container .col-xs-8, .pm-certificate-container .col-xs-12{
              margin: 0 !important;
            }
            .pm-certificate-container .pm-certificate-footer .col-xs-4 {
              margin-bottom: 1px !important;
            }
            .pm-certificate-container .pm-certificate-footer .col-xs-4 .pm-credits-text {
              padding-bottom: 10px !important;
            }
            .pm-certificate-container .pm-certificate-border .pm-certificate-block {
              width: 100%;
            }
            
            .pm-certificate-container .pm-certificate-border .pm-certificate-title {
              position: relative;
            }
            .pm-certificate-container .pm-certificate-border .pm-certificate-title h2 {
              font-size: 50px !important;
              margin: 0;
              font-family: 'AlgerianRegular';
            }
            .pm-certificate-container .pm-certificate-border .pm-certificate-body {
              padding: 20px;
              padding-top: 0px;
              font-family: monotypecorsiva;
            }
            .pm-certificate-container .pm-certificate-border .pm-certificate-body .pm-name-text {
              font-size: 37px;
              font-family: 'AlgerianRegular';
            }
            .pm-certificate-container .pm-certificate-border .pm-earned .pm-credits-text {
              font-size: 22px;
            }
            .pm-certificate-container .pm-certificate-border .pm-course-title .pm-earned-text {
              font-size: 22px;
            }
            .pm-certificate-container .pm-certificate-border .pm-certified {
              font-size: 22px;
            }
            
            .pm-certificate-container .pm-certificate-border .pm-certificate-footer {
              width: 100%;
              margin-top: 75px;
            }
            .border-certificate {
              width: 99%;
              position: absolute;
              height: 690px;
            }
            .watermark-certificate {
              position: absolute;
              left: 40%;
              top: 40%;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          </div>
          ${printContents}
          
        </body>
      </html>`
    );
    popupWin.document.close();

  }

}
