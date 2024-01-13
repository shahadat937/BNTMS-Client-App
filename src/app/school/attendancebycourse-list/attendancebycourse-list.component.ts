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
  selector: 'app-attendancebycourse-list',
  templateUrl: './attendancebycourse-list.component.html',
  styleUrls: ['./attendancebycourse-list.component.sass']
})
export class AttendanceByCourseListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  AttendanceByCourse:any;
  courseNameId:any;
  schoolId:any;
  durationId:any;
  groupArrays:{ date: string; games: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedRoutineColumns: string[] = ['ser', 'date','duration', 'period', 'subject', 'nominated', 'absent'];

  constructor(private datepipe: DatePipe,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.durationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    console.log(this.schoolId)
    this.schoolDashboardService.getCurrentAttendanceDetailList(currentDateTime,Number(this.courseNameId),this.schoolId,this.durationId).subscribe(response => {         
      this.AttendanceByCourse=response;

       // this gives an object with dates as keys
       const groups = this.AttendanceByCourse.reduce((groups, game) => {
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

      console.log("attendance by course");
      console.log(this.AttendanceByCourse);
    })
  }

}
