import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Division } from '../../models/Division';
import { DivisionService } from '../../service/Division.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-Division',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.sass']
})
export class DivisionListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Division[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'divisionName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<Division> = new MatTableDataSource();

  selection = new SelectionModel<Division>(true, []);
  
  constructor(private snackBar: MatSnackBar,private DivisionService: DivisionService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getDivisions();
  }
 
  getDivisions() {
    this.isLoading = true;
    this.DivisionService.getDivisions(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getDivisions();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getDivisions();
  } 

  deleteItem(row) {
    const id = row.divisionId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.DivisionService.delete(id).subscribe(() => {
          this.getDivisions();
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
