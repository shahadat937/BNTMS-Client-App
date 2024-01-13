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
  selector: 'app-centralexam-list',
  templateUrl: './centralexam-list.component.html',
  styleUrls: ['./centralexam-list.component.sass']
})
export class CentralExamComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  InstructorByCourse:any;
  PendingExamEvaluation:any;
  localCourseCount:number;
  InstructorList:any;
  examList:any;
  courseNameId:any;
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
    this.courseTypeId = this.route.snapshot.paramMap.get('courseTypeId'); 
    this.courseNameId = Number(this.route.snapshot.paramMap.get('courseNameId'));
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    console.log(this.traineeId,this.courseTypeId,this.courseNameId )
    if(this.courseNameId == this.masterData.courseName.QExam){
      this.destination="Q Exam";
      this.getExamList(this.traineeId,this.courseTypeId,this.courseNameId);
    }else if(this.courseNameId == this.masterData.courseName.JCOsTraining){
      this.destination="JCO Training";
      this.getExamList(this.traineeId,this.courseTypeId,this.courseNameId);
    }else if(this.courseNameId == this.masterData.courseName.StaffCollage){
      this.destination="Stuff Collage"
      this.getExamList(this.traineeId,this.courseTypeId,this.courseNameId);
    }
    
  }

  getExamList(traineeId,courseTypeId,courseNameId){
    this.instructorDashboardService.getSpInstructorInfoForCentralExam(traineeId,courseTypeId,courseNameId).subscribe(res=>{
      this.examList=res;  
      console.log(this.examList);
      console.log("Instructor");
    });
  }
  
  // getJcoList(traineeId,courseTypeId,courseNameId){
  //   this.destination="JCO Training"
  //   this.instructorDashboardService.getSpInstructorInfoForCentralExam(traineeId,courseTypeId,courseNameId).subscribe(res=>{
  //     this.examList=res;  
  //     console.log(this.examList);
  //   });
  // }
  
  // getStuffList(traineeId,courseTypeId,courseNameId){
  //   this.destination="Stuff Collage"
  //   this.instructorDashboardService.getSpInstructorInfoForCentralExam(traineeId,courseTypeId,courseNameId).subscribe(res=>{
  //     this.examList=res;  
  //     console.log(this.examList);
  //   });
  // }
}
