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
import { ClassRoutineService } from '../../routine-management/service/classroutine.service';
import { ClassPeriodService } from '../../routine-management/service/classperiod.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weeklyprogram',
  templateUrl: './weeklyprogram-list.component.html',
  styleUrls: ['./weeklyprogram-list.component.sass']
})
export class WeeklyProgramListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  RoutineByCourseDuration:any;
  status=1;
  groupArrays:{ date: string; games: any; }[];
  SelectedsubjectsBySchoolAndCourse:BNASubjectName[];
  traineeListByBaseSchoolAndCourse:any[];
  subjectlistBySchoolAndCourse:any[];
  displayedColumns: string[];
  periodListByBaseSchoolAndCourse:any[];
  routineNotesList:any;
  weekRoutine:any;
  showHideDiv= false;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";



   selection = new SelectionModel<BNASubjectName>(true, []);

   displayedRoutineCountColumns: string[] = ['ser','name','shortCode', 'subjectShortName'];
   displayedSubjectListColumns: string[] = ['ser','subjectName','subjectShortName','instructorShortCode'];
   displayedPeriodListColumns: string[] = ['ser','periodName','duration'];
   displayedRoutineNoteColumns: string[] = ['ser','routineName','routineNote'];

  constructor(private snackBar: MatSnackBar,private datepipe: DatePipe,private ClassPeriodService: ClassPeriodService,private ClassRoutineService: ClassRoutineService,private studentDashboardService: StudentDashboardService,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.weekRoutine = "Weekly";
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    var courseSectionId = this.route.snapshot.paramMap.get('courseSectionId');
    this.getRoutineByCourseDuration(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId, 0);
    this.getInstructorAndSubject(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId);
  }

  allItem(){
    this.weekRoutine = "All";
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    var courseSectionId = this.route.snapshot.paramMap.get('courseSectionId');

    this.getRoutineByCourseDuration(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId, 1);
  }

  // getCourseModuleByCourseName(courseNameId){
  //   this.studentDashboardService.getSelectedCourseModulesByCourseNameId(courseNameId).subscribe(res=>{
  //     this.CourseModuleByCourseName = res;
  //     console.log(this.CourseModuleByCourseName)
  //   });
  // }

  getInstructorAndSubject(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId){
    this.ClassRoutineService.getCourseInstructorByBaseSchoolNameAndCourseName(baseSchoolNameId,courseNameId,courseDurationId).subscribe(res=>{
      this.traineeListByBaseSchoolAndCourse=res;
      console.log(res);
    })
    this.ClassRoutineService.getSubjectlistBySchoolAndCourse(baseSchoolNameId,courseNameId,courseDurationId,null,courseSectionId).subscribe(res=>{
      this.subjectlistBySchoolAndCourse=res;
      console.log(res)
    });
  }

  getRoutineByCourseDuration(baseSchoolNameId,courseNameId,courseDurationId,courseSectionId,status){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');

    this.studentDashboardService.getRoutineByCourseDurationId(baseSchoolNameId,courseNameId,courseDurationId, courseSectionId, status).subscribe(res=>{
      this.RoutineByCourseDuration = res;

      this.displayedColumns =[...Object.keys(this.RoutineByCourseDuration[0])];
      console.log([...Object.keys(this.RoutineByCourseDuration[0])]);
      // this gives an object with dates as keys
      const groups = this.RoutineByCourseDuration.reduce((groups, game) => {
        const date = game.date.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(game);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          games: groups[date]
        };
      });
      console.log(this.groupArrays)
    });
    this.ClassPeriodService.getSelectedPeriodBySchoolAndCourse(baseSchoolNameId,courseNameId).subscribe(res=>{
      this.periodListByBaseSchoolAndCourse=res;
      console.log(res);
    })
    this.studentDashboardService.getRoutineNotesForDashboard(currentDateTime,baseSchoolNameId,courseNameId,courseDurationId).subscribe(res=>{
      this.routineNotesList=res;
      console.log(this.routineNotesList);
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
              .first-col-hide .mat-header-row.cdk-header-row.ng-star-inserted .mat-header-cell:first-child, .first-col-hide .mat-row.cdk-row.ng-star-inserted .mat-cell:first-child {
                      display: none;
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
          <h3>Weekly Program List </h3>
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
