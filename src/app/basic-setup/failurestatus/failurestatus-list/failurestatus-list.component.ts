import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FailureStatus } from '../../models/FailureStatus';
import { FailureStatusService } from '../../service/FailureStatus.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-FailureStatus',
  templateUrl: './failurestatus-list.component.html',
  styleUrls: ['./failurestatus-list.component.sass']
})
export class FailureStatusListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: FailureStatus[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'failureStatusName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<FailureStatus> = new MatTableDataSource();

  selection = new SelectionModel<FailureStatus>(true, []);
  
  constructor(private snackBar: MatSnackBar,private FailureStatusService: FailureStatusService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getFailureStatuss();
  }
 
  getFailureStatuss() {
    this.isLoading = true;
    this.FailureStatusService.getFailureStatuss(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getFailureStatuss();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getFailureStatuss();
  } 

  deleteItem(row) {
    const id = row.failureStatusId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.FailureStatusService.delete(id).subscribe(() => {
          this.getFailureStatuss();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })    
  }
}
