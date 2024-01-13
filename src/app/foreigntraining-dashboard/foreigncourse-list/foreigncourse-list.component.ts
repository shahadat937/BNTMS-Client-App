import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseDuration} from '../../foreign-training/models/courseduration'
import {CourseDurationService} from '../../foreign-training/service/courseduration.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-foreigncourse-list',
  templateUrl: './foreigncourse-list.component.html',
  styleUrls: ['./foreigncourse-list.component.sass']
})
export class ForeigncourseListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseDuration[] = [];
  isLoading = false;
  courseTypeId=MasterData.coursetype.ForeignCourse;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  branchId:any;
  traineeId:any;
  role:any;
  dayCount:any;

  displayedColumns: string[] = ['ser','courseName', 'country','durationTo','dayCount', 'actions'];
  dataSource: MatTableDataSource<CourseDuration> = new MatTableDataSource();


   selection = new SelectionModel<CourseDuration>(true, []);

  
  constructor(private snackBar: MatSnackBar,private authService: AuthService,private CourseDurationService: CourseDurationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

     this.getCourseDurationsByCourseType();
  }
  getDaysfromDate(dateFrom:any,dateTo:any){
    //Date dateTime11 = Convert.ToDateTime(dateFrom);  
    var date1 = new Date(dateFrom); 
	  var date2 =  new Date(dateTo);
    var Time = date2.getTime() - date1.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    this.dayCount = Days+1;
    return this.dayCount;
  }
  getCourseDurationsByCourseType(){
    this.isLoading = true;
    this.CourseDurationService.getCourseDurationsByCourseType(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.courseTypeId).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log(response);
    })
  }

}

