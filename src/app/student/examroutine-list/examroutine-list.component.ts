import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNASubjectName } from '../../subject-management/models/BNASubjectName';
import { BNASubjectNameService } from '../../subject-management/service/BNASubjectName.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDashboardService } from '../services/StudentDashboard.service';

@Component({
  selector: 'app-examroutine',
  templateUrl: './examroutine-list.component.html',
  styleUrls: ['./examroutine-list.component.sass']
})
export class ExamRoutineListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  CourseModuleByCourseName:any;
  examrRoutineList:any;
  showHideDiv= false;
  status=1;
  SelectedsubjectsBySchoolAndCourse:BNASubjectName[];
  groupArrays:{ date: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedRoutineColumns: string[] = ['ser','date','duration','subject'];


   selection = new SelectionModel<BNASubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar,private studentDashboardService: StudentDashboardService,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    this.getCourseModuleByCourseName(courseDurationId)
  }

  getCourseModuleByCourseName(courseDurationId){
    this.studentDashboardService.getExamRoutineForStudentDashboard(courseDurationId).subscribe(res=>{
      this.examrRoutineList = res;
      console.log(this.examrRoutineList)

      // this gives an object with dates as keys
      const groups = this.examrRoutineList.reduce((groups, courses) => {
        const date = courses.date.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(courses);
        return groups;
      }, {});

    // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        courses: groups[date]
      };
    });
      console.log(this.groupArrays);
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
          <h3>Exam Routine List</h3>
         
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
