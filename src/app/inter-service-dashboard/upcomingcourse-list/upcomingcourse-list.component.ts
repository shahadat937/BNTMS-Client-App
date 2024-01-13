import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { InterServiceDashboardService } from '../services/InterServiceDashboard.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upcomingcourse-list',
  templateUrl: './upcomingcourse-list.component.html',
  styleUrls: ['./upcomingcourse-list.component.sass']
})
export class upcomingcourseListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  courseDurationId:number;
  courseNameId:number;
  courseTypeId:number;
  traineeStatusId:number;
  interServiceCourses:any;
  baseSchoolNameId:any;
  titleText:any;
  dbType:any;
  dbType1:any;
  courseType3:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  
  branchId:any;
  traineeId:any;
  role:any;

  displayedUpcomingInterServiceColumns: string[] = ['ser','courseName', 'orgName','durationFrom','durationTo', 'actions'];

  
  constructor(private datepipe: DatePipe,private route: ActivatedRoute, private authService: AuthService,private snackBar: MatSnackBar,private interServiceDashboardService: InterServiceDashboardService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)
    
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    this.dbType = Number(this.route.snapshot.paramMap.get('dbType'));
    
    this.getUpcomingCourseListByType(this.courseTypeId)
  }

  getUpcomingCourseListByType(courseTypeId) {
    if(courseTypeId == this.masterData.coursetype.LocalCourse){
      this.titleText = "Local Course";
    }else if(courseTypeId == this.masterData.coursetype.ForeignCourse){
      this.titleText = "Foreign Course";
    }else if(courseTypeId == this.masterData.coursetype.InterService){
      this.titleText = "Inter Service Course";
    }
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.interServiceDashboardService.getUpcomingCourseListByType(currentDateTime,courseTypeId).subscribe(response => {           
      this.interServiceCourses=response;
      console.log(this.interServiceCourses);
    })
  }

  
}
