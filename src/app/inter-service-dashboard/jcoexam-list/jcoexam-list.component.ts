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
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-jcoexam-list',
  templateUrl: './jcoexam-list.component.html',
  styleUrls: ['./jcoexam-list.component.sass']
})
export class JcoExamListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  courseDurationId:number;
  courseNameId:number;
  courseTypeId:number;
  traineeStatusId:number;
  jcoCourseList:any;
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

  displayedColumns: string[] = ['ser','name','duration', 'candidates', 'subject'];

  
  constructor(private datepipe: DatePipe,private route: ActivatedRoute, private authService: AuthService,private snackBar: MatSnackBar,private interServiceDashboardService: InterServiceDashboardService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    // this.userRole.InterSeeviceDesk
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    
    this.getRunningCourseTotalTraineeByCourseType()
  }

  getRunningCourseTotalTraineeByCourseType() {
    this.titleText = "JCO's Exam";
    this.interServiceDashboardService.getCentralCourseDuration(this.masterData.coursetype.CentralExam,this.masterData.courseName.JCOsTraining).subscribe(response => {           
      this.jcoCourseList=response;
      console.log(this.jcoCourseList);
    })
  }

  
}
