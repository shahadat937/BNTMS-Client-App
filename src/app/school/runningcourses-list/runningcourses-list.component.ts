import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { SchoolDashboardService } from '../services/SchoolDashboard.service';

@Component({
  selector: 'app-runningcourses-list',
  templateUrl: './runningcourses-list.component.html',
  styleUrls: ['./runningcourses-list.component.sass']
})
export class RunningCoursesListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  InstructorByCourse:any;
  localCourseCount:number;
  runningCourses:any;
  dbType:any;
  courseDurationId:any;
  courseTypeId:any;
  schoolId:any;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','course','noOfCandidates','professional','nbcd','durationFrom','durationTo', 'remark', 'actions'];

  constructor(private datepipe: DatePipe,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    //var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    this.dbType = this.route.snapshot.paramMap.get('dbType'); 
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    console.log("rr"+this.schoolId)
    this.getrunningCourseListBySchool(this.schoolId);
  }

  getrunningCourseListBySchool(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getrunningCourseListBySchool(currentDateTime, this.masterData.coursetype.LocalCourse, schoolId,0).subscribe(response => {   
      
      this.localCourseCount=response.length;
      this.runningCourses=response;
      console.log("running course")
      console.log(response)
    })
  }
}
