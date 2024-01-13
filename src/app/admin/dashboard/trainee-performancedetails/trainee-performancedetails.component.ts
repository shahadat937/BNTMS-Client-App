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

@Component({
  selector: 'app-trainee-performancedetails',
  templateUrl: './trainee-performancedetails.component.html',
  styleUrls: ['./trainee-performancedetails.component.sass']
})
export class TraineePerformanceDetailsListComponent implements OnInit {
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
  trainee:any;
  course:any;
  showHideDiv= false;
  role:any;
  groupArrays:{ courseModule: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  getMarkList:any[];

  displayedColumns: string[] = ['ser','subjectName','subjectType','totalPeriod','totalMark','passMarkBna','actions'];

  displayedInstructorColumns: string[]= ['ser','trainee','bnaSubjectName'];
   selection = new SelectionModel<BNASubjectName>(true, []);

// getExamMarkListByParameters
  
  constructor(private snackBar: MatSnackBar,private BNAExamMarkService:BNAExamMarkService,private saylorRankService:SaylorRankService,private rankService:RankService,private courseDurationService:CourseDurationService,private biodataService:BIODataGeneralInfoService,private authService: AuthService,private courseNameService:CourseNameService,private CourseInstructorService: CourseInstructorService ,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    
    this.getSubjectNames(); 
    
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
            @font-face {
              font-family: stencil;
              src: url(/assets/fonts/text-fonts/Stencil_Regular.ttf);
            }
            @font-face {
              font-family: monotypecorsiva;
              src: url(/assets/fonts/text-fonts/Monotype_Corsiva.ttf);
            }
            @font-face {
              font-family: arialfont;
              src: url(/assets/fonts/text-fonts/arial.ttf);
            }
            body{  
              width: 99%;
            }
            label { 
              font-weight: 400;
              font-size: 13px;
              padding: 2px;
              margin-bottom: 5px;
            }
            table, td, th {
              border: 1px solid silver;
            }                    
            .tbl-by-group.db-li-s-in tr .btn-tbl-view {
              display:none;
            }
            table th,table td {
              font-size: 16px;
              font-family: arialfont;
              text-align:center;
            }
            table th h5{
              margin:0;
              font-size: 21px;
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
              margin-bottom:8px;
            }
            .performance-details-header-txt{
              font-family: stencil;
              font-size: 27px;                  
              letter-spacing: 1.5pt;
            }
            .db-li-s-in.traine-performance-details tr:last-child td {
              font-weight: bold;
            }
            .db-li-s-in.traine-performance-details tr:last-child td:nth-child(1) {
              border-right: none !important;
              color: transparent !important;
            }
            .db-li-s-in.traine-performance-details tr:last-child td:nth-child(2) {
              border-left: none !important;
              text-align: center;
            }
            .incharge-font{
              width:85%;
              text-align:right;
              font-size:28px;
              font-family:monotypecorsiva;
            }
            .traine-performance-details .sub-name{
              text-align:left;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <h3 class="performance-details-header-txt"><u>PERFORMANCE DETAILS</u></h3>
          </div>
          <br class="only-for-print">
          ${printContents}
          
        </body>
      </html>`
    );
    popupWin.document.close();

}
 
  getSubjectNames() {
    this.isLoading = true;
    // this.courseListStatus = this.route.snapshot.paramMap.get('courseListStatus'); 
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    //var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
   // this.dbType1 = this.route.snapshot.paramMap.get('dbType1'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 

    this.biodataService.findTraineeDetails(this.traineeId).subscribe(res => {
      this.trainee =res.name + " (PNo/ONo " + res.pno +")";
      if(res.rankId){
        this.rankService.find(res.rankId).subscribe(res=>{
          this.trainee =  res.position +" "+ this.trainee;
          console.log(this.trainee);
        });
      }else if(res.saylorRankId){
        this.saylorRankService.find(res.saylorRankId).subscribe(res=>{
          this.trainee =  res.name +" "+ this.trainee;
          console.log(this.trainee);
        });
      }      
    });

    this.courseDurationService.find(this.courseDurationId).subscribe(res=>{
      console.log(res)
      console.log("course");
      this.course =  res.courseName + " - " + res.courseTitle;
      this.schoolName= res.baseSchoolName;

      console.log(this.course);
      console.log("course");

    });

    this.BNAExamMarkService.getTraineePerformanceDetailsByParameters(this.baseSchoolNameId,this.courseDurationId,this.traineeId).subscribe(res=>{
      this.getMarkList=res;      
      console.log("tgg");
      console.log(this.getMarkList);  
    }); 

   
    
  }

}
