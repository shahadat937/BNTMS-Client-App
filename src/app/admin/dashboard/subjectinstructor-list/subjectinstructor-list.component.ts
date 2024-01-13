import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseInstructor} from '../../../subject-management/models/courseinstructor';
import {CourseInstructorService} from '../../../subject-management/service/courseinstructor.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-subjectinstructor-list',
  templateUrl: './subjectinstructor-list.component.html',
  styleUrls: ['./subjectinstructor-list.component.sass']
})
export class SubjectInstructorListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  ELEMENT_DATA: CourseInstructor[] = [];
  isLoading = false;
  GetInstructorByParameters:any[];
  baseSchoolNameId:number;
  routingType:any;
  courseNameId:any;
  mainDb:any;
  courseTypeId:number;
  showHideDiv = false;
  branchId:any;
  traineeId:any;
  role:any;

  dbType:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  groupArrays:{ courseModule: string; courses: any; }[];

  displayedColumns: string[]= ['ser','trainee','bnaSubjectName','courseName'];
  
  constructor(private snackBar: MatSnackBar,private authService: AuthService,private route: ActivatedRoute,private CourseInstructorService: CourseInstructorService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    this.onModuleSelectionChangeGetsubjectList();
    
  }
 
  // getCourseInstructors() {
  //   this.isLoading = true;
  //   this.CourseInstructorService.getCourseInstructors(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     
  //     console.log(response);
  //     this.dataSource.data = response.items; 
  //     this.paging.length = response.totalItemsCount    
  //     this.isLoading = false;
  //   })
  // }

  onModuleSelectionChangeGetsubjectList(){ 
    this.userRole.MasterAdmin
     this.baseSchoolNameId = Number(this.route.snapshot.paramMap.get('baseSchoolNameId')); 
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.routingType = this.route.snapshot.paramMap.get('routingType'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    this.mainDb = this.route.snapshot.paramMap.get('mainDb');
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    this.dbType = this.route.snapshot.paramMap.get('dbType'); 
    console.log("dd"+this.routingType)
      this.CourseInstructorService.getsubjectInstructorListByCourseDuration(courseDurationId).subscribe(res=>{
        this.GetInstructorByParameters=res;  
        console.log("GetInstructor By Parameters");
        console.log(this.GetInstructorByParameters);
              
        if(this.courseNameId == this.masterData.courseName.JCOsTraining){
          // this gives an object with dates as keys
          const groups = this.GetInstructorByParameters.reduce((groups, courses) => {
            const courseModule = courses.saylorBranch;
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
          console.log(this.groupArrays);
        }else{
          // this gives an object with dates as keys
          const groups = this.GetInstructorByParameters.reduce((groups, courses) => {
            console.log("ttt");
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
          console.log("course Module");
          console.log(this.groupArrays);
        }
      
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
          <h3>Subject Instructor Name List</h3>
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

  
}
