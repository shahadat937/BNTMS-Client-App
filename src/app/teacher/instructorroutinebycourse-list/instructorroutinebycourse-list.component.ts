import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { InstructorDashboardService } from '../services/InstructorDashboard.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-instructorroutinebycourse-list.component',
  templateUrl: './instructorroutinebycourse-list.component.html',
  styleUrls: ['./instructorroutinebycourse-list.component.sass']
})

export class InstructorRoutinebyCourseComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  MaterialByCourse:any;
  ReadIngMaterialList:any;
  RoutineByCourse:any;
  schoolId:any;
  traineeId:any;
  role:any;
  showHideDiv= false;
  fileUrl:any = environment.fileUrl;
  courseName: any;
  groupArrays:{ course: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedRoutineCountColumns: string[] = ['ser','course','courseDuration','actions'];

  constructor(private datepipe: DatePipe,private authService: AuthService,private instructorDashboardService: InstructorDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    const branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, branchId)

    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    var bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 

    this.instructorDashboardService.getInstructorRoutineByCourseList(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId,this.traineeId).subscribe(response => {         
      this.RoutineByCourse=response;
      this.courseName=this.RoutineByCourse[0].course + "_" + this.RoutineByCourse[0].courseTitle;
      console.log(this.courseName);
      const groups = this.RoutineByCourse.reduce((groups, courses) => {
        const courseName = courses.date;
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
      console.log(this.RoutineByCourse)
    })
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
                .header-text, td{
                  text-align:center;
                }
                .header-text h3{
                  margin:0;
                }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <h3>Daily Programe List</h3>
          </div>
          <br>
          <hr>
          ${printContents}
        </body>
        
        
      </html>`
      
    );
    popupWin.document.close();

}

}
