import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Attendance} from '../../models/attendance'
import {AttendanceService} from '../../service/attendance.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.sass']
})
export class AttendanceListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Attendance[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','classRoutine','baseSchoolName','courseName'
  ,'bnaSubjectName', 'bnaAttendanceRemarks', 'attendanceStatus',   'actions'];
  dataSource: MatTableDataSource<Attendance> = new MatTableDataSource();


   selection = new SelectionModel<Attendance>(true, []);

  
  constructor(private snackBar: MatSnackBar,private AttendanceService: AttendanceService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getAttendances();
    
  }
 
  getAttendances() {
    this.isLoading = true;
    this.AttendanceService.getAttendances(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getAttendances();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getAttendances();
  } 

  deleteItem(row) {
    const id = row.attendanceId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.AttendanceService.delete(id).subscribe(() => {
          this.getAttendances();
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
