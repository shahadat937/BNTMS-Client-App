import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BNAExamSchedule} from '../../models/bnaexamschedule'
import {BNAExamScheduleService} from '../../service/bnaexamschedule.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bnaexamschedule-list',
  templateUrl: './bnaexamschedule-list.component.html',
  styleUrls: ['./bnaexamschedule-list.component.sass']
})
export class BNAExamScheduleListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNAExamSchedule[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','bnaSemesterDurationId','examDate','bnaSubjectName','bnaSemester','bnaBatch', 'actions'];
  dataSource: MatTableDataSource<BNAExamSchedule> = new MatTableDataSource();


   selection = new SelectionModel<BNAExamSchedule>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BNAExamScheduleService: BNAExamScheduleService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBNAExamSchedules();
    
  }
 
  getBNAExamSchedules() {
    this.isLoading = true;
    this.BNAExamScheduleService.getBNAExamSchedules(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBNAExamSchedules();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBNAExamSchedules();
  } 

  deleteItem(row) {
    const id = row.bnaExamScheduleId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNAExamScheduleService.delete(id).subscribe(() => {
          this.getBNAExamSchedules();
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
