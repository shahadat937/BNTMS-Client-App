import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-examstatusbysubject',
  templateUrl: './examstatusbysubject-list.component.html',
  styleUrls: ['./examstatusbysubject-list.component.sass']
})
export class ExamStatusBySubjectListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  status=1;
  SelectedsubjectsBySchoolAndCourse:any[];
  courseTypeId:number;
  courseType3:any;
  coursesTypes:any;
  courseType:any;
  traineeId:any;
  GetInstructorByParameters:any[];
  dbType1:any;
  traineeDb:any;
  schoolDb:any;
  schoolName:any;
  courseName:any;
  durationForm:any;
  durationTo:any;
  courseTitle:any;
  mainDb:any;
  courseDurationId:any;
  showHideDiv= false;
  role:any;
  groupArrays:{ courseModule: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";


  
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private schoolDashboardService: SchoolDashboardService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.masterData.coursetype.CentralExam
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    const branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, branchId)
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
            <h3>Exam Status List By Subject</h3>
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
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.mainDb = this.route.snapshot.paramMap.get('mainDb'); 
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 


    this.schoolDashboardService.getExamStatusBySubjectList(courseDurationId).subscribe(res=>{
      this.SelectedsubjectsBySchoolAndCourse=res;  
      this.courseTypeId = res[0].coursetypeid;
      console.log(this.SelectedsubjectsBySchoolAndCourse); 

      // this gives an object with dates as keys
      const groups = this.SelectedsubjectsBySchoolAndCourse.reduce((groups, courses) => {
        const courseModule = courses.moduleName;
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
  }

  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getBNASubjectNames();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getBNASubjectNames();
  // } 

  // deleteItem(row) {
  //   const id = row.bnaSubjectNameId; 
  //   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This BNASubjectName Item').subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.BNASubjectNameService.delete(id).subscribe(() => {
  //         this.getBNASubjectNames();
  //         this.snackBar.open('Information Deleted Successfully ', '', {
  //           duration: 3000,
  //           verticalPosition: 'bottom',
  //           horizontalPosition: 'right',
  //           panelClass: 'snackbar-danger'
  //         });
  //       })
  //     }
  //   })
    
  // }
}
