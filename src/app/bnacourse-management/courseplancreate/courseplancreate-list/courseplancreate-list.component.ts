import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseplanCreate} from '../../models/courseplancreate'
import {CourseplanCreateService} from '../../service/CourseplanCreate.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courseplancreate-list',
  templateUrl: './courseplancreate-list.component.html',
  styleUrls: ['./courseplancreate-list.component.sass'] 
})
export class CourseplanCreateListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseplanCreate[] = [];
  isLoading = false;
  btnText:string;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','courseName','baseSchoolName','coursePlanName','value','isActive', 'actions'];
  dataSource: MatTableDataSource<CourseplanCreate> = new MatTableDataSource();


   selection = new SelectionModel<CourseplanCreate>(true, []);

  
  constructor(private snackBar: MatSnackBar,private CourseplanCreateService: CourseplanCreateService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getCourseplanCreates();
    
  }
 
  getCourseplanCreates() {
    this.isLoading = true;
    this.CourseplanCreateService.getCourseplanCreates(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      this.dataSource.data = response.items; 
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
    this.getCourseplanCreates();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCourseplanCreates();
  }  
  inActiveItem(row){
    const id = row.coursePlanCreateId; 
   
        if(row.isActive == true){
          this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Deactive This Item').subscribe(result => {
            if (result) {
          this.CourseplanCreateService.deactiveCoursePlan(id).subscribe(() => {
            this.getCourseplanCreates();
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
       else{
        this.confirmService.confirm('Confirm Active message', 'Are You Sure Active This Item').subscribe(result => {
          if (result) {
        this.CourseplanCreateService.activeCoursePlan(id).subscribe(() => {
          this.getCourseplanCreates();
          this.snackBar.open('Information Active Successfully ', '', { 
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-success'
          });
      })
     }
   })
  }
}
  deleteItem(row) {
    const id = row.coursePlanCreateId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.CourseplanCreateService.delete(id).subscribe(() => {
          this.getCourseplanCreates();
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
