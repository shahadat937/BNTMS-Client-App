import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaseName } from '../../models/BaseName';
import { BaseNameService } from '../../service/BaseName.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-basename',
  templateUrl: './basename-list.component.html',
  styleUrls: ['./basename-list.component.sass']
})
export class BaseNameListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BaseName[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'baseNames', 'division','district', 'adminAuthority','shortName', 'baseLogo', 'status', 'actions'];
  dataSource: MatTableDataSource<BaseName> = new MatTableDataSource();

  selection = new SelectionModel<BaseName>(true, []);
  
  constructor(private snackBar: MatSnackBar,private BaseNameService: BaseNameService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getBaseNames();
  }
 
  getBaseNames() {
    this.isLoading = true;
    this.BaseNameService.getBaseNames(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBaseNames();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBaseNames();
  } 

  deleteItem(row) {
    const id = row.baseNameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BaseNameService.delete(id).subscribe(() => {
          this.getBaseNames();
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
