import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Height } from '../../models/height';
import { HeightService } from '../../service/height.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-height-list',
  templateUrl: './height-list.component.html',
  styleUrls: ['./height-list.component.sass']
})
export class HeightListComponent implements OnInit {
  
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Height[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText=""; 

  displayedColumns: string[] = ['ser', 'heightName','isActive', 'actions'];
  dataSource: MatTableDataSource<Height> = new MatTableDataSource();

  selection = new SelectionModel<Height>(true, []);

  constructor(private snackBar: MatSnackBar,private heightService: HeightService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getHeights();
  }
 
  getHeights() {
    this.isLoading = true;
    this.heightService.getHeights(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getHeights();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getHeights();
  } 

  deleteItem(row) {
    const id = row.heightId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Height Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.heightService.delete(id).subscribe(() => {
          this.getHeights();
          this.snackBar.open('Height Information Deleted Successfully ', '', {
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
