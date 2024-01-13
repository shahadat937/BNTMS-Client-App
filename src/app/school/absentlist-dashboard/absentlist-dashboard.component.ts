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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-absentlist-dashboard.component',
  templateUrl: './absentlist-dashboard.component.html',
  styleUrls: ['./absentlist-dashboard.component.sass']
})
export class AbsentlistDashboardComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  MaterialByCourse:any;
  ReadIngMaterialList:any;
  TraineeAbsentList:any;
  TodayAttendanceList:any;
  RoutineByCourse:any;
  dbType:any;
  TodayRoutineList:any;
  schoolId:any;
  fileUrl:any = environment.fileUrl;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedRoutineAbsentColumns: string[] = ['ser','course','nominated','actions'];

  constructor(private datepipe: DatePipe,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    // this.getTraineeAbsentList(this.schoolId);
    this.getCurrentAttendanceBySchool(this.schoolId);
  }

  

  getCurrentAttendanceBySchool(schoolId){    
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getCurrentAttendanceBySchool(currentDateTime,schoolId).subscribe(response => {   
      this.TodayAttendanceList=response;
      console.log(response)
    })
  }
}
