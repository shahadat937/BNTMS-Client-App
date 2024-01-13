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
  selector: 'app-attendancebyroutine-list',
  templateUrl: './attendancebyroutine-list.component.html',
  styleUrls: ['./attendancebyroutine-list.component.sass']
})
export class AttendanceByRoutineListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  AttendanceByRoutine:any;
  courseNameId:any;
  schoolId:any;
  durationId:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedRoutineColumns: string[] = ['ser', 'subject', 'name', 'attendanceRemarks'];

  constructor(private datepipe: DatePipe,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.durationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    var routineId = this.route.snapshot.paramMap.get('classRoutineId'); 
    console.log(this.schoolId,this.courseNameId,routineId)
    this.schoolDashboardService.getCurrentAttendanceDetailByRoutineList(this.courseNameId,this.schoolId,this.durationId,routineId).subscribe(response => {         
      this.AttendanceByRoutine=response;
      console.log(this.AttendanceByRoutine)
    })
  }
}
