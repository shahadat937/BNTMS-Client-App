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

@Component({
  selector: 'app-viewsubjectbyschool',
  templateUrl: './viewsubjectbyschool-list.component.html',
  styleUrls: ['./viewsubjectbyschool-list.component.sass']
})
export class ViewSubjectListBySchoolAndCourseComponent implements OnInit {
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


  constructor(private snackBar: MatSnackBar, private authService: AuthService,private courseNameService:CourseNameService,private CourseInstructorService: CourseInstructorService ,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)
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
          <h3> ${this.courseName} - ${this.courseTitle} </h3>
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

  getSubjectNames() {
    this.isLoading = true;
    this.courseListStatus = this.route.snapshot.paramMap.get('courseListStatus'); 
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.dbType1 = this.route.snapshot.paramMap.get('dbType1'); 
    this.traineeDb = this.route.snapshot.paramMap.get('traineeDb'); 
    this.schoolDb = this.route.snapshot.paramMap.get('schoolDb'); 
    this.courseType = this.route.snapshot.paramMap.get('courseType'); 
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    this.coursesTypes=this.route.snapshot.paramMap.get('courseTypeId');
    this.courseType3=this.route.snapshot.paramMap.get('courseType3');
    console.log(this.schoolDb+"fdgfdgdfg")

    if(this.courseListStatus == 1){
      this.courseNameService.find(Number(courseNameId)).subscribe(res=>{
        this.courseName=res.course;
      });

    } else{
      this.CourseInstructorService.getCourseInfobySchoolAndCourse(this.baseSchoolNameId,courseNameId,this.courseDurationId).subscribe(res=>{       
        this.courseName=res[0].course;
        this.schoolName=res[0].schoolName;
        this.courseTitle=res[0].courseTitle;
        this.durationForm=res[0].durationFrom;
        this.durationTo=res[0].durationTo;
      }); 
      this.CourseInstructorService.getInstructorListBySchoolAndCourse(this.baseSchoolNameId,courseNameId,this.courseDurationId).subscribe(res=>{
        this.GetInstructorByParameters=res;   
        console.log("ee")     
        console.log(this.GetInstructorByParameters);
      }); 
      
    }
    

    this.BNASubjectNameService.getSelectedsubjectsBySchoolAndCourse(Number(this.baseSchoolNameId),Number(courseNameId)).subscribe(res=>{
      this.SelectedsubjectsBySchoolAndCourse=res;  
      console.log(this.SelectedsubjectsBySchoolAndCourse); 

      // this gives an object with dates as keys
      const groups = this.SelectedsubjectsBySchoolAndCourse.reduce((groups, courses) => {
        const courseModule = courses.courseModule;
        if (!groups[courseModule]) {
          groups[courseModule] = [];
        }
        groups[courseModule].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((courseModule) => {
        return {
          courseModule,
          courses: groups[courseModule]
        };
      });

      console.log(this.groupArrays)
    });

    this.CourseInstructorService.getSubjectTotalByCourseId(this.baseSchoolNameId,courseNameId).subscribe(res=>{
      this.GetTotalSubjectCalculation=res;     
      console.log(res)   
    }); 
    
  }

}
