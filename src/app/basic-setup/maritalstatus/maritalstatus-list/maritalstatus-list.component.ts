import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaritalStatus } from '../../models/MaritalStatus';
import { MaritalStatusService } from '../../service/maritalstatus.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maritalstatus-list',
  templateUrl: './maritalstatus-list.component.html',
  styleUrls: ['./maritalstatus-list.component.sass']
})
export class MaritalstatusListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: MaritalStatus[] = [];
  isLoading = false;
   
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','maritalStatusName','isActive', 'actions'];
  dataSource: MatTableDataSource<MaritalStatus> = new MatTableDataSource();


   selection = new SelectionModel<MaritalStatus>(true, []);

  
  constructor(private snackBar: MatSnackBar,private maritalStatusService: MaritalStatusService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getMaritalStatus();
    
  }
 
  getMaritalStatus() {
    this.isLoading = true;
    this.maritalStatusService.getMaritalStatus(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getMaritalStatus();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getMaritalStatus();
  } 

  deleteItem(row) {
    const id = row.maritalStatusId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This MaritalStatus Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.maritalStatusService.delete(id).subscribe(() => {
          this.getMaritalStatus();
          this.snackBar.open('MaritalStatus Information Deleted Successfully ', '', {
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
