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
//import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assignedsubjectmark-list.component',
  templateUrl: './assignedsubjectmark-list.component.html',
  styleUrls: ['./assignedsubjectmark-list.component.sass']
})

export class AssignedSubjectMarkListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  routineList:any;
  MaterialByCourse:any;
  traineeId:any;
  courseList:any;
  schoolId:any;
  fileUrl:any = environment.fileUrl;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedCourseColumns: string[] = ['ser','Module','subjectName', 'subjectType', 'period','totalMark','passMark', 'actions'];
  constructor(private datepipe: DatePipe,private instructorDashboardService: InstructorDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    var bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId');
    console.log(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId)
    this.instructorDashboardService.getSpInstructorSubject(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId).subscribe(res=>{ 
      this.courseList = res;
      console.log(res)
    });  
  }
}
