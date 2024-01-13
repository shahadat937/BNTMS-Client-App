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

@Component({
  selector: 'app-instructorexam-list',
  templateUrl: './instructorexam-list.component.html',
  styleUrls: ['./instructorexam-list.component.sass']
})
export class InstructorExamComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  InstructorByCourse:any;
  PendingExamEvaluation:any;
  localCourseCount:number;
  InstructorList:any;
  runningCourses:any;
  dbType:any;
  courseDurationId:any;
  courseTypeId:any;
  traineeId:any;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedExamEvaluationColumns: string[] = ['ser', 'course','subject','date','examStatus', 'markStatus'];

  constructor(private datepipe: DatePipe,private instructorDashboardService: InstructorDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    //var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    this.dbType = this.route.snapshot.paramMap.get('dbType'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    console.log("rr"+this.courseDurationId)
    this.getPendingExamEvaluation(this.traineeId,this.courseDurationId);
  }

  getPendingExamEvaluation(traineeId,courseDurationId){
    this.instructorDashboardService.getInstructorPendingExamEvaluation(traineeId,courseDurationId).subscribe(response => {         
      this.PendingExamEvaluation=response;
      console.log(response)
    })
  }
}
