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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instructorcourseforclass-list.component',
  templateUrl: './instructorcourseforclass-list.component.html',
  styleUrls: ['./instructorcourseforclass-list.component.sass']
})

export class InstructorCourseForClassComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  MaterialByCourse:any;
  ReadIngMaterialList:any;
  RoutineByCourse:any;
  schoolId:any;
  fileUrl:any = environment.fileUrl;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedRoutineCountColumns: string[] = ['ser','course','courseDuration','actions'];

  constructor(private datepipe: DatePipe,private instructorDashboardService: InstructorDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    var traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    // this.schoolDashboardService.getReadingMetarialByCourse(courseNameId,schoolId).subscribe(response => {         
    //   this.MaterialByCourse=response;
    //   console.log("school");
    //   console.log(schoolId);
    // })
    this.getRoutineInfoByCourse(traineeId);
  }

  getRoutineInfoByCourse(traineeId){
    this.instructorDashboardService.getInstructorAssignedCourseList(traineeId).subscribe(response => {         
      this.RoutineByCourse=response;
      console.log(this.RoutineByCourse)
    })
  }
}
