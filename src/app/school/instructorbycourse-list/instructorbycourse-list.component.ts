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
  selector: 'app-instructorbycourse-list',
  templateUrl: './instructorbycourse-list.component.html',
  styleUrls: ['./instructorbycourse-list.component.sass']
})
export class InstructorByCourseListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  courseName:any;
  InstructorByCourse:any;
  schoolId:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedRoutineColumns: string[] = ['ser', 'subject', 'name'];

  constructor(private datepipe: DatePipe,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    console.log(courseDurationId)
    this.schoolDashboardService.getInstructorDetailByCourse(courseNameId,this.schoolId,courseDurationId).subscribe(response => {         
      this.courseName = response[0].course+'-'+response[0].courseTitle;
      this.InstructorByCourse=response;
      console.log(response)
    })
  }
}
