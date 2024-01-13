import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BNASemesterDuration} from '../../models/BNASemesterDuration'
import {BNASemesterDurationService} from '../../service/BNASemesterDuration.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bnasemesterduration-list',
  templateUrl: './bnasemesterduration-list.component.html',
  styleUrls: ['./bnasemesterduration-list.component.sass']
})

export class BnasemesterdurationListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASemesterDuration[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','courseDuration','bnaSemesterName','batchName','startDate','endDate','locationType','location', 'actions'];
  dataSource: MatTableDataSource<BNASemesterDuration> = new MatTableDataSource();


   selection = new SelectionModel<BNASemesterDuration>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BNASemesterDurationService: BNASemesterDurationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBNASemesterDurations();
    
  }
 
  getBNASemesterDurations() {
    this.isLoading = true;
    this.BNASemesterDurationService.getBNASemesterDurations(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      console.log( response.items);
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBNASemesterDurations();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBNASemesterDurations();
  } 

  courseWeekGenerate(row){
    console.log(row)
    const id = row.bnaSemesterDurationId; 
    console.log(row.bnaSemesterDurationId)
    console.log("SemesterDurationId")

    this.confirmService.confirm('Confirm  message', 'Are You Sure? ').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNASemesterDurationService.genarateCourseWeekForBna(id).subscribe(() => {
          //this.getCoursesByViewType(1);
          this.getBNASemesterDurations();
          this.snackBar.open('Course Week Generated Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-success'
          });
        })
      }
    })
  }

  deleteItem(row) {
    const id = row.bnaSemesterDurationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This BNASemesterDuration Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNASemesterDurationService.delete(id).subscribe(() => {
          this.getBNASemesterDurations();
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
