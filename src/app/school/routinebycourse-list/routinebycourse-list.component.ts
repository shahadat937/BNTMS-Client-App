import { Component, OnInit, ViewChild,ElementRef,Pipe, PipeTransform  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClassPeriodService } from '../../routine-management/service/classperiod.service';
import { Role } from 'src/app/core/models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CourseWeekService } from 'src/app/course-management/service/CourseWeek.service';

// @Pipe({name: 'groupByDate'})
// export class GroupByPipe implements PipeTransform {
//     transform(collection: Array<any>, property: string = 'date'): Array<any> {
//         if(!collection) {
//             return null;
//         }
//         const gc = collection.reduce((previous, current)=> {
//             if(!previous[current[property]]) {
//                 previous[current[property]] = [];
//             }
//                 current.events.forEach(x => previous[current[property]].push(x));
//             return previous;
//         }, {});
//         return Object.keys(gc).map(date => ({ date: date, events: gc[date] }));
//     }
// }


@Component({
  selector: 'app-routinebycourse-list',
  templateUrl: './routinebycourse-list.component.html',
  styleUrls: ['./routinebycourse-list.component.sass']
})
export class RoutineByCourseListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  destination:string;
  RoutineBySectionForm: FormGroup;
  groupArrays:{ date: string; games: any; }[];
  RoutineByCourse:any;
  sectionList:SelectedModel[];
  selectedWeek:SelectedModel[];
  courseType:any;
  schoolId:any;
  courseTypeId:any;
  showHideDiv=false;
  selectedRoutineByParametersAndDate:any;
  traineeListByBaseSchoolAndCourse:any;
  routineNotesList:any;
  periodListByBaseSchoolAndCourse:any;
  subjectlistBySchoolAndCourse:any;
  getSubjectsByRoutineList:any;
  displayedColumns: string[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  
  branchId:any;
  traineeId:any;
  role:any;

  schoolName:any;
  courseNameTitle:any;
  runningWeek:any;
  totalWeek:any;
  durationFrom:any;
  durationTo:any;
  weekStartDate:any;
  weekFromDate:any;
  courseSection:any;
  weekFromTo:any;

  displayedRoutineCountColumns: string[] = ['ser','name','shortCode'];
  displayedRoutineNoteColumns: string[] = ['ser','routineName','routineNote'];
  displayedPeriodListColumns: string[] = ['ser','periodName','duration'];
  displayedSubjectListColumns: string[] = ['ser','instructorName','instructorShortCode'];
  constructor(private datepipe: DatePipe,private fb: FormBuilder, private courseWeekService: CourseWeekService,private authService: AuthService,private ClassPeriodService: ClassPeriodService, private classRoutineService:ClassRoutineService,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.userRole.SuperAdmin
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    //this.getTraineeNominations();
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    var durationId = this.route.snapshot.paramMap.get('courseDurationId');
    this.courseTypeId = this.route.snapshot.paramMap.get('courseTypeId');
    console.log("course type");
    console.log(this.courseTypeId )

    this.intitializeForm();

    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');

    

      this.classRoutineService.getCourseInstructorByBaseSchoolNameAndCourseName(this.schoolId,courseNameId,durationId).subscribe(res=>{
        this.traineeListByBaseSchoolAndCourse=res;
        console.log(res);
      })
      this.classRoutineService.getRoutineNotesForDashboard(currentDateTime,this.schoolId,courseNameId,durationId).subscribe(res=>{
        this.routineNotesList=res;
        console.log(this.routineNotesList);
      })
      this.ClassPeriodService.getSelectedPeriodBySchoolAndCourse(this.schoolId,courseNameId).subscribe(res=>{
        this.periodListByBaseSchoolAndCourse=res;
        console.log(res);
      })
      this.classRoutineService.getselectedCourseSection(this.schoolId,courseNameId).subscribe(res=>{
        this.sectionList=res;
        console.log('section');
        console.log(this.sectionList);
      });
      this.classRoutineService.getSelectedCourseWeeks(this.schoolId,durationId,courseNameId).subscribe(res=>{
        this.selectedWeek=res;
        console.log('weekList');
        console.log(this.selectedWeek);
      });

      
    
  }
  intitializeForm() {
    this.RoutineBySectionForm = this.fb.group({
      courseWeekId:[],            
      courseSectionId:[],            
    });
  }
  onWeekSelectionChangeGet(){
    
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    var schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    var durationId = this.route.snapshot.paramMap.get('courseDurationId');
    var weekId=this.RoutineBySectionForm.value['courseWeekId'];
    // console.log(this.schoolId,this.durationId,this.courseId,this.weekId);    
    
    this.classRoutineService.getRoutineNotesForWeeklyRoutine(schoolId,courseNameId,durationId,weekId).subscribe(res=>{
      this.routineNotesList=res;
      console.log(this.routineNotesList);
    });

    if(this.role == this.userRole.Student){
      var sectionId=this.route.snapshot.paramMap.get('courseSectionId');
      this.RoutineBySectionForm.get('courseSectionId').setValue(sectionId);
      this.onCourseSelectionGet()
    }
  }

  onCourseSelectionGet(){

    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    var durationId = this.route.snapshot.paramMap.get('courseDurationId');
    var courseWeekId = this.RoutineBySectionForm.value['courseWeekId'];
    var sectionId = this.RoutineBySectionForm.value['courseSectionId'];

    this.classRoutineService.getSubjectlistBySchoolAndCourse(this.schoolId,courseNameId,durationId,courseWeekId,sectionId).subscribe(res=>{
      this.subjectlistBySchoolAndCourse=res;
      console.log(res)
    });
    this.classRoutineService.getSubjectsByRoutineList(this.schoolId,courseNameId,durationId,courseWeekId,sectionId).subscribe(res=>{
      this.getSubjectsByRoutineList=res;
      console.log(res)
    });

    this.classRoutineService.getClassRoutineHeaderByParams(this.schoolId,courseNameId,durationId,sectionId).subscribe(res=>{
      console.log("res.schoolName")
      console.log(res)
      this.courseSection = res[0].sectionName;
      this.schoolName = res[0].schoolName;
      this.courseNameTitle = res[0].courseNameTitle;
      this.runningWeek = res[0].runningWeek + 1;
      this.totalWeek = res[0].totalWeek;
      var durationFrom = res[0].durationFrom;
      this.durationFrom =this.datepipe.transform(durationFrom, 'dd/MM/yyyy');
      var durationTo = res[0].durationTo;
      this.durationTo =this.datepipe.transform(durationTo, 'dd/MM/yyyy');
    });

    this.courseWeekService.find(courseWeekId).subscribe(res=>{
      var weekStartDate = res.dateFrom;
      this.weekStartDate =this.datepipe.transform(weekStartDate, 'dd/MM/yyyy');
    });

    this.classRoutineService.getClassRoutineByCourseNameBaseSchoolNameSpRequest(this.schoolId,courseNameId,courseWeekId,sectionId).subscribe(res=>{
      this.selectedRoutineByParametersAndDate=res;
      
      console.log("Routine by Sp request")
      console.log(this.selectedRoutineByParametersAndDate)
      for(let i=0;i<=this.selectedRoutineByParametersAndDate.length;i++){

       console.log("Date"+this.selectedRoutineByParametersAndDate[i]);
      }
      console.log(this.selectedRoutineByParametersAndDate);

      this.displayedColumns =[...Object.keys(this.selectedRoutineByParametersAndDate[0])];
      console.log([...Object.keys(this.selectedRoutineByParametersAndDate[0])]);
      

      console.log(this.selectedRoutineByParametersAndDate);

      
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
                    .dynamic-tbl-forroutine tr th span {
                      writing-mode: vertical-rl;
                      transform: rotate(180deg);
                      padding: 2px;
                      text-transform: capitalize;
                      height:170px;
                  }
                    table th,table td {
                  font-size: 10px;
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
                .header-commencement{
                  font-size:12px;
                  text-align:left;
                  margin:0;
                }
                .row{
                  width:100%;
                }
                .col-md-4{
                  width:33%;
                  float:left;
                }
                .col-md-5{
                  width:42%;
                  float:left;
                }
                .col-md-3{
                  width:25%;
                  float:left;
                }
                .space{
                  text-align: center;
                  background:#ffffff;
                  color:#ffffff;
                  font-size:12px;
                  margin:0;
                }
                .header-top-name{
                  font-size:16px;
                  margin:0;
                }
                .sub-short-list{
                  margin:0;
                  font-size:12px;
                }
                .no-border-table ,.no-border-table th,.no-border-table td{
                  border:none;
                  margin:0;
                  padding:0;
                  text-align:left;
                }
                .no-border-table th.legend-cell{
                  text-align:center;
                }
                .no-border-table th {
                  text-decoration: underline;
                }
                .cell-routine-note{
                  width:70%;
                }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
            <span class="header-warning top">RESTRICTED</span>
            <h3 class="header-top-name"> ${this.schoolName}</h3>
            <h3 class="header-top-name"> ${this.courseNameTitle}</h3>
            <h3 class="header-top-name">Section :- ${this.courseSection }</h3>                        
          </div>
          <div class="row">
            <div class="col-md-4">
              <h3 class="header-commencement">Wef :- ${this.weekStartDate}</h3>
              <h3 class="header-commencement">Date of Commencement :- ${this.durationFrom}</h3>
            </div>
            <div class="col-md-5">
              <h3 class="space"> - </h3>
            </div>
            <div class="col-md-3">
              <h3 class="header-commencement">Week:- ${this.runningWeek } / ${this.totalWeek }</h3>            
              <h3 class="header-commencement">Date of Completion :- ${this.durationTo }</h3>
            </div>
          </div>
          <br>
          <hr>
          ${printContents}
          <span class="header-warning bottom">RESTRICTED</span>
        </body>
      </html>`
    );
    popupWin.document.close();
  }
}
