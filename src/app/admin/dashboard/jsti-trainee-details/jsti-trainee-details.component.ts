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
import { Location } from '@angular/common';

@Component({
  selector: 'app-jsti-trainee-details',
  templateUrl: './jsti-trainee-details.component.html',
  styleUrls: ['./jsti-trainee-details.component.sass']
//   styleUrls: [
//     'http://example.com/external.css',
//     'app/local.css'
// ],
})
export class JstiTraineeDetailsComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  status=1;
  SelectedsubjectsBySchoolAndCourse:BNASubjectName[];
  courseTypeId:number;
  jstiTraineeDetails:any;
  jstiTraineeChildrenDetails:any;
  jstiChildrenData=false;
  jstiTraineeSiblingDetails:any;
  jstiSiblingData=false;
  jstiTraineeEducations:any;
  jstiEducationData=false;
  jstiTraineeMilitaryTrainig:any;
  jstiMilitaryData=false;
  jstiTraineeRecordOfService:any;
  jstiRecordData=false;
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
  showHideDiv= false;
  role:any;
  groupArrays:{ courseModule: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','subjectName','subjectType','totalPeriod','totalMark','passMarkBna','actions'];

  displayedInstructorColumns: string[]= ['ser','trainee','shortCode','bnaSubjectName','subjectShortName'];
   selection = new SelectionModel<BNASubjectName>(true, []);


  constructor(private snackBar: MatSnackBar, private location:Location, private authService: AuthService,private courseNameService:CourseNameService,private CourseInstructorService: CourseInstructorService ,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    var traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    this.getJstiTraineeBasicInfoDetails(traineeId); 
    this.getTraineeEducationalQualification(traineeId); 
    this.getTraineeMilitaryTrainings(traineeId); 
    this.getTraineeRecordOfServices(traineeId); 
    this.getParentRelativeListType(traineeId,11); //for children
    this.getParentRelativeListType(traineeId,22); //for brother/sister
  }
  backButton(){
    this.location.back();
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
            label { 
              font-weight: 400;
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

            .col-lg-2 {
              flex: 0 0 auto;
              width: 16.66666667%;
              float:left;
          }
          .col-lg-8 {
            flex: 0 0 auto;
            width: 66.66666667%;
            float:left;
        }
        .col-lg-12 {
          flex: 0 0 auto;
          width: 100%;
          float:left;
      }
      .col-lg-6 {
        flex: 0 0 auto;
        width: 50%;
        float:left;
    }
    .col-lg-4 {
      flex: 0 0 auto;
      width: 33.33333333%;
      float:left;
  }
        .row {
          display: flex;
          flex-wrap: wrap;
      }

            .biodata-bg {
              background: #fff;
              margin: 0px !important;
              font-family: timesNewRoman;
          }
          .bio-title .biodata-title h3 {
              text-align: center;
              font-weight: bold;
              text-decoration: underline;
              font-size: 20px;
              margin-bottom:0px;
          }
          .bio-title .img-box {
              border: 1px solid;
              text-align: center;
              float: right;
          }
          .bio-title .img-box img{
            height: 155px;
            width: 145px;
          }
          .biodata-bg .counting {
              width: 5%;
              float: left;
          }
          .biodata-bg .inner-txt {
              width: 95%;
              float: left;
          }
          .biodata-bg .solid-border {
              display: inline-block;
              border-bottom: 1px solid #000;
              margin-left: 5px;
              text-align: center;
              line-height: 22px;
          }
          .personal-info .personal .txt {
              position: relative;
              top: 5px;
          }
          .personal .pno-space {
              width: 15%;
          }
          .personal .rank-space {
              width: 25%;
          }
          .personal .seniority-space {
              width: 32.1%;
          }
          .personal .name-space {
              width: 86.5%;
          }
          .personal .commission-date-space {
              width: 30%;
          }
          .full-width-txt{
            width:100%;
            text-align:center;
          }
          .full-width-txt .align-center{
            text-align:center;
          }
          .personal .branch-space {
              width: 33%;
          }
          .personal .birth-date-space {
              width: 30%;
          }
          .personal .place-space {
              width: 43.1%;
          }
          .personal .heignt-space {
              width: 75%;
          }
          .personal .weight-space {
              width: 78%;
          }
          .personal .blood-grp-space {
              width: 58.3%;
          }
          .personal .medical-cat-space {
              width: 47.8%;
          }
          .personal .religion-space {
              width: 88%;
          }
          .personal .maritial-status-space {
              width: 35%;
          }
          .personal .maritial-date-space {
              width: 21%;
          }
          .personal .family-location-space {
              width: 77%;
          }
          .personal .wife-name-space {
              width: 80.8%;
          }
          .personal .left-float {
              float: left;
          }
          .personal .children .child-sno {
              width: 8%;
          }
          .personal .children .child-name {
              width: 40%;
          }
          .personal .children .child-sex {
              width: 22%;
          }
          .personal .children .child-age {
              width: 30%;
          }
          .personal .children p {
              margin-bottom: 2px;
          }
          
          .personal span {
            font-size: 22px;
        }
          .biodata-bg .personal .children .solid-border {
              margin-left: 0px;
          }
          .personal .children .child-name-space {
              width: 80%;
          }
          .personal .children .child-sex-space {
              width: 70%;
          }
          .personal .children .child-age-space {
              width: 98.5%;
          }
          .personal .father-space {
              width: 90.5%;
          }
          .personal .occupation-space {
              width: 84.8%;
          }
          .personal .mother-space {
              width: 89.6%;
          }
          .personal .prsnt-add-line-1-space {
              width: 65.8%;
          }
          .personal .prsnt-add-line-2-space, .personal .prament-add-line-2-space,.personal .emrgncy-line-2-space,.personal .trast-acc-line-2-space {
              width: 100%;
          }
          .personal .prament-add-line-1-space {
              width: 61.5%;
          }
          .personal .trast-acc-line-1-space {
              width: 39%;
          }
          .personal .emrgncy-line-1-space {
              width: 28.5%;
          }
          .personal .bro-sis-info .bor-sis-occu-space {
              width: 98.2%;
          }
          .not-print{
            display:none !important;
          }
          .mt-2{
            margin-top:10px;
          }
          .personal .bro-sis-info .bor-sis-name-space {
              width: 96%;
          }
          .color-transparent {
              color: transparent;
          }
          .personal .pr-0 {
              padding-right: 0;
          }

          .personal .inner-table, .personal .inner-table table{
            width:1000px !important;
            display:block !important;
          }
          .personal .inner-table table th.name-table-th{
            width:45%;
          }
          .personal .inner-table table th.date-to-table-th,.personal .inner-table table th.date-from-table-th{
            width:10%;
          }
          
          .personal .inner-table table th{
            width:25%;
          }
          .personal .inner-table table, .personal .inner-table table tr, .personal .inner-table table th, .personal .inner-table table td {
              border: 1px solid;
              text-align: center;
          }
          .personal .inner-table table th {
              font-weight: normal;
              font-size: 16px;
              font-family: 'timesNewRoman';
          }
          .personal .sports-space {
              width: 90.9%;
          }
          .personal .hobbies-space {
              width: 89.7%;
          }
          .personal .likeness-space {
              width: 88.7%;
          }
          .personal .dislikeness-space {
              width: 85.3%;
          }
          .personal .visited-country-line-1-space {
              width: 79%;
          }
          .personal .visited-country-line-2-space {
              width: 100%;
          }
          .personal .officer-signature {
              border-top: 1px solid;
              padding-top: 10px;
          }
          .personal .officer-signature-date-space {
              width: 57%;
          }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <span class="header-warning top">CONFIDENTIAL</span>
          
          </div>
          <br>
          ${printContents}
          
        </body>
      </html>`
    );
    // <span class="header-warning bottom">CONFIDENTIAL</span>
    popupWin.document.close();
  }

  getJstiTraineeBasicInfoDetails(traineeId) {
    this.CourseInstructorService.getJstiTraineeBasicInfoDetails(traineeId).subscribe(res=>{       
      console.log(res)
      this.jstiTraineeDetails = res;
    }); 
  }
  getNextChar(index) {
    var char = 'a';
    return String.fromCharCode(char.charCodeAt(0) + index);
  }

  getParentRelativeListType(traineeId,groupType) {
    this.CourseInstructorService.getParentRelativeListType(traineeId,groupType).subscribe(res=>{             
      if(groupType == 11){
        this.jstiChildrenData=true;
        this.jstiTraineeChildrenDetails=res;
        
      }else if(groupType == 22){
        this.jstiSiblingData=true;
        this.jstiTraineeSiblingDetails=res;
      }
      // this.jstiTraineeDetails = res;
    }); 
  }

  getTraineeEducationalQualification(traineeId) {
    this.CourseInstructorService.getTraineeEducationalQualification(traineeId).subscribe(res=>{                   
        this.jstiTraineeEducations=res;
        console.log("education")
        console.log(this.jstiTraineeEducations)
      
    }); 
  }
  getTraineeMilitaryTrainings(traineeId) {
    this.CourseInstructorService.getTraineeMilitaryTrainings(traineeId).subscribe(res=>{                   
        this.jstiTraineeMilitaryTrainig=res;
        console.log("militery");
        console.log(this.jstiTraineeMilitaryTrainig)
      
    }); 
  }
  getTraineeRecordOfServices(traineeId) {
    this.CourseInstructorService.getTraineeRecordOfServices(traineeId).subscribe(res=>{                   
        this.jstiTraineeRecordOfService=res;
        console.log("recordservice");
        console.log(this.jstiTraineeRecordOfService)
      
    }); 
  }
}
