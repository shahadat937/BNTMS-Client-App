import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UTOfficerCategory } from '../../models/UTOfficerCategory';
import { UTOfficerCategoryService } from '../../service/UTOfficerCategory.service';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-UTOfficerCategory',
  templateUrl: './utofficercategory-list.component.html',
  styleUrls: ['./utofficercategory-list.component.sass']
})
export class UTOfficerCategoryListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: UTOfficerCategory[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'utofficerCategoryName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<UTOfficerCategory> = new MatTableDataSource();

  constructor(private snackBar: MatSnackBar,private UTOfficerCategoryService: UTOfficerCategoryService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getUTOfficerCategorys();
  }
 
  getUTOfficerCategorys() {
    this.isLoading = true;
    this.UTOfficerCategoryService.getUTOfficerCategorys(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getUTOfficerCategorys();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getUTOfficerCategorys();
  }

  deleteItem(row) {
    const id = row.utofficerCategoryId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This gender Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.UTOfficerCategoryService.delete(id).subscribe(() => {
          this.getUTOfficerCategorys();
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
