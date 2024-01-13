import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseDuration} from '../../models/courseduration';
import {CourseDurationService} from '../../service/courseduration.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, formatDate } from '@angular/common';
import {Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-courseactivation-list',
  templateUrl: './courseactivation-list.component.html',
  styleUrls: ['./courseactivation-list.component.sass'] 
})
export class CourseActivationListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseDuration[] = [];
  isLoading = false;
  completeStatus :boolean = false;
  btnText:string;
  currentDateTime:any;
  dateTo:any;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: 1000,
    length: 1
  }
  searchText="";
  groupArrays:{ baseSchoolName: string; courses: any; }[];

  displayedColumns: string[] = ['ser','baseSchoolName','courseName','durationFrom','durationTo', 'actions'];
  dataSource: MatTableDataSource<CourseDuration> = new MatTableDataSource();


   selection = new SelectionModel<CourseDuration>(true, []);

  
  constructor(@Inject(LOCALE_ID) public locale: string,private datepipe: DatePipe,private snackBar: MatSnackBar,private CourseDurationService: CourseDurationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.currentDateTime =this.datepipe.transform((new Date), 'dd/MM/YYYY');
    this.getCourseDurations();
    
  }
 
  getCourseStatus(data){
    this.currentDateTime =this.datepipe.transform((new Date), 'dd/MM/YYYY');
    this.dateTo =this.datepipe.transform(data.durationTo, 'dd/MM/YYYY');

    // this.currentDateTime =new Date();
    // this.dateTo =data.durationTo;
    
    if(new Date(this.dateTo).getTime() > new Date(this.currentDateTime).getTime())
    {
      this.completeStatus = false;
    }else{
      this.completeStatus = true;
    }
    // console.log(this.currentDateTime,data.durationTo);
  }
  getCourseDurations() {
    this.isLoading = true;
    this.CourseDurationService.getCourseDurations(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      this.dataSource.data = response.items; 
      // this gives an object with dates as keys
      const groups = this.dataSource.data.reduce((groups, courses) => {
        const schoolName = courses.baseSchoolName;
        if (!groups[schoolName]) {
          groups[schoolName] = [];
        }
        groups[schoolName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((baseSchoolName) => {
        return {
          baseSchoolName,
          courses: groups[baseSchoolName]
        };
      });
      console.log(this.groupArrays);
      console.log("Complition List");

      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      // for (var val of  response.items) {
        
      //   if(val.isActive = true){
      //     this.btnText="De Active"
      //    // console.log(response.items)
      //   }
      //   else{
      //     this.btnText="Active"
      //    // console.log(val.isActive)
      //   }
      // }
    // console.log(response.items);
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCourseDurations();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCourseDurations();
  }  
  inActiveItem(row){
    const id = row.courseDurationId;    
    if(row.isActive == true){
      this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Deactive This Item').subscribe(result => {
        if (result) {
          this.CourseDurationService.deactiveCourseDuration(id).subscribe(() => {
            this.getCourseDurations();
            this.snackBar.open('Information Deactive Successfully ', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-warning'
            });
          })
        }
      })
    }
  }
  deleteItem(row) {
    const id = row.courseDurationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.CourseDurationService.delete(id).subscribe(() => {
          this.getCourseDurations();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
    
  }
}
