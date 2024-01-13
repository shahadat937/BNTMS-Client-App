import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ClassPeriod} from '../../models/classperiod'
import {ClassPeriodService} from '../../service/classperiod.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classperiod-list',
  templateUrl: './classperiod-list.component.html',
  styleUrls: ['./classperiod-list.component.sass']
})
export class ClassPeriodListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ClassPeriod[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','baseSchoolName', 'course', 'periodName','bnaClassScheduleStatus','durationForm','durationTo', 'actions'];
  dataSource: MatTableDataSource<ClassPeriod> = new MatTableDataSource();


   selection = new SelectionModel<ClassPeriod>(true, []);

  
  constructor(private snackBar: MatSnackBar,private ClassPeriodService: ClassPeriodService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getClassPeriods();
    
  }
 
  getClassPeriods() {
    this.isLoading = true;
    this.ClassPeriodService.getClassPeriods(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getClassPeriods();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getClassPeriods();
  } 

  deleteItem(row) {
    const id = row.classPeriodId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ClassPeriodService.delete(id).subscribe(() => {
          this.getClassPeriods();
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
